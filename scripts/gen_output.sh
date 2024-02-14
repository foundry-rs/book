#!/usr/bin/env bash
set -eo pipefail

source "$(dirname "$0")/common"

source "$SCRIPTS/gen_output/probe.sh"
source "$SCRIPTS/gen_output/pilot.sh"
source "$SCRIPTS/gen_output/spark.sh"
source "$SCRIPTS/gen_output/help.sh"

need_cmd git
need_cmd mktemp
need_cmd sed

need_cmd spark
need_cmd probe
need_cmd shuttle
need_cmd pilot

gen_help
gen_probe
gen_pilot
gen_spark
