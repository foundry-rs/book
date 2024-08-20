#!/usr/bin/env bash
set -eo pipefail

source "$(dirname "$0")/common"

# source "$SCRIPTS/gen_output/cast.sh"
# source "$SCRIPTS/gen_output/chisel.sh"
source "$SCRIPTS/gen_output/zksync.sh"
source "$SCRIPTS/gen_output/forge.sh"
source "$SCRIPTS/gen_output/help.sh"

need_cmd git
need_cmd mktemp
need_cmd sed

# download zksync nightlies
download_nightlies

need_cmd bin/forge
need_cmd bin/cast

gen_help
gen_forge
gen_cast
