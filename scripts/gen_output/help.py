#!/usr/bin/env python3

import argparse
import os
import subprocess
import sys
from os import makedirs, path

HELP_KEY = "help"


def main():
    args = parse_args(sys.argv[1:])
    for cmd in args.commands:
        if cmd.find(" ") >= 0:
            raise Exception(f"subcommands are not allowed: {cmd}")
    makedirs(args.out_dir, exist_ok=True)

    output = {}

    # Iterate over all commands and their subcommands.
    cmd_iter = [[cmd] for cmd in args.commands]
    for cmd in cmd_iter:
        subcmds, stdout = get_entry(cmd)
        if args.verbose and len(subcmds) > 0:
            eprint(f"Found subcommands for \"{' '.join(cmd)}\": {subcmds}")

        # Add entry to output map, e.g. `output["cmd"]["subcmd"]["help"] = "..."`.
        e = output
        for arg in cmd:
            tmp = e.get(arg)
            if not tmp:
                e[arg] = {}
                tmp = e[arg]
            e = tmp
        e[HELP_KEY] = stdout

        # Append subcommands.
        for subcmd in subcmds:
            eprint(f"Adding subcommand: {' '.join(cmd)} {subcmd}")
            cmd_iter.append(cmd + [subcmd])

    # Generate markdown files.
    summary = ""
    root_summary = ""
    for cmd, obj in output.items():
        file_path = path.join(args.out_dir, f"{cmd}.md")
        with open(file_path, "w") as f:
            f.write(cmd_markdown(cmd, obj))

        rel_root_file_path = path.relpath(file_path, args.root_dir)
        summary += cmd_summary(rel_root_file_path, cmd, obj, 0)
        summary += "\n"

        root_summary += cmd_summary(rel_root_file_path, cmd, obj, args.root_indentation)
        root_summary += "\n"
    with open(path.join(args.out_dir, "SUMMARY.md"), "w") as f:
        f.write(summary)
    with open(path.join(args.out_dir, "SUMMARY.root.md"), "w") as f:
        f.write(root_summary)


def parse_args(args: list[str]):
    """Parses command line arguments."""
    parser = argparse.ArgumentParser(
        description="Generate markdown files from help output of commands"
    )
    parser.add_argument("--root-dir", default=".", help="Root directory")
    parser.add_argument(
        "--root-indentation",
        default=0,
        type=int,
        help="Indentation for the root SUMMARY.md file",
    )
    parser.add_argument("--out-dir", default=".", help="Output directory")
    parser.add_argument(
        "commands",
        nargs="+",
        help="Command to generate markdown for. Can be a subcommand.",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Print verbose output"
    )
    return parser.parse_known_args(args)[0]


def get_entry(cmd: list[str]):
    """Returns the subcommands and help output for a command."""
    env = os.environ.copy()
    env["NO_COLOR"] = "1"
    env["COLUMNS"] = "100"
    env["LINES"] = "10000"
    output = subprocess.run(cmd + ["--help"], capture_output=True, env=env)
    if output.returncode != 0:
        stderr = output.stderr.decode("utf-8")
        raise Exception(f"Command \"{' '.join(cmd)}\" failed:\n{stderr}")
    stdout = output.stdout.decode("utf-8")
    subcmds = parse_sub_commands(stdout)
    return subcmds, stdout


def parse_sub_commands(s: str):
    """Returns a list of subcommands from the help output of a command."""
    idx = s.find("Commands:")
    if idx < 0:
        return []
    s = s[idx:]

    idx = s.find("Options:")
    if idx < 0:
        return []
    s = s[:idx]

    idx = s.find("Arguments:")
    if idx >= 0:
        s = s[:idx]

    subcmds = s.splitlines()[1:]
    subcmds = filter(
        lambda x: x.strip() != "" and x.startswith("  ") and x[2] != " ", subcmds
    )
    subcmds = map(lambda x: x.strip().split(" ")[0], subcmds)
    subcmds = filter(lambda x: x != "help", subcmds)
    return list(subcmds)


def cmd_markdown(cmd: str, obj: object):
    """Returns the markdown for a command and its subcommands."""

    def rec(cmd: list[str], obj: object, hashes: int):
        nonlocal out
        out += f"{'#' * hashes} {' '.join(cmd)}\n\n"
        out += help_markdown(cmd, obj[HELP_KEY])
        out += "\n\n"

        for k, v in obj.items():
            if k == HELP_KEY:
                continue
            rec(cmd + [k], v, hashes + 1)

    out = ""
    rec([cmd], obj, 1)
    return out


def help_markdown(cmd: list[str], s: str):
    """Returns the markdown for a command's help output."""
    description, s = parse_description(s)
    return f"""\
{description}

```bash
$ {' '.join(cmd)} --help
{s.strip()}
```"""


def parse_description(s: str):
    """Splits the help output into a description and the rest."""
    idx = s.find("Usage:")
    if idx < 0:
        return "", s
    return s[:idx].strip().splitlines()[0].strip(), s[idx:]


def cmd_summary(md_file: str, cmd: str, obj: object, indent: int):
    """Returns the summary for a command and its subcommands."""

    def rec(cmd: list[str], obj: object, indent: int):
        nonlocal out
        cmd_s = " ".join(cmd)
        anchor = cmd_s.replace(" ", "-")
        out += f"{' ' * indent}- [`{cmd_s}`](/{md_file}#{anchor})\n"

        for k, v in obj.items():
            if k == HELP_KEY:
                continue
            rec(cmd + [k], v, indent + 2)

    out = ""
    rec([cmd], obj, indent)
    return out


def eprint(*args, **kwargs):
    """Prints to stderr."""
    print(*args, file=sys.stderr, **kwargs)


if __name__ == "__main__":
    main()
