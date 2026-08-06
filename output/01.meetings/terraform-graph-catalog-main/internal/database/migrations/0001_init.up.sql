-- Copyright IBM Corp. 2026
--
-- Initial schema for the Terraform Graph Catalog.
-- Flat, workspace-scoped data model. org_id / project_id are stored for
-- attribution and grouping only -- never as access-control keys.

-- Resource instances: one row per instance per current state version.
CREATE TABLE resource_instances (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id     text NOT NULL,
    org_id           text NOT NULL,             -- attribution only; not an access control key
    project_id       text,                      -- attribution only; nullable
    state_version_id text NOT NULL,
    address          text NOT NULL,
    resource_type    text NOT NULL,
    resource_name    text NOT NULL,
    module           text NOT NULL DEFAULT 'root',
    provider         text NOT NULL,
    mode             text NOT NULL DEFAULT 'managed',
    instance_key     text NOT NULL DEFAULT '',  -- '' for singletons, key for count/for_each
    attributes       jsonb,                     -- sensitive values replaced with "<sensitive>"; keys preserved; null on sanitization failure
    dependencies     text[],                    -- full transitive closure from state
    indexed_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX resource_instances_ws_addr_key_uidx
    ON resource_instances (workspace_id, address, instance_key);
CREATE INDEX resource_instances_ws_idx          ON resource_instances (workspace_id);
CREATE INDEX resource_instances_org_type_idx    ON resource_instances (org_id, resource_type);
CREATE INDEX resource_instances_org_project_idx ON resource_instances (org_id, project_id);
CREATE INDEX resource_instances_attrs_gin       ON resource_instances USING GIN (attributes jsonb_path_ops);
CREATE INDEX resource_instances_deps_gin        ON resource_instances USING GIN (dependencies);
CREATE INDEX resource_instances_sv_idx          ON resource_instances (state_version_id);

-- Configuration metadata (from plan JSON, resource-level not instance-level).
-- One row per resource address per workspace; shared across all instances.
CREATE TABLE resource_configs (
    id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id      text NOT NULL,
    org_id            text NOT NULL,
    project_id        text,
    state_version_id  text NOT NULL,
    resource_address  text NOT NULL,            -- "aws_instance.web", "module.vpc.aws_vpc.main"
    resource_type     text NOT NULL,
    provider          text NOT NULL,
    config_depends_on text[],                   -- explicit depends_on declarations
    expressions       jsonb,                    -- attribute -> {references: [...]} from plan JSON
    UNIQUE (workspace_id, resource_address)
);

CREATE INDEX resource_configs_ws_idx       ON resource_configs (workspace_id);
CREATE INDEX resource_configs_org_idx      ON resource_configs (org_id);
CREATE INDEX resource_configs_sv_idx       ON resource_configs (state_version_id);
CREATE INDEX resource_configs_depends_gin  ON resource_configs USING GIN (config_depends_on);

-- Provider configurations (from plan JSON configuration.provider_config).
-- One row per provider configuration (including aliases) per workspace.
CREATE TABLE workspace_providers (
    id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id       text NOT NULL,
    org_id             text NOT NULL,
    project_id         text,
    state_version_id   text NOT NULL,
    provider_source    text NOT NULL,           -- "registry.terraform.io/hashicorp/aws"
    alias              text NOT NULL DEFAULT '', -- '' for default, alias name otherwise
    version_constraint text,                     -- from required_providers, e.g. ">= 5.0, < 6.0"
    version_exact      text,                     -- resolved version from lock file if available; null otherwise
    configuration      jsonb,                    -- sensitive expression values replaced with "<sensitive>"; keys preserved
    UNIQUE (workspace_id, provider_source, alias)
);

CREATE INDEX workspace_providers_ws_idx           ON workspace_providers (workspace_id);
CREATE INDEX workspace_providers_org_idx          ON workspace_providers (org_id);
CREATE INDEX workspace_providers_source_idx       ON workspace_providers (provider_source);
CREATE INDEX workspace_providers_source_exact_idx ON workspace_providers (provider_source, version_exact);

-- Cross-workspace dependency edges.
-- Populated by the plan ingest (from Atlas), NOT the state parser callback.
-- remote_state_access in v4 state carries org+workspace names, not workspace IDs;
-- Atlas resolves names to IDs and includes the resolved edges in /ingest/plan.
-- Replaced atomically with resource_configs and workspace_providers on plan ingest.
CREATE TABLE workspace_edges (
    consumer_workspace_id text NOT NULL,
    producer_workspace_id text NOT NULL,
    PRIMARY KEY (consumer_workspace_id, producer_workspace_id)
);

CREATE INDEX workspace_edges_producer_idx ON workspace_edges (producer_workspace_id);

-- State outputs.
CREATE TABLE state_outputs (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id     text NOT NULL,
    org_id           text NOT NULL,
    project_id       text,
    state_version_id text NOT NULL,
    name             text NOT NULL,
    value            jsonb,                      -- null if sensitive = true (whole-value sensitivity)
    sensitive        boolean NOT NULL DEFAULT false,
    detailed_type    jsonb,                      -- Terraform type expression for the output
    UNIQUE (workspace_id, name)
);

CREATE INDEX state_outputs_ws_idx ON state_outputs (workspace_id);

-- Access grants.
CREATE TABLE access_grants (
    grant_id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    expires_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE access_grant_workspaces (
    grant_id     uuid NOT NULL REFERENCES access_grants ON DELETE CASCADE,
    workspace_id text NOT NULL,
    PRIMARY KEY  (grant_id, workspace_id)
);
