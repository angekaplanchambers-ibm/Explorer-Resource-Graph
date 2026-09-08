# Project Guidelines

## General

- Prefer inline styles and Tailwind over introducing new CSS files.
- Only use absolute positioning when necessary; default to flexbox and grid for layout.
- Keep file sizes manageable — extract large helper functions or sub-components into their own files when a file grows unwieldy.
- Do not introduce shadcn/ui into components that currently use inline styles and Tailwind only.

## Data

- All data is mock/static. Do not add network requests or real API calls.
- Mock data lives in `src/mock/`. Keep new fixtures there.

## Graph

- ReactFlow (`@xyflow/react`) is the graph library. Do not swap it for D3 or another library.
- `GraphPanel` exposes an imperative `dispatchAction(UiAction)` handle via `forwardRef`. Route graph commands through that, not via prop drilling.

## Component conventions

- Use CSF3 format for any Storybook stories.
- `UiAction` is the shared command type for cross-component communication (graph highlights, view switches, etc.). Extend it in `src/types/chat.ts` rather than creating parallel event systems.
