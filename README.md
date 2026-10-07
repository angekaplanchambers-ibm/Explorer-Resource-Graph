# Explorer Resource Graph

A front-end app for exploring Terraform Cloud resources, workspaces, and runs — including a topology graph view, workspace relationship explorer, and TF Signal interaction layer.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Explorer tables

Table View is the default for Types, Use Cases, Saved Views, and AI drawer input. Graph is a secondary view for results.

Saved Views opens an inline catalog with search, Type filtering, sorting, and pagination. Selecting a saved view opens its results in the same content area.

All Type tables share sortable headers, column controls, empty states, and pagination with 10, 20, 50, or 100 rows per page. Workspace-scoped Resources, Modules, and Providers use their own column controls; parent workspace conditions do not filter these scoped tables.

Use Cases preserve the existing demo result sets. Run-status views group by status; date and version views sort by available fields. Notices identify missing historical versions, update timestamps, recency definitions, and actual override records rather than inventing data.
