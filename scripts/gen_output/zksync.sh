#!/usr/bin/env bash
set -eo pipefail

BINS=(forge cast)

download_nightlies() {
  uname_s=$(uname -s)
  PLATFORM=$(tolower "${FOUNDRYUP_PLATFORM:-$uname_s}")
  EXT="tar.gz"
  case $PLATFORM in
  linux) ;;
  darwin | mac*)
    PLATFORM="darwin"
    ;;
  mingw* | win*)
    EXT="zip"
    PLATFORM="win32"
    ;;
  *)
    err "unsupported platform: $PLATFORM"
    ;;
  esac

  uname_m=$(uname -m)
  ARCHITECTURE=$(tolower "${FOUNDRYUP_ARCH:-$uname_m}")
  if [ "${ARCHITECTURE}" = "x86_64" ]; then
    # Redirect stderr to /dev/null to avoid printing errors if non Rosetta.
    if [ "$(sysctl -n sysctl.proc_translated 2>/dev/null)" = "1" ]; then
      ARCHITECTURE="arm64" # Rosetta.
    else
      ARCHITECTURE="amd64" # Intel.
    fi
  elif [ "${ARCHITECTURE}" = "arm64" ] || [ "${ARCHITECTURE}" = "aarch64" ]; then
    ARCHITECTURE="arm64" # Arm.
  else
    ARCHITECTURE="amd64" # Amd.
  fi

  # Compute the URL of the release tarball in the Foundry repository.
  FOUNDRYUP_TAG=nightly
  FOUNDRYUP_VERSION=$FOUNDRYUP_TAG
  FOUNDRYUP_REPO=matter-labs/foundry-zksync
  RELEASE_URL="https://github.com/${FOUNDRYUP_REPO}/releases/download/${FOUNDRYUP_TAG}/"
  BIN_ARCHIVE_URL="${RELEASE_URL}foundry_${FOUNDRYUP_VERSION}_${PLATFORM}_${ARCHITECTURE}.$EXT"
  FOUNDRY_BIN_DIR=${FOUNDRY_BIN_DIR:-bin}

  mkdir -p "${FOUNDRY_BIN_DIR}"

  # Download and extract the binaries archive
  say "downloading latest: ${BINS[*]}"
  if [ "$PLATFORM" = "win32" ]; then
    tmp="$(mktemp -d 2>/dev/null || echo ".")/foundry-zksync.zip"
    ensure download "$BIN_ARCHIVE_URL" "$tmp"
    ensure unzip "$tmp" -d "$FOUNDRY_BIN_DIR"
    rm -f "$tmp"
  else
    ensure download "$BIN_ARCHIVE_URL" | ensure tar -xzC "$FOUNDRY_BIN_DIR"
  fi

  for bin in "${BINS[@]}"; do
    bin_path="$FOUNDRY_BIN_DIR/$bin"

    # Print installed msg
    say "installed - $(ensure "$bin_path" --version)"
  done

  say "done!"
}

say() {
  printf "foundryup-zksync: %s\n" "$1"
}

warn() {
  say "warning: ${1}" >&2
}

err() {
  say "$1" >&2
  exit 1
}

tolower() {
  echo "$1" | awk '{print tolower($0)}'
}

# Run a command that should never fail. If the command fails execution
# will immediately terminate with an error showing the failing command.
ensure() {
  if ! "$@"; then err "command failed: $*"; fi
}

# Downloads $1 into $2 or stdout
download() {
  if [ -n "$2" ]; then
    # output into $2
    if check_cmd curl; then
      curl -#o "$2" -L "$1"
    else
      wget --show-progress -qO "$2" "$1"
    fi
  else
    # output to stdout
    if check_cmd curl; then
      curl -#L "$1"
    else
      wget --show-progress -qO- "$1"
    fi
  fi
}

check_cmd() {
  command -v "$1" &>/dev/null
}
