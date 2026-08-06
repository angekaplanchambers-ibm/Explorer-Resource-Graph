# Figma MCP setup plan

## Top-Level Overview

Set up a general local [Figma MCP](https://figma.com) server in global MCP config so it can be reused across projects from this machine. The recommended approach is a local process launched by the MCP client using a user-scoped Figma access token, because that is the most common and practical setup for Figma-backed tooling. The plan focuses on confirming the runtime, choosing a concrete server package, configuring it in the global MCP file, and validating that the server connects and can read from Figma.

## Sub-Tasks

### 1. Identify the concrete Figma MCP server package and runtime
- **Intent** - Choose the actual local MCP server implementation to install so the rest of the setup uses real command, args, and auth requirements instead of placeholders.
- **Expected Outcomes** - A specific Figma MCP server package is selected, its launch command is known, and its required runtime and credentials are documented.
- **Todo List**
  1. Confirm which published Figma MCP server package to use.
  2. Record whether it runs via [node](https://nodejs.org), [npx](https://nodejs.org), [python](https://www.python.org/), [uv](https://docs.astral.sh/uv/getting-started/installation/), or another runtime.
  3. Record how the server expects the Figma token to be provided.
  4. Confirm whether the server supports the operations you need, such as reading files, nodes, or exports.
- **Relevant Context** - No existing MCP server config was found in this repo. Figma references in [`output/01.meetings/030.Agentic_TFC/vite.config.ts`](output/01.meetings/030.Agentic_TFC/vite.config.ts) and [`output/01.meetings/030.Agentic_TFC/README.md`](output/01.meetings/030.Agentic_TFC/README.md) are about design assets and exports, not MCP setup.
- **Status** - [ ] pending

### 2. Confirm machine prerequisites for a local global setup
- **Intent** - Verify the selected server can run on this machine before writing config.
- **Expected Outcomes** - Required runtime is confirmed installed, and the target global MCP config location is identified.
- **Todo List**
  1. Check the runtime version required by the chosen MCP server.
  2. Confirm the global MCP config path to use, such as `~/.bob/settings/mcp.json` if this client uses Bob global MCP config.
  3. Decide whether the server should be available in all modes or restricted to specific groups.
  4. Decide whether any tools should be auto-approved or kept on normal approval.
- **Relevant Context** - The current repo does not contain an MCP config file or an existing Figma MCP entry. The intended setup is global rather than workspace-scoped.
- **Status** - [ ] pending

### 3. Prepare the credential strategy
- **Intent** - Choose the safest practical way to provide Figma authentication to the local server.
- **Expected Outcomes** - The token source is defined and the persistence risk is understood before any config is written.
- **Todo List**
  1. Confirm whether the chosen server can read the Figma token from the shell environment or another secure local source.
  2. Prefer a setup that avoids storing the token directly in global MCP config.
  3. If inline config is unavoidable, document that the secret will be written to disk in plaintext and get explicit approval before using that approach.
- **Relevant Context** - MCP config stores `env` values literally on disk, so secrets should not be written there unless necessary.
- **Status** - [ ] pending

### 4. Add the server to global MCP config
- **Intent** - Register the Figma MCP server once at user scope so it is reusable across projects.
- **Expected Outcomes** - The global MCP config contains a valid Figma server entry merged with any existing servers.
- **Todo List**
  1. Read the existing global MCP config if present.
  2. Merge the new Figma server entry into `mcpServers` without deleting other servers.
  3. Set the chosen `command`, `args`, and any non-secret configuration.
  4. Add groups or disabled tools only if there is a clear reason.
- **Relevant Context** - Global MCP config should be user-scoped rather than repo-scoped for this request.
- **Status** - [ ] pending

### 5. Validate the connection and first Figma read
- **Intent** - Confirm the setup is usable, not just syntactically configured.
- **Expected Outcomes** - The MCP client connects to the Figma server and can perform at least one successful read operation against a known Figma file.
- **Todo List**
  1. Reload or reopen the MCP client if needed after config changes.
  2. Confirm the Figma MCP server appears connected.
  3. Run a minimal read operation against a test file or node.
  4. If connection fails, inspect the client error and correct the config, runtime, or auth source.
- **Relevant Context** - The original goal is to make Figma accessible from this environment for future planning and design-to-repo work.
- **Status** - [ ] pending
