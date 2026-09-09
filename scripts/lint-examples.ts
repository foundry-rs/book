import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

type Diagnostic = {
  level?: string;
  code?: { code?: string } | null;
  rendered?: string;
  message?: string;
};

// Each example is a complete source file. Linting parses it; it never executes Solidity.
export function runExample(source: string, id: string, forge = "forge"): string {
  const root = mkdtempSync(join(tmpdir(), "book-lint-example-"));
  try {
    mkdirSync(join(root, "src"));
    writeFileSync(join(root, "foundry.toml"), '[profile.default]\nsrc = "src"\n');
    writeFileSync(join(root, "src/Example.sol"), source);
    return execFileSync(
      forge,
      ["lint", "src/Example.sol", "--root", root, "--json", "--only-lint", id],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          ...process.env,
          FOUNDRY_CONFIG: join(root, "foundry.toml"),
          FOUNDRY_PROFILE: "default",
        },
        timeout: 60_000,
        maxBuffer: 4 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      },
    )
      .split(`${root}/`)
      .join("");
  } catch (error) {
    throw new Error(
      `${id}: cannot lint documentation example: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

export function diagnosticOutput(output: string, id: string): string {
  const diagnostics: Diagnostic[] = output
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
  const errors = diagnostics.filter((diagnostic) => diagnostic.level === "error");
  if (errors.length)
    throw new Error(
      `${id}: invalid documentation example: ${errors.map((error) => error.message).join("; ")}`,
    );
  const matching = diagnostics.filter((diagnostic) => diagnostic.code?.code === id);
  if (!matching.length || matching.some((diagnostic) => !diagnostic.rendered?.trim()))
    throw new Error(`${id}: documentation example did not produce a rendered ${id} diagnostic`);
  return matching.map((diagnostic) => diagnostic.rendered!.trimEnd()).join("\n\n");
}

// Markers are prose, not source comments. Only an immediately preceding Solidity fence applies.
export function renderExamples(
  body: string,
  id: string,
  run: (source: string, id: string) => string = runExample,
): string {
  const output: string[] = [];
  let fence: { char: string; length: number; solidity: boolean; lines: string[] } | undefined;
  let source: string | undefined;
  for (const line of body.split("\n")) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (
        marker &&
        marker[1][0] === fence.char &&
        marker[1].length >= fence.length &&
        !marker[2].trim()
      ) {
        source = fence.solidity ? `${fence.lines.join("\n")}\n` : undefined;
        fence = undefined;
      } else fence.lines.push(line);
    } else if (marker) {
      source = undefined;
      fence = {
        char: marker[1][0],
        length: marker[1].length,
        solidity: marker[2].trim() === "solidity",
        lines: [],
      };
    } else if (line.trim() === "{{produces}}") {
      if (source === undefined)
        throw new Error(`${id}: {{produces}} must immediately follow a Solidity code block`);
      const rendered = diagnosticOutput(run(source, id), id);
      // Diagnostics can quote source containing backticks. Keep those inside the output fence.
      const delimiter = "`".repeat(
        Math.max(3, ...[...rendered.matchAll(/`+/g)].map((match) => match[0].length + 1)),
      );
      output.push(`${delimiter}text\n${rendered}\n${delimiter}`);
      source = undefined;
      continue;
    } else if (line.trim()) source = undefined;
    output.push(line);
  }
  return output.join("\n");
}
