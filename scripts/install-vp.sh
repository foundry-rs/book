#!/usr/bin/env bash
set -euo pipefail

# Vercel Linux x64 build environment.
if [[ "$(uname -s)-$(uname -m)" != "Linux-x86_64" ]]; then
  echo "Unsupported platform for pinned Vite+ archive" >&2
  exit 1
fi

version="0.3.0"
checksum="68e02aba2af877c38f19ea400e7301d083ea18ead8771dc80757812c24acc4d0"
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

curl -fsSL --retry 3 \
  "https://github.com/voidzero-dev/vite-plus/releases/download/v${version}/vp-x86_64-unknown-linux-gnu.tar.gz" \
  -o "$tmp_dir/vp.tar.gz"

printf '%s  %s\n' "$checksum" "$tmp_dir/vp.tar.gz" |
  sha256sum --check --status

tar -xzf "$tmp_dir/vp.tar.gz" -C "$tmp_dir" vp
install -Dm755 "$tmp_dir/vp" "$HOME/.local/share/vite-plus/bin/vp"
