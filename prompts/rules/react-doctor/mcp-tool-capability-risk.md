# `react-doctor/mcp-tool-capability-risk`

An MCP tool runs with the connecting client's authority, so reaching shell, filesystem, or network primitives without validation lets injected input abuse them.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when all three co-occur in one production file: an MCP SDK import or symbol (`from '@modelcontextprotocol/sdk…'`, `McpServer`, `McpAgent`), a tool-surface registration (`server.tool/resource/prompt(`, `registerTool/Resource/Prompt(`, `setRequestHandler(CallToolRequestSchema|ListToolsRequestSchema`, or `new McpServer/McpAgent(`), and a dangerous-capability token (`exec`/`spawn`/`child_process`/`eval`/`new Function`/`vm.run`/`readFile`/`writeFile`/`fs.read|write`/`fetch`/`axios`/`http.request`/`sandbox`/`runCode`/`executeCode`). Comments are stripped first. FALSE POSITIVE: the dangerous capability lives elsewhere in the file and is not actually reachable from the tool handler (the gate is file-level co-occurrence, not data flow), or the call already validates/authorizes its input — the tool may be safe even though all three tokens appear.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Validate and constrain every tool input with a strict schema and enforce per-tool authorization, since MCP handlers run with the client's authority. Avoid raw shell, filesystem, and network access in tool bodies; when unavoidable, run fixed binaries with a validated argument array (no shell strings), confine filesystem access to an allowlisted base directory with traversal checks, and restrict outbound `fetch`/`axios` to an allowlist to prevent server-side request forgery (SSRF).
