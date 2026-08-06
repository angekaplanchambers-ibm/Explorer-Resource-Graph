export type ResourceStatus = "failed" | "drifted" | "healthy" | "unknown";
export type DependencyReason = "explicit" | `implicit:${string}` | "unknown";

export interface ResourceInstance {
  id: string;
  workspace: string;
  workspaceId: string;
  address: string;
  resourceType: string;
  resourceName: string;
  module: string;
  provider: string;
  instanceKey: string | null;
  status: ResourceStatus;
  hasDownstreamConsumers: boolean;
  providerUpgradeAvailable: boolean;
  attributes: Record<string, string>;
}

export interface DependencyRow {
  address: string;
  workspace: string;
  reason: DependencyReason;
}

export interface SignalBanner {
  id: string;
  type: "failed" | "drift" | "upgrade";
  message: string;
  count: number;
  zapLabel: string;
  zapQuery: string;
  dismissed: boolean;
}

export interface ResourceFilters {
  workspaceId?: string;
  resourceType?: string;
  searchTerm?: string;
}

export interface ExplorerViewState {
  activeType: "resources" | "workspaces" | "modules" | "providers" | "tf-versions";
  filters: ResourceFilters;
  chatOpen: boolean;
  graphVisible: boolean;
  selectedResourceId: string | null;
  dependencyPanelOpen: boolean;
}
