#!/usr/bin/env bash
set -eo pipefail

source "$(dirname "$0")/common"

source "$SCRIPTS/gen_output/cast.sh"
source "$SCRIPTS/gen_output/chisel.sh"
source "$SCRIPTS/gen_output/forge.sh"
source "$SCRIPTS/gen_output/help.sh"

need_cmd git
need_cmd mktemp
need_cmd sed

need_cmd forge
need_cmd cast
need_cmd anvil
need_cmd chisel

gen_help
gen_cast
gen_chisel
gen_forge
