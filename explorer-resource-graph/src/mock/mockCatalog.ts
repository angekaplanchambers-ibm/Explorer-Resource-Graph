import type { ResourceInstance, SignalBanner, DependencyRow } from "../types/explorer";

export const MOCK_RESOURCES: ResourceInstance[] = [
  {
    id: "r1", workspace: "payments-prod-us-east", workspaceId: "ws-payments-us",
    address: "aws_instance.app_server[0]", resourceType: "aws_instance", resourceName: "app_server",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: "0",
    status: "failed", hasDownstreamConsumers: true, providerUpgradeAvailable: false,
    attributes: { ami: "ami-0abcdef1234567890", instance_type: "t3.xlarge", availability_zone: "us-east-1a", private_ip: "10.0.1.42" },
  },
  {
    id: "r2", workspace: "payments-prod-us-east", workspaceId: "ws-payments-us",
    address: "aws_security_group.web_sg", resourceType: "aws_security_group", resourceName: "web_sg",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "failed", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "payments-web-sg", vpc_id: "vpc-0123456789abcdef0", ingress_cidr: "0.0.0.0/0" },
  },
  {
    id: "r3", workspace: "payments-prod-us-east", workspaceId: "ws-payments-us",
    address: "aws_db_instance.payments_db", resourceType: "aws_db_instance", resourceName: "payments_db",
    module: "modules/rds", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { engine: "postgres", engine_version: "14.7", instance_class: "db.r6g.2xlarge", password: "<sensitive>", storage_encrypted: "true" },
  },
  {
    id: "r4", workspace: "networking-prod-core", workspaceId: "ws-networking",
    address: "aws_vpc.main", resourceType: "aws_vpc", resourceName: "main",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "drifted", hasDownstreamConsumers: true, providerUpgradeAvailable: false,
    attributes: { cidr_block: "10.0.0.0/16", enable_dns_hostnames: "true", enable_dns_support: "true" },
  },
  {
    id: "r5", workspace: "networking-prod-core", workspaceId: "ws-networking",
    address: "aws_subnet.private_a", resourceType: "aws_subnet", resourceName: "private_a",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "drifted", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { cidr_block: "10.0.1.0/24", availability_zone: "us-east-1a", map_public_ip_on_launch: "false" },
  },
  {
    id: "r6", workspace: "networking-prod-core", workspaceId: "ws-networking",
    address: "aws_nat_gateway.az_b", resourceType: "aws_nat_gateway", resourceName: "az_b",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "drifted", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { allocation_id: "eipalloc-0123456789abcdef0", subnet_id: "subnet-0abcdef1234567890" },
  },
  {
    id: "r7", workspace: "api-gateway-prod", workspaceId: "ws-api-gw",
    address: "aws_api_gateway_rest_api.main", resourceType: "aws_api_gateway_rest_api", resourceName: "main",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "failed", hasDownstreamConsumers: false, providerUpgradeAvailable: true,
    attributes: { name: "platform-api", endpoint_configuration: "REGIONAL", minimum_compression_size: "0" },
  },
  {
    id: "r8", workspace: "api-gateway-prod", workspaceId: "ws-api-gw",
    address: "aws_lambda_function.authorizer", resourceType: "aws_lambda_function", resourceName: "authorizer",
    module: "modules/lambda", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: true,
    attributes: { function_name: "api-authorizer", runtime: "nodejs18.x", handler: "index.handler", environment: "<sensitive>" },
  },
  {
    id: "r9", workspace: "auth-service-prod", workspaceId: "ws-auth",
    address: "aws_iam_role.app_role", resourceType: "aws_iam_role", resourceName: "app_role",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "auth-service-app-role", path: "/", assume_role_policy: "<sensitive>" },
  },
  {
    id: "r10", workspace: "auth-service-prod", workspaceId: "ws-auth",
    address: "aws_iam_policy.app_policy", resourceType: "aws_iam_policy", resourceName: "app_policy",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "auth-service-app-policy", description: "Auth service policy", policy: "<sensitive>" },
  },
  {
    id: "r11", workspace: "data-pipeline-prod", workspaceId: "ws-data",
    address: "azurerm_storage_account.pipeline_data", resourceType: "azurerm_storage_account", resourceName: "pipeline_data",
    module: "modules/storage", provider: "registry.terraform.io/hashicorp/azurerm", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: true,
    attributes: { name: "pipelinedata0abc123", account_tier: "Standard", replication_type: "GRS", primary_access_key: "<sensitive>" },
  },
  {
    id: "r12", workspace: "data-pipeline-prod", workspaceId: "ws-data",
    address: "azurerm_eventhub_namespace.ingest", resourceType: "azurerm_eventhub_namespace", resourceName: "ingest",
    module: "", provider: "registry.terraform.io/hashicorp/azurerm", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: true, providerUpgradeAvailable: true,
    attributes: { name: "pipeline-ingest-ns", sku: "Standard", capacity: "2" },
  },
  {
    id: "r13", workspace: "cdn-global-prod", workspaceId: "ws-cdn",
    address: "google_storage_bucket.assets", resourceType: "google_storage_bucket", resourceName: "assets",
    module: "", provider: "registry.terraform.io/hashicorp/google", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "platform-assets-global", location: "US", storage_class: "STANDARD", uniform_bucket_level_access: "true" },
  },
  {
    id: "r14", workspace: "cdn-global-prod", workspaceId: "ws-cdn",
    address: "google_compute_backend_bucket.cdn_backend", resourceType: "google_compute_backend_bucket", resourceName: "cdn_backend",
    module: "", provider: "registry.terraform.io/hashicorp/google", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "cdn-backend", bucket_name: "platform-assets-global", enable_cdn: "true" },
  },
  {
    id: "r15", workspace: "inventory-service-staging", workspaceId: "ws-inventory",
    address: "aws_ecs_cluster.inventory", resourceType: "aws_ecs_cluster", resourceName: "inventory",
    module: "", provider: "registry.terraform.io/hashicorp/aws", instanceKey: null,
    status: "healthy", hasDownstreamConsumers: false, providerUpgradeAvailable: false,
    attributes: { name: "inventory-staging", setting: "containerInsights=enabled" },
  },
];

export const MOCK_SIGNALS: SignalBanner[] = [
  {
    id: "sig-failed", type: "failed",
    message: "3 workspaces have failed resources — last 60 minutes",
    count: 3, zapLabel: "Inspect resources", zapQuery: "Inspect failed resources in payments-prod and api-gateway",
    dismissed: false,
  },
  {
    id: "sig-drift", type: "drift",
    message: "Drift detected in 3 resources across networking-prod-core",
    count: 3, zapLabel: "Prepare remediation", zapQuery: "Prepare drift remediation for networking-prod-core resources",
    dismissed: false,
  },
  {
    id: "sig-upgrade", type: "upgrade",
    message: "Provider upgrade available affecting resources in 3 workspaces",
    count: 3, zapLabel: "Plan upgrade", zapQuery: "Plan provider upgrade for aws and azurerm resources",
    dismissed: false,
  },
];

export const MOCK_DEPENDENCIES: Record<string, { dependsOn: DependencyRow[]; dependedOnBy: DependencyRow[] }> = {
  "aws_vpc.main": {
    dependsOn: [],
    dependedOnBy: [
      { address: "aws_subnet.private_a", workspace: "networking-prod-core", reason: "implicit:vpc_id" },
      { address: "aws_nat_gateway.az_b", workspace: "networking-prod-core", reason: "implicit:subnet_id" },
      { address: "aws_instance.app_server[0]", workspace: "payments-prod-us-east", reason: "explicit" },
      { address: "aws_security_group.web_sg", workspace: "payments-prod-us-east", reason: "implicit:vpc_id" },
      { address: "aws_api_gateway_rest_api.main", workspace: "api-gateway-prod", reason: "explicit" },
    ],
  },
  "aws_instance.app_server[0]": {
    dependsOn: [
      { address: "aws_security_group.web_sg", workspace: "payments-prod-us-east", reason: "explicit" },
      { address: "aws_vpc.main", workspace: "networking-prod-core", reason: "explicit" },
    ],
    dependedOnBy: [
      { address: "aws_db_instance.payments_db", workspace: "payments-prod-us-east", reason: "implicit:source_dest_check" },
    ],
  },
};
