# `react-doctor/agent-tool-capability-risk`

An AI agent tool that can reach shell, filesystem, or network primitives lets prompt-injected input trigger those actions, because the model treats tool arguments as trusted.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.tsx) located under an agents/tools/mcp directory or with an agent/tool/mcp filename; tests/build/docs/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in a file whose path is under an `agents/`, `tools/`, or `mcp/` directory (or whose filename contains agent/tool/mcp) that BOTH defines a tool — `tool({`, `createTool(`, `defineTool(`, or `new DynamicTool(`/`new StructuredTool(` — AND, anywhere in the same file (comments stripped first), references a dangerous-capability keyword: `exec`/`execSync`/`spawn`/`child_process`/`eval`/`new Function`/`vm.run`/`readFile`/`writeFile`/`fs.read`/`fs.write`/`fetch`/`axios`/`http.request`/`sandbox`/`runCode`/`executeCode`. FALSE POSITIVE to suppress: the dangerous keyword lives in unrelated code in the same file and is not actually wired into the tool's handler, or the tool already validates/allowlists its arguments and scopes the capability so prompt-injected input cannot reach the primitive. This is a file-level co-occurrence heuristic, not data-flow, so confirm the capability is reachable from tool input.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Treat every tool argument as attacker-controlled. Validate inputs against a strict schema and allowlist commands, paths, and hosts instead of passing free-form strings into `exec`/`spawn`/`fs`/`fetch`; never use `shell: true` or build shell commands by concatenation. Scope each capability to the minimum it needs (sandbox, read-only filesystem, egress allowlist), and prefer purpose-built operations over raw shell, filesystem, or network access.
