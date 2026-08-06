import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays, ChartNoAxesCombined, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Cpu, Database, Download, ExternalLink, Globe, HardDrive, Hash, Lock, MoreHorizontal, Plus, Save, Search, Server, Shield, Table2, Tag, ToggleRight, Trash2, Type, User,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const WORKSPACE_SVG_PATH = "M0 2.75C0 1.23122 1.23122 0 2.75 0H17.25C18.7688 0 20 1.23122 20 2.75V17.25C20 18.7688 18.7688 20 17.25 20H2.75C1.23122 20 0 18.7688 0 17.25V2.75ZM7 18.5H17.25C17.9404 18.5 18.5 17.9404 18.5 17.25V7.5H7V18.5ZM5.5 7.5V18.5H2.75C2.05964 18.5 1.5 17.9404 1.5 17.25V7.5H5.5ZM18.5 6V2.75C18.5 2.05964 17.9404 1.5 17.25 1.5H2.75C2.05964 1.5 1.5 2.05964 1.5 2.75V6H18.5Z";

function WorkspaceIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path clipRule="evenodd" d={WORKSPACE_SVG_PATH} fillRule="evenodd" />
    </svg>
  );
}

function ModuleIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 21.0646" fill="currentColor" className={className}>
      <path clipRule="evenodd" d="M14 5.89841C14 5.10451 13.2695 4.51173 12.4926 4.6752L4.99263 6.25325C4.41413 6.37497 4 6.8853 4 7.47647V15.1661C4 15.96 4.73048 16.5528 5.50737 16.3893L13.0074 14.8113C13.5859 14.6896 14 14.1792 14 13.5881V5.89841ZM5.5 7.67934L12.5 6.20649V13.3852L5.5 14.858V7.67934Z" fillRule="evenodd" />
      <path clipRule="evenodd" d="M18 2.75103C18 1.00259 16.3897 -0.30192 14.6794 0.0608887L2.17936 2.7124C0.90877 2.98192 0 4.10368 0 5.40255V18.3135C0 20.062 1.61025 21.3665 3.32064 21.0037L15.8206 18.3522C17.0912 18.0827 18 16.9609 18 15.662V2.75103ZM14.9906 1.52824C15.7681 1.36333 16.5 1.95629 16.5 2.75103V15.662C16.5 16.2524 16.0869 16.7623 15.5094 16.8848L3.00938 19.5363C2.23193 19.7013 1.5 19.1083 1.5 18.3135V5.40255C1.5 4.81216 1.91308 4.30226 2.49062 4.17976L14.9906 1.52824Z" fillRule="evenodd" />
    </svg>
  );
}

function ResourcesIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 20" fill="currentColor" className={className}>
      <path d="M13.25 0C14.1039 0 14.8667 0.38934 15.3711 1H16.25C17.1039 1 17.8667 1.38934 18.3711 2H19.25C20.7688 2 22 3.23122 22 4.75V15.25C22 16.7688 20.7688 18 19.25 18H18.3711C17.8667 18.6107 17.1039 19 16.25 19H15.3711C14.8667 19.6107 14.1039 20 13.25 20H2.75C1.23122 20 0 18.7688 0 17.25V2.75C0 1.23122 1.23122 0 2.75 0H13.25ZM2.75 1.5C2.05964 1.5 1.5 2.05964 1.5 2.75V17.25C1.5 17.9404 2.05964 18.5 2.75 18.5H13.25C13.9404 18.5 14.5 17.9404 14.5 17.25V2.75C14.5 2.05964 13.9404 1.5 13.25 1.5H2.75ZM16 2.75V17.25C16 17.3343 15.9967 17.4177 15.9893 17.5H16.25C16.9404 17.5 17.5 16.9404 17.5 16.25V3.75C17.5 3.05964 16.9404 2.5 16.25 2.5H15.9893C15.9967 2.58233 16 2.66574 16 2.75ZM19 3.75V16.25C19 16.3343 18.9967 16.4177 18.9893 16.5H19.25C19.9404 16.5 20.5 15.9404 20.5 15.25V4.75C20.5 4.05964 19.9404 3.5 19.25 3.5H18.9893C18.9967 3.58233 19 3.66574 19 3.75ZM9.25 7C9.66421 7 10 7.33579 10 7.75C10 8.16421 9.66421 8.5 9.25 8.5H4.75C4.33579 8.5 4 8.16421 4 7.75C4 7.33579 4.33579 7 4.75 7H9.25ZM11.25 4C11.6642 4 12 4.33579 12 4.75C12 5.16421 11.6642 5.5 11.25 5.5H4.75C4.33579 5.5 4 5.16421 4 4.75C4 4.33579 4.33579 4 4.75 4H11.25Z" />
    </svg>
  );
}

function TerraformIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.02 3.93L14.55 7.18V13.69L9.02 10.44V3.93Z" />
      <path d="M15.45 7.18L20.98 3.93V10.44L15.45 13.69V7.18Z" />
      <path d="M3 12.55L8.53 9.3V15.81L3 19.06V12.55Z" />
      <path d="M9.02 16.82L14.55 13.57V20.07L9.02 16.82Z" />
    </svg>
  );
}

const workspaces = [
  ["payments-prod-us-east", "payments", "47", "run-0Yks9WCFeD9xRTWo", "applied"],
  ["payments-prod-eu-west", "payments", "43", "run-1Yks9WCFeD9xRTWo", "applied"],
  ["networking-prod-core", "platform", "61", "run-2Yks9WCFeD9xRTWo", "applied"],
  ["api-gateway-prod", "platform", "22", "run-3Yks9WCFeD9xRTWo", "planned"],
  ["auth-service-prod", "security", "29", "run-4Yks9WCFeD9xRTWo", "applied"],
  ["data-pipeline-prod", "data", "35", "run-5Yks9WCFeD9xRTWo", "errored"],
  ["cdn-global-prod", "platform", "12", "run-6Yks9WCFeD9xRTWo", "applied"],
  ["inventory-service-stg", "commerce", "18", "run-7Yks9WCFeD9xRTWo", "planned"],
  ["cos-rekcepfi-dedwez", "platform", "2", "run-8Yks9WCFeD9xRTWo", "planned"],
  ["pe-fo-oj", "security", "1", "run-9Yks9WCFeD9xRTWo", "errored"],
  ["ti-gecruw-bob", "data", "2", "run-10Yks9WCFeD9xRTWo", "applied"],
  ["besakve-mezlewva-aw", "payments", "2", "run-11Yks9WCFeD9xRTWo", "errored"],
] as const;

const workspaceMetadata = [
  ["Mar 08, 2025 09:10:49 am", "example1/ThjetrbcBQ", "48", "wad-bedezajko-rgoncjca", "118", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:09:14 am", "example2/TozmrDFj7OZ01", "152", "wad-bedezajko-rgoncjca", "27", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:08:02 am", "example3/CKI7TWCQ2u-dgNrNE", "31", "wad-bedezajko-rgoncjca", "42", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:07:14 am", "example4/yrxq-63", "58", "wad-bedezajko-rgoncjca", "140", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:06:14 am", "example5/PWle4", "32", "wad-bedezajko-rgoncjca", "93", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:05:41 am", "example6/skamgSb0qUz0D5", "94", "wad-bedezajko-rgoncjca", "113", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:04:41 am", "example8/8rmntpQJ06", "117", "wad-bedezajko-rgoncjca", "89", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:03:14 am", "example7/CKi7XkkJ4B8AR", "114", "wad-bedezajko-rgoncjca", "107", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:02:41 am", "example9/QVURYR", "108", "wad-bedezajko-rgoncjca", "185", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:01:14 am", "example9/2Y8N7b5eYNf9", "124", "wad-bedezajko-rgoncjca", "175", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 09:00:41 am", "example10/23S8461", "70", "wad-bedezajko-rgoncjca", "188", "susup-de-u-zue", "0.14.0"],
  ["Mar 08, 2025 08:59:14 am", "example9/Pe9k81s1erf", "106", "wad-bedezajko-rgoncjca", "61", "susup-de-u-zue", "0.14.0"],
] as const;

const workspaceRows = Array.from({ length: 100 }, (_, index) => {
  const [name, project, count, run, status] = workspaces[index % workspaces.length];
  return {
    id: `${name}-${index + 1}`,
    name: index < workspaces.length ? name : `${name}-${index + 1}`,
    project,
    count,
    run: `run-${index}Yks9WCFeD9xRTWo`,
    runStatus: index % 3 === 1 ? "errored" : "assessed",
    status,
    noCodeModule: `no-code-module-${(index % 18) + 1}`,
    drifted: index % 4 === 1,
    healthChecksSucceeded: 3 + (index % 5),
    healthChecksPassed: 2 + (index % 6),
    healthChecksFailed: index % 4,
    healthChecksErrored: index % 5 === 0 ? 1 : 0,
    resourcesDrifted: index % 4,
    resourcesUndrifted: 8 + (index % 10),
    stateTerraformVersion: "14",
    currentRumCount: 1 + (index % 7),
    tags: index % 2 === 0 ? "production, payments" : "platform, shared",
    created: `Feb ${String(15 + (index % 13)).padStart(2, "0")} 2025`,
    updated: `Mar ${String(1 + (index % 8)).padStart(2, "0")} 2025`,
    metadata: workspaceMetadata[index % workspaceMetadata.length],
  };
});

const tableColumns = [
  { id: "name", label: "Name", width: "w-[201px]", valueType: "text" },
  { id: "project", label: "Project name", width: "w-[244px]", valueType: "text" },
  { id: "run", label: "Current run ID", width: "w-[243px]", valueType: "number" },
  { id: "runStatus", label: "Run status", width: "w-[154px]", valueType: "text" },
  { id: "currentRunApplied", label: "Current run applied", width: "w-[180px]", valueType: "date" },
  { id: "repository", label: "VCS repo", width: "w-[280px]", valueType: "text" },
  { id: "noCodeModule", label: "No-code module", width: "w-[210px]", valueType: "text" },
  { id: "moduleCount", label: "Module count", width: "w-[159px]", valueType: "number" },
  { id: "modules", label: "Modules", width: "w-[233px]", valueType: "text" },
  { id: "providerCount", label: "Provider count", width: "w-[170px]", valueType: "number" },
  { id: "providers", label: "Providers", width: "w-[168px]", valueType: "text" },
  { id: "terraformVersion", label: "Terraform version", width: "w-[190px]", valueType: "number" },
  { id: "drifted", label: "Drifted", width: "w-[130px]", valueType: "boolean" },
  { id: "healthChecksSucceeded", label: "Health checks succeeded", width: "w-[210px]", valueType: "number" },
  { id: "healthChecksPassed", label: "Health checks passed", width: "w-[195px]", valueType: "number" },
  { id: "healthChecksFailed", label: "Health checks failed", width: "w-[185px]", valueType: "number" },
  { id: "healthChecksErrored", label: "Health checks errored", width: "w-[195px]", valueType: "number" },
  { id: "resourcesDrifted", label: "Resources drifted", width: "w-[180px]", valueType: "number" },
  { id: "resourcesUndrifted", label: "Resources undrifted", width: "w-[195px]", valueType: "number" },
  { id: "stateTerraformVersion", label: "State Terraform version", width: "w-[215px]", valueType: "number" },
  { id: "currentRumCount", label: "Current RUM count", width: "w-[175px]", valueType: "number" },
  { id: "resources", label: "Resource count", width: "w-[165px]", valueType: "number" },
  { id: "tags", label: "Tags", width: "w-[210px]", valueType: "text" },
  { id: "created", label: "Created", width: "w-[165px]", valueType: "date" },
  { id: "updated", label: "Updated", width: "w-[165px]", valueType: "date" },
] as const;

const moduleTableColumns = [
  { id: "name", label: "Name", valueType: "text" },
  { id: "version", label: "Version", valueType: "text" },
  { id: "source", label: "Source", valueType: "text" },
  { id: "workspaceCount", label: "Workspace count", valueType: "number" },
  { id: "workspaces", label: "Workspaces", valueType: "text" },
] as const;

const resourceTableColumns = [
  { id: "type", label: "Type", width: "w-[150px]", valueType: "text" },
  { id: "name", label: "Name", width: "w-[190px]", valueType: "text" },
  { id: "address", label: "Address", width: "w-[220px]", valueType: "text" },
  { id: "workspace", label: "Workspace", width: "w-[190px]", valueType: "text" },
  { id: "project", label: "Project", width: "w-[185px]", valueType: "text" },
  { id: "moduleName", label: "Module name", width: "w-[150px]", valueType: "text" },
  { id: "provider", label: "Provider", width: "w-[200px]", valueType: "text" },
  { id: "terraformVersion", label: "Terraform version", width: "w-[160px]", valueType: "number" },
  { id: "billableRum", label: "Billable RUM", width: "w-[150px]", valueType: "boolean" },
  { id: "sourceType", label: "Source type", width: "w-[150px]", valueType: "text" },
  { id: "sourceId", label: "Source ID", width: "w-[200px]", valueType: "number" },
  { id: "sourceUpdatedAt", label: "Source updated at", width: "w-[200px]", valueType: "date" },
] as const;

const terraformVersionTableColumns = [
  { id: "version", label: "Version", valueType: "text" },
  { id: "workspaceCount", label: "Workspace count", valueType: "number" },
  { id: "workspaces", label: "Workspaces", valueType: "text" },
] as const;

const operatorsByValueType = {
  text: ["is", "is not", "contains", "does not contain", "is empty", "is not empty"],
  number: ["=", "≠", ">", "<", ">=", "<=", "is empty", "is not empty"],
  date: ["before", "after"],
  boolean: ["is", "is empty", "is not empty"],
} as const;


const navItems = [
  [WorkspaceIcon, "Workspaces"], [Shield, "Policy Sets"], [ModuleIcon, "Modules"],
  [Globe, "Providers"], [ResourcesIcon, "Resources"], [TerraformIcon, "Terraform Versions"],
] as const;

type ConditionFilter = { fieldId: string; operator: string; value: string };

function matchValue(actual: unknown, valueType: string, operator: string, conditionValue: string): boolean {
  const actualText = String(actual ?? "").toLowerCase();
  const expectedText = conditionValue.toLowerCase();
  if (valueType === "text") {
    if (operator === "is") return actualText === expectedText;
    if (operator === "is not") return actualText !== expectedText;
    if (operator === "contains") return actualText.includes(expectedText);
    if (operator === "does not contain") return !actualText.includes(expectedText);
    if (operator === "is empty") return !actualText;
    if (operator === "is not empty") return Boolean(actualText);
  }
  if (valueType === "number") {
    const actualNum = Number(String(actual).replace(/[^\d.-]/g, ""));
    const expectedNum = Number(conditionValue.replace(/[^\d.-]/g, ""));
    if (operator === "=") return actualNum === expectedNum;
    if (operator === "≠") return actualNum !== expectedNum;
    if (operator === ">") return actualNum > expectedNum;
    if (operator === "<") return actualNum < expectedNum;
    if (operator === ">=") return actualNum >= expectedNum;
    if (operator === "<=") return actualNum <= expectedNum;
    if (operator === "is empty") return !actualText;
    if (operator === "is not empty") return Boolean(actualText);
  }
  if (valueType === "date") {
    const actualDate = new Date(String(actual)).getTime();
    const expectedDate = new Date(conditionValue).getTime();
    if (operator === "before") return actualDate < expectedDate;
    if (operator === "after") return actualDate > expectedDate;
  }
  if (valueType === "boolean") {
    const expectedBool = ["true", "1", "yes"].includes(expectedText);
    if (operator === "is") return Boolean(actual) === expectedBool;
    if (operator === "is empty") return actual === null || actual === undefined;
    if (operator === "is not empty") return actual !== null && actual !== undefined;
  }
  return true;
}

function SortControl() {
  return <span className="inline-flex flex-col leading-[7px] text-[#656a76]"><ChevronUp size={10} strokeWidth={1.8} /><ChevronDown size={10} strokeWidth={1.8} /></span>;
}

const moduleRows = [
  ["clouddrove/labels/aws", "1.3.0", "registry.terraform.io/modules/clouddrove/labels/aws/1.3.0", "2", "payments-prod-us-east, payments-prod-eu-west"],
  ["ILM_Demo_Space/nondeterministicg/azurerm", "0.1.1", "ILM_Demo_Space/nondeterministicg/azurerm/0.1.1", "2", "networking-prod-core, api-gateway-prod"],
  ["cloudposse/label/null", "0.24.0", "cloudposse/label/null/0.24.0", "3", "auth-service-prod, data-pipeline-prod, cdn-global-prod"],
  ["Invicton-Labs/uuid/random", "0.2.0", "registry.terraform.io/modules/Invicton-Labs/uuid/random/0.2.0", "3", "payments-prod-us-east, auth-service-prod, inventory-service-stg"],
  ["cloudposse/label/null", "0.24.1", "cloudposse/label/null/0.24.1", "4", "cdn-global-prod, networking-prod-core, payments-prod-eu-west…"],
  ["dasmeta/empty/null", "1.0.0", "registry.terraform.io/modules/dasmeta/empty/null/1.0.0", "4", "data-pipeline-prod, api-gateway-prod, auth-service-prod…"],
  ["ILM_Demo_Space/hello/random", "6.0.0", "ILM_Demo_Space/hello/random/6.0.0", "4", "payments-prod-us-east, networking-prod-core, inventory-service-stg…"],
  ["cloudposse/label/null", "0.25.0", "cloudposse/label/null/0.25.0", "8", "payments-prod-us-east, api-gateway-prod, cdn-global-prod…"],
] as const;

const providerRows = [
  ["hashicorp/azurerm", "3.35.0", "registry.terraform.io/providers/hashicorp/azurerm/3.35.0", "2", "payments-prod-us-east, networking-prod-core"],
  ["hashicorp/azurerm", "3.70.0", "registry.terraform.io/providers/hashicorp/azurerm/3.70.0", "2", "payments-prod-eu-west, api-gateway-prod"],
  ["hashicorp/azurerm", "3.76.0", "registry.terraform.io/providers/hashicorp/azurerm/3.76.0", "1", "auth-service-prod"],
  ["hashicorp/azurerm", "4.10.0", "registry.terraform.io/providers/hashicorp/azurerm/4.10.0", "2", "data-pipeline-prod, cdn-global-prod"],
  ["hashicorp/http", "3.4.1", "registry.terraform.io/providers/hashicorp/http/3.4.1", "2", "payments-prod-us-east, inventory-service-stg"],
  ["hashicorp/http", "3.6.0", "hashicorp/http/3.6.0", "2", "networking-prod-core, api-gateway-prod"],
  ["hashicorp/null", "3.2.2", "registry.terraform.io/providers/hashicorp/null/3.2.2", "1", "auth-service-prod"],
  ["hashicorp/random", "3.0.1", "registry.terraform.io/providers/hashicorp/random/3.0.1", "2", "payments-prod-eu-west, data-pipeline-prod"],
  ["hashicorp/random", "3.6.1", "registry.terraform.io/providers/hashicorp/random/3.6.1", "2", "cdn-global-prod, inventory-service-stg"],
  ["hashicorp/random", "3.6.2", "registry.terraform.io/providers/hashicorp/random/3.6.2", "1", "auth-service-prod"],
  ["hashicorp/tfe", "0.35.0", "registry.terraform.io/providers/hashicorp/tfe/0.35.0", "2", "payments-prod-us-east, networking-prod-core"],
  ["hashicorp/tfe", "0.42.0", "registry.terraform.io/providers/hashicorp/tfe/0.42.0", "2", "api-gateway-prod, cdn-global-prod"],
  ["hashicorp/tfe", "0.44.1", "registry.terraform.io/providers/hashicorp/tfe/0.44.1", "2", "data-pipeline-prod, inventory-service-stg"],
  ["hashicorp/tfe", "0.46.0", "registry.terraform.io/providers/hashicorp/tfe/0.46.0", "1", "payments-prod-eu-west"],
  ["hashicorp/tfe", "0.48.0", "registry.terraform.io/providers/hashicorp/tfe/0.48.0", "1", "auth-service-prod"],
] as const;

function RegistryTable({ rows, visibleColumnIds, conditions, onNavigate }: { rows: ReadonlyArray<readonly [string, string, string, string, string]>; visibleColumnIds: string[]; conditions: ConditionFilter[]; onNavigate: (type: string) => void }) {
  const columns = moduleTableColumns.filter(column => visibleColumnIds.includes(column.id));
  const filteredRows = conditions.length
    ? rows.filter(([name, version, source, workspaceCount, workspaces]) =>
        conditions.every(c => {
          const col = moduleTableColumns.find(col => col.id === c.fieldId);
          const val = { name, version, source, workspaceCount, workspaces }[c.fieldId as "name" | "version" | "source" | "workspaceCount" | "workspaces"] ?? "";
          return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
        })
      )
    : rows;
  return (
    <>
      <div className="overflow-hidden rounded-[6px] border border-[#dedfe3]">
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
            <tr>
              {columns.map(column => (
                <th key={column.id} className="h-12 border-r border-[#dedfe3] px-3 last:border-r-0"><span className="flex items-center justify-between gap-2">{column.label}<SortControl /></span></th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[12px] text-[#52525b]">
            {filteredRows.map(([name, version, source, workspaceCount, workspaces]) => (
              <tr key={`${name}-${version}`} className="border-t border-[#dedfe3] bg-white">
                {columns.map(column => {
                  const content = {
                    name,
                    version,
                    source: <a href="#module-source" className="text-[#0f62fe] hover:underline">{source} <ExternalLink className="inline" size={13} /></a>,
                    workspaceCount: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{workspaceCount}</a>,
                    workspaces,
                  };
                  return <td key={column.id} className="border-r border-[#dedfe3] px-3 py-4 break-words last:border-r-0">{content[column.id]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#52525b]">
        <span>1–{rows.length} of {rows.length}</span>
        <div className="flex items-center gap-3"><ChevronLeft size={15} className="text-[#9b9cb8]" /><span className="border-b-2 border-[#0f62fe] px-1 py-1 text-[#0f62fe]">1</span><ChevronRight size={15} className="text-[#656a76]" /></div>
        <span>Items per page&nbsp;&nbsp;<span className="rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-2 py-1">20 <ChevronUp className="inline" size={10} /></span></span>
      </div>
    </>
  );
}

const terraformVersionRows = [
  ["1.12.1", "1", "payments-prod-us-east"],
  ["1.14.3", "1", "payments-prod-eu-west"],
  ["1.4.6", "1", "networking-prod-core"],
  ["1.5.7", "1", "api-gateway-prod"],
  ["1.6.1", "1", "auth-service-prod"],
  ["1.6.5", "1", "data-pipeline-prod"],
  ["1.6.6", "1", "cdn-global-prod"],
  ["1.7.5", "1", "inventory-service-stg"],
  ["1.8.1", "2", "payments-prod-us-east, payments-prod-eu-west"],
  ["1.9.0", "2", "networking-prod-core, api-gateway-prod"],
  ["1.4.5", "2", "auth-service-prod, data-pipeline-prod"],
  ["1.9.5", "2", "cdn-global-prod, inventory-service-stg"],
  ["1.12.2", "3", "payments-prod-us-east, networking-prod-core, auth-service-prod"],
  ["1.14.4", "4", "payments-prod-eu-west, api-gateway-prod, data-pipeline-prod, cdn-global-prod"],
  ["1.5.4", "5", "payments-prod-us-east, auth-service-prod, networking-prod-core…"],
  ["1.7.0", "7", "api-gateway-prod, cdn-global-prod, inventory-service-stg…"],
  ["1.10.5", "8", "payments-prod-us-east, payments-prod-eu-west, networking-prod-core…"],
] as const;

function TerraformVersionsTable({ visibleColumnIds, conditions, onNavigate }: { visibleColumnIds: string[]; conditions: ConditionFilter[]; onNavigate: (type: string) => void }) {
  const columns = terraformVersionTableColumns.filter(column => visibleColumnIds.includes(column.id));
  const filteredRows = conditions.length
    ? terraformVersionRows.filter(([version, workspaceCount, workspaces]) =>
        conditions.every(c => {
          const col = terraformVersionTableColumns.find(col => col.id === c.fieldId);
          const val = ({ version, workspaceCount, workspaces } as Record<string, string>)[c.fieldId] ?? "";
          return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
        })
      )
    : terraformVersionRows;
  return (
    <>
      <div className="overflow-hidden rounded-[6px] border border-[#dedfe3]">
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]"><tr>{columns.map(column => <th key={column.id} className="h-11 border-r border-[#dedfe3] px-3 last:border-r-0"><span className="flex items-center justify-between gap-2">{column.label}<SortControl /></span></th>)}</tr></thead>
          <tbody className="text-[11px] text-[#52525b]">{filteredRows.map(([version, workspaceCount, workspaces]) => <tr key={version} className="h-11 border-t border-[#dedfe3] bg-white">{columns.map(column => { const content = { version, workspaceCount: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{workspaceCount}</a>, workspaces }; return <td key={column.id} className="border-r border-[#dedfe3] px-3 last:border-r-0">{content[column.id]}</td>; })}</tr>)}</tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#52525b]"><span>1–{filteredRows.length} of {filteredRows.length}</span><div className="flex items-center gap-3"><ChevronLeft size={15} className="text-[#9b9cb8]" /><span className="border-b-2 border-[#0f62fe] px-1 py-1 text-[#0f62fe]">1</span><ChevronRight size={15} className="text-[#656a76]" /></div><span>Items per page&nbsp;&nbsp;<span className="rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-2 py-1">20 <ChevronUp className="inline" size={10} /></span></span></div>
    </>
  );
}

const RESOURCE_WORKSPACES = [
  { name: "payments-prod-us-east", count: 47 },
  { name: "payments-prod-eu-west",  count: 43 },
  { name: "networking-prod-core",   count: 61 },
  { name: "api-gateway-prod",       count: 22 },
  { name: "auth-service-prod",      count: 29 },
  { name: "data-pipeline-prod",     count: 35 },
  { name: "cdn-global-prod",        count: 12 },
  { name: "inventory-service-stg",  count: 18 },
];

const resourceRows = Array.from({ length: 26 }, (_, index) => ({
  id: `resource-${index}`,
  type: "broke_moby_dick",
  name: index === 0 ? "four" : "test",
  address: index === 0 ? "broke_moby_dick.four" : `broke_moby_dick.test[${index === 1 ? 0 : index - 1}]`,
  workspace: RESOURCE_WORKSPACES[index % RESOURCE_WORKSPACES.length].name,
  project: "trailer",
  moduleName: "root",
  provider: "notchairmk/broke",
  terraformVersion: "1.9.5",
  billableRum: true,
  sourceType: "run",
  sourceId: "run-66GoWKvBDDRrGL83",
  sourceUpdatedAt: "-",
}));

function ResourcesTable({ visibleColumnIds, conditions, onNavigate }: { visibleColumnIds: string[]; conditions: ConditionFilter[]; onNavigate: (type: string) => void }) {
  const columns = resourceTableColumns.filter(column => visibleColumnIds.includes(column.id));
  const filteredRows = conditions.length
    ? resourceRows.filter(row =>
        conditions.every(c => {
          const col = resourceTableColumns.find(col => col.id === c.fieldId);
          const val = (row as Record<string, unknown>)[c.fieldId] ?? "";
          return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
        })
      )
    : resourceRows;
  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden rounded-[6px] border border-[#dedfe3]">
        <table className="min-w-[2300px] table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[11px] font-semibold text-[#17171a]"><tr>{columns.map(column => <th key={column.id} className={`h-12 border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`}><span className="flex items-center justify-between gap-2">{column.label}<SortControl /></span></th>)}</tr></thead>
          <tbody className="text-[11px] text-[#52525b]">
            {filteredRows.map(row => (
              <tr key={row.id} className="h-12 border-t border-[#dedfe3] bg-white">
                {columns.map(column => {
                  const content = {
                    type: row.type,
                    name: row.name,
                    address: row.address,
                    workspace: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{row.workspace}</a>,
                    project: row.project,
                    moduleName: row.moduleName,
                    provider: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Providers"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{row.provider}</a>,
                    terraformVersion: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Terraform Versions"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{row.terraformVersion}</a>,
                    billableRum: <span className="rounded-[4px] bg-[#dedfe3] px-1.5 py-0.5 font-medium text-[#52525b]">true</span>,
                    sourceType: row.sourceType,
                    sourceId: row.sourceId,
                    sourceUpdatedAt: row.sourceUpdatedAt,
                  };
                  return <td key={column.id} className={`border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`}>{content[column.id]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#52525b]"><span>1–20 of 3427</span><div className="flex items-center gap-3"><ChevronLeft size={15} className="text-[#9b9cb8]" /><span className="border-b-2 border-[#0f62fe] px-1 py-1 text-[#0f62fe]">1</span><span>2</span><span>3</span><span>4</span><span>…</span><span>171</span><span>172</span><ChevronRight size={15} /></div><span>Items per page&nbsp;&nbsp;<span className="rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-2 py-1">20 <ChevronUp className="inline" size={10} /></span></span></div>
    </>
  );
}

// ── Policy Sets Table ───────────────────────────────────────────────────────

type PolicyDetail = {
  policySet: string;
  status: "passed" | "failed";
  failCount?: number;
  ruleStatus: string;
  severity: string;
  log: string;
  logType: "success" | "failure";
  runSource: string;
};

type PolicySetRow = {
  id: string;
  name: string;
  framework: string;
  frameworkVersion: string;
  sourceType: "Individually Managed" | "VCS" | "Global";
  policyCount: number;
  scope: "Project" | "Workspaces";
  projects: string;
  workspaces: string;
  enforcementLevel: string;
  passCount: number;
  failCount: number;
  errorCount: number;
  detail: PolicyDetail;
};

const policySetRows: PolicySetRow[] = [
  {
    id: "ce-dr-999", name: "ce-dr-999", framework: "OPA", frameworkVersion: "OPA 3.0",
    sourceType: "Individually Managed", policyCount: 28, scope: "Project", projects: "trailer", workspaces: "—",
    enforcementLevel: "Hard Mandatory", passCount: 28, failCount: 0, errorCount: 0,
    detail: { policySet: "OPA Corporate security shield", status: "passed", ruleStatus: "package terraform.analysis [Compliant]", severity: "Hard mandatory rules evaluated (0 denies)", log: "OPA engine found no policy violations. Empty deny array returned.", logType: "success", runSource: "run-u2m9K4dfk" },
  },
  {
    id: "ce-pojzu-ef", name: "ce-pojzu-ef", framework: "OPA", frameworkVersion: "OPA 3.0",
    sourceType: "Individually Managed", policyCount: 18, scope: "Project", projects: "trailer", workspaces: "—",
    enforcementLevel: "Soft Mandatory", passCount: 17, failCount: 1, errorCount: 0,
    detail: { policySet: "OPA Corporate security shield", status: "failed", failCount: 1, ruleStatus: "rule: deny[msg] → tags_missing [Non-compliant]", severity: "Soft Mandatory (Exception override permitted)", log: "[REGO_FAIL] Missing mandatory tags: 'Environment' and 'Owner'.", logType: "failure", runSource: "run-65sdf654r45" },
  },
  {
    id: "greep-ntwo-000", name: "greep-ntwo-000", framework: "OPA", frameworkVersion: "OPA 3.0",
    sourceType: "Individually Managed", policyCount: 3, scope: "Project", projects: "platform", workspaces: "—",
    enforcementLevel: "Hard Mandatory", passCount: 2, failCount: 1, errorCount: 0,
    detail: { policySet: "OPA Corporate security shield", status: "failed", failCount: 1, ruleStatus: "rule: deny[msg] → network_open [Non-compliant]", severity: "Hard Mandatory (Deployment blocked)", log: "[REGO_FAIL] Outbound rule 0.0.0.0/0 is not permitted on this workspace.", logType: "failure", runSource: "run-92jkdfl33" },
  },
  {
    id: "shn-foundry", name: "shn-foundry", framework: "tf-policy", frameworkVersion: "tf-policy 1.0",
    sourceType: "VCS", policyCount: 3, scope: "Workspaces", projects: "—", workspaces: "shn-foundry-ws",
    enforcementLevel: "Hard Mandatory", passCount: 3, failCount: 0, errorCount: 0,
    detail: { policySet: "tfPolicy Networking Baseline", status: "passed", ruleStatus: "8/8 tfpolicy assertions verified [Compliant]", severity: "Hard Mandatory rules evaluated (0 failures)", log: "All target attributes successfully satisfied HCL assert conditions.", logType: "success", runSource: "run-9uflskdflkdfjkn" },
  },
  {
    id: "shn-ry-559", name: "shn-ry-559", framework: "tf-policy", frameworkVersion: "tf-policy 1.0",
    sourceType: "VCS", policyCount: 3, scope: "Workspaces", projects: "—", workspaces: "shn-ry-559-ws",
    enforcementLevel: "Soft Mandatory", passCount: 0, failCount: 3, errorCount: 0,
    detail: { policySet: "tfPolicy Networking Baseline", status: "failed", failCount: 3, ruleStatus: "assert: restrict_ingress_anywhere [Non-compliant]", severity: "Soft Mandatory (Requires team lead exception).", log: "[HCL_ASSERT] Security group sg-945u4 cannot allow 0.0.0.0/0 on port 22.", logType: "failure", runSource: "run-u2m9K498ds" },
  },
  {
    id: "sent-jh-983", name: "sent-jh-983", framework: "Sentinel", frameworkVersion: "Sentinel 2.0",
    sourceType: "Global", policyCount: 3, scope: "Workspaces", projects: "—", workspaces: "sent-jh-983-ws",
    enforcementLevel: "Advisory", passCount: 3, failCount: 0, errorCount: 0,
    detail: { policySet: "Sentinel Cost Optimization", status: "passed", ruleStatus: "main = rule { check_cost } [Compliant]", severity: "Advisory rules evaluated (0 alerts triggered)", log: "Sentinel trace evaluation completed: main condition returned TRUE.", logType: "success", runSource: "run-u2mdjfdsfidsfnjkB" },
  },
  {
    id: "sefjn-ngi-256", name: "sefjn-ngi-256", framework: "Sentinel", frameworkVersion: "Sentinel 2.0",
    sourceType: "Global", policyCount: 3, scope: "Workspaces", projects: "—", workspaces: "sefjn-ngi-256-ws",
    enforcementLevel: "Hard Mandatory", passCount: 0, failCount: 3, errorCount: 0,
    detail: { policySet: "Sentinel Cost Optimization", status: "failed", failCount: 3, ruleStatus: "rule: limit-proposed-monthly-cost [Non-compliant]", severity: "Hard Mandatory (Deployment permanently blocked)", log: "[SENTINEL_TRACER] Cost delta +$1,500.00 violates rules threshold ($500.00).", logType: "failure", runSource: "run-senfofjd689795416" },
  },
  {
    id: "opa-infra-base", name: "opa-infra-base", framework: "OPA", frameworkVersion: "OPA 3.0",
    sourceType: "VCS", policyCount: 12, scope: "Project", projects: "infra-core", workspaces: "—",
    enforcementLevel: "Advisory", passCount: 12, failCount: 0, errorCount: 0,
    detail: { policySet: "OPA Infra Baseline", status: "passed", ruleStatus: "package infra.base [Compliant]", severity: "Advisory rules evaluated (0 alerts triggered)", log: "No policy violations detected across all resource types.", logType: "success", runSource: "run-xp3ls9A0bc" },
  },
  {
    id: "sent-cost-prod", name: "sent-cost-prod", framework: "Sentinel", frameworkVersion: "Sentinel 2.0",
    sourceType: "Individually Managed", policyCount: 6, scope: "Project", projects: "payments", workspaces: "—",
    enforcementLevel: "Hard Mandatory", passCount: 5, failCount: 0, errorCount: 1,
    detail: { policySet: "Sentinel Cost Guard", status: "passed", ruleStatus: "main = rule { validate_budget } [Compliant]", severity: "Hard mandatory rules evaluated (1 error, 0 denies)", log: "One policy check errored due to missing cost data attribute. Remaining checks passed.", logType: "success", runSource: "run-sentprodcost01" },
  },
  {
    id: "tf-network-global", name: "tf-network-global", framework: "tf-policy", frameworkVersion: "tf-policy 1.0",
    sourceType: "Global", policyCount: 8, scope: "Workspaces", projects: "—", workspaces: "net-ws-01, net-ws-02, net-ws-03",
    enforcementLevel: "Soft Mandatory", passCount: 6, failCount: 2, errorCount: 0,
    detail: { policySet: "tfPolicy Global Network Rules", status: "failed", failCount: 2, ruleStatus: "assert: enforce_private_subnet [Non-compliant]", severity: "Soft Mandatory (Requires team lead exception).", log: "[HCL_ASSERT] Subnet 10.0.1.0/24 does not have private routing configured.", logType: "failure", runSource: "run-net-glob-004" },
  },
  {
    id: "opa-tags-enforce", name: "opa-tags-enforce", framework: "OPA", frameworkVersion: "OPA 3.0",
    sourceType: "VCS", policyCount: 4, scope: "Project", projects: "shared-infra", workspaces: "—",
    enforcementLevel: "Hard Mandatory", passCount: 4, failCount: 0, errorCount: 0,
    detail: { policySet: "OPA Tag Enforcement", status: "passed", ruleStatus: "package tags.enforce [Compliant]", severity: "Hard mandatory rules evaluated (0 denies)", log: "All required tags (Environment, Owner, CostCenter) present on all resources.", logType: "success", runSource: "run-opatagsenf009" },
  },
  {
    id: "sent-sec-adv", name: "sent-sec-adv", framework: "Sentinel", frameworkVersion: "Sentinel 2.0",
    sourceType: "Global", policyCount: 5, scope: "Workspaces", projects: "—", workspaces: "sec-ws-prod, sec-ws-stg",
    enforcementLevel: "Advisory", passCount: 4, failCount: 1, errorCount: 0,
    detail: { policySet: "Sentinel Security Advisor", status: "failed", failCount: 1, ruleStatus: "rule: check_encryption [Non-compliant]", severity: "Advisory (warning only, not blocking)", log: "[SENTINEL] S3 bucket without server-side encryption detected.", logType: "failure", runSource: "run-sentsecadv112" },
  },
];

const policySetColumns = [
  { id: "name", label: "Name", width: "w-[200px]" },
  { id: "framework", label: "Policy framework", width: "w-[160px]" },
  { id: "frameworkVersion", label: "Framework version", width: "w-[170px]" },
  { id: "sourceType", label: "Source type", width: "w-[190px]" },
  { id: "policyCount", label: "Policy count", width: "w-[140px]" },
  { id: "scope", label: "Scope", width: "w-[140px]" },
  { id: "projects", label: "Projects", width: "w-[160px]" },
  { id: "workspaces", label: "Workspaces", width: "w-[180px]" },
  { id: "passCount", label: "Pass count", width: "w-[130px]" },
  { id: "failCount", label: "Fail count", width: "w-[130px]" },
  { id: "errorCount", label: "Error count", width: "w-[130px]" },
] as const;

function PolicySetsTable({ conditions, onNavigate }: { conditions: ConditionFilter[]; onNavigate: (type: string) => void }) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setExpandedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const filteredRows = conditions.length
    ? policySetRows.filter(row =>
        conditions.every(c => {
          const col = policySetColumns.find(col => col.id === c.fieldId);
          const val = (row as Record<string, unknown>)[c.fieldId] ?? "";
          return matchValue(val, col ? "text" : "text", c.operator, c.value);
        })
      )
    : policySetRows;

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden rounded-[6px] border border-[#dedfe3]">
        <table className="min-w-[2100px] table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
            <tr>
              <th className="h-12 w-10 border-r border-[#dedfe3] px-3" />
              {policySetColumns.map(col => (
                <th key={col.id} className={`h-12 border-r border-[#dedfe3] px-3 last:border-r-0 ${col.width}`}>
                  <span className="flex items-center justify-between gap-2 whitespace-nowrap">{col.label}<SortControl /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[12px] text-[#52525b]">
            {filteredRows.map(row => {
              const isExpanded = expandedIds.has(row.id);
              return (
                <React.Fragment key={row.id}>
                  <tr className="h-12 border-t border-[#dedfe3] bg-white">
                    <td className="border-r border-[#dedfe3] px-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggle(row.id)}
                        className="inline-flex items-center justify-center rounded text-[#656a76] hover:text-[#3b3d45]"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[200px]">
                      <a href="#policy-set" className="text-[#1060ff] underline underline-offset-2 whitespace-nowrap">{row.name}</a>
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[160px] whitespace-nowrap">{row.framework}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[170px] whitespace-nowrap">{row.frameworkVersion}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[190px] whitespace-nowrap">{row.sourceType}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[140px]">
                      <a href="#policies" className="text-[#1060ff] underline underline-offset-2">{row.policyCount}</a>
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[140px] whitespace-nowrap">{row.scope}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[160px] whitespace-nowrap">{row.scope === "Project" ? <a href="#projects" className="text-[#1060ff] underline underline-offset-2">{row.projects}</a> : <span className="text-[#9b9cb8]">—</span>}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[180px] whitespace-nowrap">{row.scope === "Workspaces" ? <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{row.workspaces}</a> : <span className="text-[#9b9cb8]">—</span>}</td>
                    <td className="border-r border-[#dedfe3] px-3 w-[130px]">
                      <span className="text-[#198038]">{row.passCount}</span>
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[130px]">
                      {row.failCount > 0 ? <span className="text-[#a2191f] font-medium">{row.failCount}</span> : <span>{row.failCount}</span>}
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[130px] last:border-r-0">
                      {row.errorCount > 0 ? <span className="text-[#b45309] font-medium">{row.errorCount}</span> : <span>{row.errorCount}</span>}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-t border-[#dedfe3] bg-[#f8f9fa]">
                      <td />
                      <td colSpan={policySetColumns.length} className="px-6 py-4">
                        <div className="flex flex-col gap-2 text-[12px]">
                          <div className="flex items-center gap-3">
                            <span className="w-[120px] shrink-0 text-[#656a76]">Policy set:</span>
                            <span className="font-medium text-[#3b3d45]">{row.detail.policySet}</span>
                            {row.detail.status === "passed" ? (
                              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#24a148] bg-[#defbe6] px-2 py-0.5 text-[11px] font-medium text-[#0e6027]">
                                ✓ Passed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#f59e0b] bg-[#fef3c7] px-2 py-0.5 text-[11px] font-medium text-[#92400e]">
                                ⚠ {row.detail.failCount} {row.detail.failCount === 1 ? "Policy failed" : "Policies failed"}
                              </span>
                            )}
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="w-[120px] shrink-0 text-[#656a76]">Rule status:</span>
                            <span className="text-[#3b3d45] font-mono text-[11px]">{row.detail.ruleStatus}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="w-[120px] shrink-0 text-[#656a76]">Severity:</span>
                            <span className="text-[#3b3d45]">{row.detail.severity}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="w-[120px] shrink-0 text-[#656a76]">{row.detail.logType === "success" ? "Success Log:" : "Failure Log:"}</span>
                            <span className={`text-[#3b3d45] ${row.detail.logType === "failure" ? "text-[#a2191f]" : ""}`}>{row.detail.log}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-[120px] shrink-0 text-[#656a76]">Run Source:</span>
                            <a href="#run" className="text-[#1060ff] underline underline-offset-2 font-mono text-[11px]">{row.detail.runSource}</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#52525b]">
        <span>1–{policySetRows.length} of {policySetRows.length}</span>
        <div className="flex items-center gap-3">
          <ChevronLeft size={15} className="text-[#9b9cb8]" />
          <span className="border-b-2 border-[#1060ff] px-1 py-1 text-[#1060ff]">1</span>
          <ChevronRight size={15} className="text-[#656a76]" />
        </div>
        <span>Items per page&nbsp;&nbsp;<span className="rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-2 py-1">20 <ChevronUp className="inline" size={10} /></span></span>
      </div>
    </>
  );
}

// ── Topology Graph ──────────────────────────────────────────────────────────

const NODE_COLORS: Record<string, string> = {
  workspace: "#9b8ff5",
  module: "#818cf8",
  provider: "#34d399",
  "terraform-version": "#38bdf8",
  "resource-compute": "#f472b6",
  "resource-identity": "#fb923c",
  "resource-networking": "#60a5fa",
  "resource-security": "#c084fc",
  "resource-storage": "#2dd4bf",
  "policy-set": "#fbbf24",
};

const SELECTED_COLOR = "#f97316";
const NEIGHBOR_COLOR = "#22c55e";
const VW = 1200;
const VH = 660;
const NODE_R = 20;

type TopoNode = {
  id: string;
  label: string;
  type: string;
  secondary: string;
  data: Record<string, string | number | boolean>;
};
type TopoEdge = { source: string; target: string };

function buildTopoGraph(activeType: string): { nodes: TopoNode[]; edges: TopoEdge[] } {
  const nodes: TopoNode[] = [];
  const edgeSet = new Set<string>();
  const edges: TopoEdge[] = [];

  function addEdge(a: string, b: string) {
    if (a === b) return;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (!edgeSet.has(key)) { edgeSet.add(key); edges.push({ source: a, target: b }); }
  }

  if (activeType === "Workspaces") {
    const subset = workspaceRows.slice(0, 16);
    for (const ws of subset) {
      const wsProviders = ["registry.terraform.io/hashicorp/aws", "registry.terraform.io/hashicorp/google", "registry.terraform.io/hashicorp/azurerm", "registry.terraform.io/hashicorp/kubernetes"][ws.count % 4];
      nodes.push({ id: `ws-${ws.id}`, label: ws.name, type: "workspace", secondary: `${ws.count} res`, data: { org: "hashicorp-demo", project: ws.project, resources: ws.count, providers: wsProviders, runStatus: ws.runStatus, tags: ws.tags, created: ws.created } });
    }
    // Connect workspaces sharing a project (peer-to-peer within each project cluster)
    const byProject = new Map<string, string[]>();
    for (const ws of subset) {
      if (!byProject.has(ws.project)) byProject.set(ws.project, []);
      byProject.get(ws.project)!.push(`ws-${ws.id}`);
    }
    for (const [, ids] of byProject) {
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) addEdge(ids[i], ids[j]);
      }
    }
    // Cross-project connections: chain workspaces by status (applied → planned → errored ring)
    const byStatus = new Map<string, string[]>();
    for (const ws of subset) {
      if (!byStatus.has(ws.status)) byStatus.set(ws.status, []);
      byStatus.get(ws.status)!.push(`ws-${ws.id}`);
    }
    for (const [, ids] of byStatus) {
      for (let i = 0; i < ids.length - 1 && i < 2; i++) addEdge(ids[i], ids[i + 1]);
    }
  }

  else if (activeType === "Modules") {
    // Build workspace → modules index for peer connections
    const wsByModule = new Map<string, string[]>();
    for (const [name, version, , , wsList] of moduleRows) {
      const nodeId = `mod-${name}-${version}`;
      const shortName = name.split("/").slice(-2).join("/");
      nodes.push({ id: nodeId, label: shortName, type: "module", secondary: `v${version}`, data: { name, version, workspaces: wsList } });
      const wsNames = wsList.split(",").map((w: string) => w.trim().replace("…", "")).filter(Boolean);
      for (const ws of wsNames) {
        if (!wsByModule.has(ws)) wsByModule.set(ws, []);
        wsByModule.get(ws)!.push(nodeId);
      }
    }
    // Connect modules that share a workspace (they're peers in that workspace)
    for (const [, mIds] of wsByModule) {
      for (let i = 0; i < mIds.length; i++) {
        for (let j = i + 1; j < mIds.length; j++) addEdge(mIds[i], mIds[j]);
      }
    }
  }

  else if (activeType === "Providers") {
    // Add provider nodes and track which workspace connects to each
    const wsNodeIds = new Map<string, string>(); // workspace name → node id
    for (const [name, version, , wsCount, workspace] of providerRows) {
      const nodeId = `prov-${name.replace("/", "_")}-${version}`;
      const baseName = name.split("/").pop()!;
      nodes.push({ id: nodeId, label: `${baseName} ${version}`, type: "provider", secondary: `${wsCount} ws`, data: { name, version, workspace } });
      // Add workspace node if not already added
      if (!wsNodeIds.has(workspace)) {
        const wsId = `ws-prov-${workspace}`;
        wsNodeIds.set(workspace, wsId);
        nodes.push({ id: wsId, label: workspace, type: "workspace", secondary: "workspace", data: { name: workspace } });
      }
      // Connect provider → its workspace
      addEdge(nodeId, wsNodeIds.get(workspace)!);
    }
    // Connect providers of the same family (azurerm group, tfe group, etc.)
    const families = new Map<string, string[]>();
    for (const [name, version] of providerRows) {
      const base = name.split("/").pop()!;
      const nodeId = `prov-${name.replace("/", "_")}-${version}`;
      if (!families.has(base)) families.set(base, []);
      families.get(base)!.push(nodeId);
    }
    for (const [, ids] of families) {
      for (let i = 0; i < ids.length - 1; i++) addEdge(ids[i], ids[i + 1]);
    }
    // Cross-family: connect first of each family group to the next
    const familyLeaders = [...families.values()].map(ids => ids[0]);
    for (let i = 0; i < familyLeaders.length - 1; i++) addEdge(familyLeaders[i], familyLeaders[i + 1]);
  }

  else if (activeType === "Terraform Versions") {
    const wsNodeIds = new Map<string, string>(); // workspace name → node id
    for (const [version, wsCount, wsList] of terraformVersionRows) {
      const versionNodeId = `tfver-${version}`;
      nodes.push({ id: versionNodeId, label: version, type: "terraform-version", secondary: `${wsCount} ws`, data: { version, workspaces: wsList } });
      // Parse workspace names (strip trailing ellipsis annotations)
      const wsNames = wsList.split(",").map(s => s.trim().replace(/…$/, "").trim()).filter(Boolean);
      for (const wsName of wsNames) {
        if (!wsNodeIds.has(wsName)) {
          const wsId = `ws-tfver-${wsName}`;
          wsNodeIds.set(wsName, wsId);
          nodes.push({ id: wsId, label: wsName, type: "workspace", secondary: "workspace", data: { name: wsName } });
        }
        addEdge(versionNodeId, wsNodeIds.get(wsName)!);
      }
    }
    // Connect versions in the same major.minor series (e.g., 1.9.x peers)
    const byMinor = new Map<string, string[]>();
    for (const [version] of terraformVersionRows) {
      const minor = version.split(".").slice(0, 2).join(".");
      if (!byMinor.has(minor)) byMinor.set(minor, []);
      byMinor.get(minor)!.push(`tfver-${version}`);
    }
    for (const [, ids] of byMinor) {
      for (let i = 0; i < ids.length - 1; i++) addEdge(ids[i], ids[i + 1]);
    }
    // Cross-minor: connect adjacent minor groups
    const minorLeaders = [...byMinor.values()].map(ids => ids[0]);
    for (let i = 0; i < minorLeaders.length - 1; i++) addEdge(minorLeaders[i], minorLeaders[i + 1]);
  }

  else if (activeType === "Resources") {
    const SUBTYPES = ["compute", "identity", "networking", "security", "storage"] as const;
    const bySubtype = new Map<string, string[]>();
    const wsNodeIds = new Map<string, string>();
    for (let i = 0; i < resourceRows.length; i++) {
      const row = resourceRows[i];
      const subType = SUBTYPES[i % 5];
      const typeKey = `resource-${subType}`;
      const nodeId = `res-${row.id}`;
      nodes.push({ id: nodeId, label: row.address, type: typeKey, secondary: subType, data: { name: row.name, workspace: row.workspace, provider: row.provider, version: row.terraformVersion } });
      if (!bySubtype.has(typeKey)) bySubtype.set(typeKey, []);
      bySubtype.get(typeKey)!.push(nodeId);
      // Add workspace node and connect
      if (!wsNodeIds.has(row.workspace)) {
        const wsId = `ws-res-${row.workspace}`;
        wsNodeIds.set(row.workspace, wsId);
        nodes.push({ id: wsId, label: row.workspace, type: "workspace", secondary: "workspace", data: { name: row.workspace } });
      }
      addEdge(nodeId, wsNodeIds.get(row.workspace)!);
    }
    // Chain resources within each sub-type
    for (const [, ids] of bySubtype) {
      for (let i = 0; i < ids.length - 1; i++) addEdge(ids[i], ids[i + 1]);
    }
    // Connect subtype leaders to each other (star from networking, which is the "core")
    const leaders = [...bySubtype.entries()].map(([, ids]) => ids[0]);
    const netLeader = bySubtype.get("resource-networking")?.[0];
    if (netLeader) {
      for (const ldr of leaders) { if (ldr !== netLeader) addEdge(netLeader, ldr); }
    }
  }

  else if (activeType === "Policy Sets") {
    const mockPS = [
      { id: "ps-1", label: "production-policies",  secondary: "8 policies",  wsList: ["payments-prod", "api-gateway-prod", "auth-service-prod"],                         data: { mode: "enforced", workspaces: "12", policies: "8",  scope: "global"      } },
      { id: "ps-2", label: "staging-policies",      secondary: "5 policies",  wsList: ["payments-staging", "api-gateway-staging"],                                        data: { mode: "advisory", workspaces: "6",  policies: "5",  scope: "staging"     } },
      { id: "ps-3", label: "networking-policies",   secondary: "3 policies",  wsList: ["networking-prod-core", "cdn-global-prod"],                                        data: { mode: "enforced", workspaces: "4",  policies: "3",  scope: "network"     } },
      { id: "ps-4", label: "security-baseline",     secondary: "12 policies", wsList: ["payments-prod", "auth-service-prod", "data-pipeline-prod", "inventory-svc-stg"], data: { mode: "enforced", workspaces: "18", policies: "12", scope: "global"      } },
      { id: "ps-5", label: "cost-controls",         secondary: "4 policies",  wsList: ["api-gateway-prod", "cdn-global-prod"],                                           data: { mode: "advisory", workspaces: "8",  policies: "4",  scope: "billing"     } },
      { id: "ps-6", label: "compliance-hipaa",      secondary: "10 policies", wsList: ["auth-service-prod", "data-pipeline-prod"],                                       data: { mode: "enforced", workspaces: "5",  policies: "10", scope: "compliance"  } },
      { id: "ps-7", label: "data-governance",       secondary: "6 policies",  wsList: ["data-pipeline-prod", "inventory-svc-stg", "payments-prod"],                      data: { mode: "enforced", workspaces: "7",  policies: "6",  scope: "data"        } },
    ];
    const wsNodeIds = new Map<string, string>();
    for (const ps of mockPS) {
      nodes.push({ id: ps.id, label: ps.label, type: "policy-set", secondary: ps.secondary, data: ps.data });
      for (const wsName of ps.wsList) {
        if (!wsNodeIds.has(wsName)) {
          const wsId = `ws-ps-${wsName}`;
          wsNodeIds.set(wsName, wsId);
          nodes.push({ id: wsId, label: wsName, type: "workspace", secondary: "workspace", data: { name: wsName } });
        }
        addEdge(ps.id, wsNodeIds.get(wsName)!);
      }
    }
    // Connect enforced policies in a ring, advisory to enforced neighbors
    const enforced = mockPS.filter(p => p.data.mode === "enforced").map(p => p.id);
    const advisory = mockPS.filter(p => p.data.mode === "advisory").map(p => p.id);
    for (let i = 0; i < enforced.length; i++) addEdge(enforced[i], enforced[(i + 1) % enforced.length]);
    for (const aId of advisory) addEdge(aId, enforced[0]);
  }

  return { nodes, edges };
}

function runForceLayout(nodes: TopoNode[], edges: TopoEdge[]): Map<string, { x: number; y: number }> {
  const pos = new Map<string, { x: number; y: number }>();
  // Seed deterministically in a circle so layout is stable across renders
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    const r = Math.min(VW, VH) * 0.29;
    pos.set(node.id, { x: VW / 2 + r * Math.cos(angle), y: VH / 2 + r * Math.sin(angle) });
  });

  const vel = new Map<string, { x: number; y: number }>();
  nodes.forEach(n => vel.set(n.id, { x: 0, y: 0 }));

  const REPULSION = 8000;
  const ATTRACTION = 0.04;
  const DAMPING = 0.78;
  const PADDING = NODE_R + 50;

  for (let iter = 0; iter < 320; iter++) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const pa = pos.get(nodes[a].id)!;
        const pb = pos.get(nodes[b].id)!;
        const dx = pa.x - pb.x || 0.1;
        const dy = pa.y - pb.y || 0.1;
        const dist2 = Math.max(dx * dx + dy * dy, 100);
        const dist = Math.sqrt(dist2);
        const force = REPULSION / dist2;
        const fx = (force * dx) / dist;
        const fy = (force * dy) / dist;
        vel.get(nodes[a].id)!.x += fx;
        vel.get(nodes[a].id)!.y += fy;
        vel.get(nodes[b].id)!.x -= fx;
        vel.get(nodes[b].id)!.y -= fy;
      }
    }
    for (const edge of edges) {
      const ps = pos.get(edge.source);
      const pt = pos.get(edge.target);
      if (!ps || !pt) continue;
      const dx = pt.x - ps.x; const dy = pt.y - ps.y;
      vel.get(edge.source)!.x += ATTRACTION * dx;
      vel.get(edge.source)!.y += ATTRACTION * dy;
      vel.get(edge.target)!.x -= ATTRACTION * dx;
      vel.get(edge.target)!.y -= ATTRACTION * dy;
    }
    for (const node of nodes) {
      const p = pos.get(node.id)!; const v = vel.get(node.id)!;
      v.x *= DAMPING; v.y *= DAMPING;
      p.x = Math.max(PADDING, Math.min(VW - PADDING, p.x + v.x));
      p.y = Math.max(PADDING, Math.min(VH - PADDING, p.y + v.y));
    }
  }
  return pos;
}

function runStackedLayout(nodes: TopoNode[]): Map<string, { x: number; y: number }> {
  const pos = new Map<string, { x: number; y: number }>();
  if (nodes.length === 0) return pos;

  // Group nodes by type so same-type nodes form columns
  const typeOrder: string[] = [];
  const byType = new Map<string, TopoNode[]>();
  for (const n of nodes) {
    if (!byType.has(n.type)) { byType.set(n.type, []); typeOrder.push(n.type); }
    byType.get(n.type)!.push(n);
  }

  const colCount = typeOrder.length;
  const colGap = Math.min(200, (VW - 120) / Math.max(colCount, 1));
  const startX = VW / 2 - (colGap * (colCount - 1)) / 2;
  const rowGap = 80;
  const PADDING_TOP = 80;

  typeOrder.forEach((type, colIdx) => {
    const group = byType.get(type)!;
    group.forEach((node, rowIdx) => {
      pos.set(node.id, {
        x: startX + colIdx * colGap,
        y: PADDING_TOP + rowIdx * rowGap,
      });
    });
  });
  return pos;
}

function runRadialLayout(nodes: TopoNode[]): Map<string, { x: number; y: number }> {
  const pos = new Map<string, { x: number; y: number }>();
  if (nodes.length === 0) return pos;

  // Group by type: first type goes in center ring, rest on outer ring
  const typeOrder: string[] = [];
  const byType = new Map<string, TopoNode[]>();
  for (const n of nodes) {
    if (!byType.has(n.type)) { byType.set(n.type, []); typeOrder.push(n.type); }
    byType.get(n.type)!.push(n);
  }

  const cx = VW / 2;
  const cy = VH / 2;
  const innerR = Math.min(VW, VH) * 0.13;
  const outerR = Math.min(VW, VH) * 0.34;

  // Total nodes spread evenly on two concentric rings
  const total = nodes.length;
  const innerCount = Math.max(1, Math.min(Math.ceil(total * 0.28), typeOrder.length));
  const outerCount = total - innerCount;

  // Flatten preserving type grouping
  const flat = typeOrder.flatMap(t => byType.get(t)!);

  flat.forEach((node, i) => {
    if (i < innerCount) {
      const angle = (2 * Math.PI * i) / innerCount - Math.PI / 2;
      pos.set(node.id, { x: cx + innerR * Math.cos(angle), y: cy + innerR * Math.sin(angle) });
    } else {
      const oi = i - innerCount;
      const angle = (2 * Math.PI * oi) / outerCount - Math.PI / 2;
      pos.set(node.id, { x: cx + outerR * Math.cos(angle), y: cy + outerR * Math.sin(angle) });
    }
  });
  return pos;
}

function curvePath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
}

type LucideIcon = React.ComponentType<LucideProps>;

const NODE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  workspace: WorkspaceIcon,
  "policy-set": Shield,
  module: ModuleIcon,
  provider: Globe,
  "terraform-version": TerraformIcon,
  "resource-compute": Cpu,
  "resource-identity": User,
  "resource-networking": Globe,
  "resource-security": Lock,
  "resource-storage": HardDrive,
};

// Fallback for unknown types
const DEFAULT_NODE_ICON: LucideIcon = Server;

type TopoLayout = "force" | "stacked" | "radial";

function TopologyGraph({ activeType, initialWorkspace, onViewResources }: { activeType: string; initialWorkspace?: string | null; onViewResources?: (workspaceName: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [blastRadiusId, setBlastRadiusId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [topoLayout, setTopoLayout] = useState<TopoLayout>("force");
  const [zoom, setZoom] = useState({ tx: 0, ty: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(initialWorkspace ?? null);
  useEffect(() => { if (initialWorkspace !== undefined) setSelectedWorkspace(initialWorkspace ?? null); }, [initialWorkspace]);
  const [providerSourceInput, setProviderSourceInput] = useState("");
  const [providerVersionInput, setProviderVersionInput] = useState("");
  const [providerSourceFilter, setProviderSourceFilter] = useState("");
  const [providerVersionFilter, setProviderVersionFilter] = useState("");

  const { nodes, edges } = useMemo(() => buildTopoGraph(activeType), [activeType]);
  const forcePositions = useMemo(() => runForceLayout(nodes, edges), [nodes, edges]);
  const stackedPositions = useMemo(() => runStackedLayout(nodes), [nodes]);
  const radialPositions = useMemo(() => runRadialLayout(nodes), [nodes]);
  const positions = topoLayout === "stacked" ? stackedPositions : topoLayout === "radial" ? radialPositions : forcePositions;

  // Filter nodes/edges based on active filters (hide completely, don't dim)
  const visibleNodes = useMemo(() => {
    if (activeType === "Providers" && (providerSourceFilter || providerVersionFilter)) {
      return nodes.filter(n =>
        (!providerSourceFilter || String(n.data?.name ?? "").toLowerCase().includes(providerSourceFilter.toLowerCase())) &&
        (!providerVersionFilter || String(n.data?.version ?? "").toLowerCase().includes(providerVersionFilter.toLowerCase()))
      );
    }
    if (activeType === "Resources" && selectedWorkspace !== null) {
      return nodes.filter(n =>
        n.data?.workspace === selectedWorkspace ||
        (n.type === "workspace" && n.data?.name === selectedWorkspace)
      );
    }
    return nodes;
  }, [nodes, activeType, providerSourceFilter, providerVersionFilter, selectedWorkspace]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() =>
    edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)),
    [edges, visibleNodeIds]
  );

  const neighborSet = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const s = new Set<string>();
    for (const e of edges) {
      if (e.source === selectedId) s.add(e.target);
      if (e.target === selectedId) s.add(e.source);
    }
    return s;
  }, [selectedId, edges]);

  const hoverNeighborSet = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const s = new Set<string>();
    for (const e of edges) {
      if (e.source === hoveredId) s.add(e.target);
      if (e.target === hoveredId) s.add(e.source);
    }
    return s;
  }, [hoveredId, edges]);

  // Blast radius: all nodes reachable from blastRadiusId via any edge path
  const blastRadiusSet = useMemo(() => {
    if (!blastRadiusId) return new Set<string>();
    const visited = new Set<string>([blastRadiusId]);
    const queue = [blastRadiusId];
    while (queue.length) {
      const cur = queue.shift()!;
      for (const e of edges) {
        const neighbor = e.source === cur ? e.target : e.target === cur ? e.source : null;
        if (neighbor && !visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    return visited;
  }, [blastRadiusId, edges]);

  const selectedNode = nodes.find(n => n.id === selectedId) ?? null;
  const selectedPos = selectedId ? positions.get(selectedId) : null;

  function getSVGPoint(clientX: number, clientY: number) {
    const el = svgRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (VW / rect.width),
      y: (clientY - rect.top) * (VH / rect.height),
    };
  }

  function handleWheel(e: React.WheelEvent<SVGSVGElement>) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const { x: cx, y: cy } = getSVGPoint(e.clientX, e.clientY);
    setZoom(prev => {
      const newScale = Math.max(0.25, Math.min(6, prev.scale * factor));
      const newTx = cx - (cx - prev.tx) * (newScale / prev.scale);
      const newTy = cy - (cy - prev.ty) * (newScale / prev.scale);
      return { tx: newTx, ty: newTy, scale: newScale };
    });
  }

  function handleMouseDown(e: React.MouseEvent<SVGRectElement>) {
    if (e.button !== 0) return;
    dragRef.current = { x: e.clientX, y: e.clientY, tx: zoom.tx, ty: zoom.ty };
    setDragging(true);
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!dragging) return;
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - dragRef.current.x) * (VW / rect.width);
    const dy = (e.clientY - dragRef.current.y) * (VH / rect.height);
    const { tx: ox, ty: oy } = dragRef.current;
    setZoom(prev => ({ ...prev, tx: ox + dx, ty: oy + dy }));
  }

  function handleMouseUp() { setDragging(false); }

  function zoomBy(factor: number) {
    setZoom(prev => {
      const newScale = Math.max(0.25, Math.min(6, prev.scale * factor));
      const cx = VW / 2; const cy = VH / 2;
      return {
        scale: newScale,
        tx: cx - (cx - prev.tx) * (newScale / prev.scale),
        ty: cy - (cy - prev.ty) * (newScale / prev.scale),
      };
    });
  }

  const { tx, ty, scale } = zoom;
  const groupTransform = `translate(${tx},${ty}) scale(${scale})`;

  return (
    <div style={{ position: "relative", width: "100%", flex: 1, minHeight: 0, background: "#13141a", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 14, left: 16, zIndex: 10, display: "flex", flexDirection: "column", gap: 4, fontFamily: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, letterSpacing: "0.01em", pointerEvents: "none" }}>
          {visibleNodes.length} {activeType} · {visibleEdges.length} edges
        </span>
        {activeType === "Providers" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>Providers:</span>
            <input
              value={providerSourceInput}
              onChange={e => setProviderSourceInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { setProviderSourceFilter(providerSourceInput); setProviderVersionFilter(providerVersionInput); } }}
              placeholder="provider_source"
              style={{ height: 30, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "0 10px", color: "rgba(255,255,255,0.8)", fontSize: 12, outline: "none", width: 160, fontFamily: "inherit" }}
            />
            <input
              value={providerVersionInput}
              onChange={e => setProviderVersionInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { setProviderSourceFilter(providerSourceInput); setProviderVersionFilter(providerVersionInput); } }}
              placeholder="version_constraint"
              style={{ height: 30, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "0 10px", color: "rgba(255,255,255,0.8)", fontSize: 12, outline: "none", width: 160, fontFamily: "inherit" }}
            />
            <button
              type="button"
              onClick={() => { setProviderSourceFilter(providerSourceInput); setProviderVersionFilter(providerVersionInput); }}
              style={{ height: 30, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "0 14px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
            >
              Filter
            </button>
            {(providerSourceFilter || providerVersionFilter) && (
              <button
                type="button"
                onClick={() => { setProviderSourceInput(""); setProviderVersionInput(""); setProviderSourceFilter(""); setProviderVersionFilter(""); }}
                style={{ height: 30, background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "0 14px", color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
              >
                Clear
              </button>
            )}
          </div>
        )}
        {activeType === "Resources" && (
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setWsDropdownOpen(o => !o)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(19,20,26,0.88)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 10px", color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)", marginRight: 2 }}>Workspace:</span>
              {selectedWorkspace ?? "All"}
              <ChevronDown size={12} style={{ opacity: 0.6 }} />
            </button>
            {wsDropdownOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "rgba(38,40,48,0.97)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 0", minWidth: 240, boxShadow: "0 8px 24px rgba(0,0,0,0.5)", zIndex: 50 }}>
              {[{ name: "All", count: null }, ...RESOURCE_WORKSPACES].map(ws => {
                const isSelected = selectedWorkspace === (ws.name === "All" ? null : ws.name);
                return (
                  <button
                    key={ws.name}
                    type="button"
                    onClick={() => { setSelectedWorkspace(ws.name === "All" ? null : ws.name); setWsDropdownOpen(false); }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 16px", background: "none", border: "none", color: isSelected ? "#fff" : "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: isSelected ? 500 : 400, cursor: "pointer", textAlign: "left", fontFamily: "inherit", gap: 8 }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {isSelected && <span style={{ fontSize: 11 }}>✓</span>}
                      {!isSelected && <span style={{ display: "inline-block", width: 15 }} />}
                      {ws.name}
                    </span>
                    {ws.count !== null && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>({ws.count})</span>}
                  </button>
                );
              })}
              </div>
            )}
          </div>
        )}
        </div>{/* end inner row */}
        {activeType === "Resources" && (
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, fontStyle: "italic", pointerEvents: "none", letterSpacing: "0.01em" }}>
            Select a Resource to view dependencies.
          </span>
        )}
      </div>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", cursor: dragging ? "grabbing" : "grab" }}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <radialGradient id="topo-center" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1e2035" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#13141a" stopOpacity="0" />
          </radialGradient>
          <style>{`
            @keyframes topoNodeIn {
              0%   { opacity: 0; transform: scale(0.25); }
              60%  { opacity: 1; transform: scale(1.18); }
              78%  { transform: scale(0.93); }
              90%  { transform: scale(1.05); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </defs>

        {/* Static background — not zoomed */}
        {Array.from({ length: 22 }, (_, row) =>
          Array.from({ length: 38 }, (_, col) => (
            <circle key={`d-${row}-${col}`} cx={col * 32 + 16} cy={row * 30 + 15} r={1} fill="#2a2d3a" />
          ))
        )}
        <ellipse cx={VW / 2} cy={VH / 2} rx={VW * 0.55} ry={VH * 0.5} fill="url(#topo-center)" />

        {/* Drag + deselect backdrop — outside zoom group so it covers full canvas */}
        <rect
          width={VW}
          height={VH}
          fill="transparent"
          onMouseDown={handleMouseDown}
          onClick={e => { if (!dragging) { e.stopPropagation(); setSelectedId(null); setBlastRadiusId(null); } }}
        />

        {/* Zoomable content */}
        <g transform={groupTransform}>
          {/* Edges — hidden entirely in blast radius mode */}
          {!blastRadiusId && visibleEdges.map((edge, i) => {
            const ps = positions.get(edge.source);
            const pt = positions.get(edge.target);
            if (!ps || !pt) return null;
            const activeId = hoveredId ?? selectedId;
            const isLit = !activeId || edge.source === activeId || edge.target === activeId;
            return (
              <path
                key={i}
                d={curvePath(ps.x, ps.y, pt.x, pt.y)}
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={1 / scale}
                strokeDasharray={`${5 / scale} ${4 / scale}`}
                strokeLinecap="round"
                opacity={activeId ? (isLit ? 1 : 0.06) : 1}
                style={{ transition: "opacity 0.2s ease" }}
              />
            );
          })}

          {/* Nodes */}
          {visibleNodes.map((node, i) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            const isSelected = node.id === selectedId;
            const isNeighbor = neighborSet.has(node.id);
            const isHovered = node.id === hoveredId;
            const isHoverNeighbor = hoverNeighborSet.has(node.id);
            const inBlastRadius = blastRadiusId ? blastRadiusSet.has(node.id) : false;
            const isBlastOrigin = node.id === blastRadiusId;
            const isDimmed = blastRadiusId
              ? !inBlastRadius
              : hoveredId
                ? (!isHovered && !isHoverNeighbor)
                : (!!selectedId && !isSelected && !isNeighbor);
            const color = blastRadiusId
              ? (isBlastOrigin ? SELECTED_COLOR : inBlastRadius ? SELECTED_COLOR : (NODE_COLORS[node.type] ?? "#9b8ff5"))
              : isSelected ? SELECTED_COLOR : isNeighbor ? NEIGHBOR_COLOR : (NODE_COLORS[node.type] ?? "#9b8ff5");
            const nameLabel = node.label.length > 20 ? node.label.slice(0, 19) + "…" : node.label;
            const delay = Math.min(i * 28, 600);

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x},${pos.y}) scale(${1 / scale})`}
                style={{ cursor: "pointer", opacity: isDimmed ? 0.08 : 1, transition: "opacity 0.2s ease" }}
                onClick={e => { e.stopPropagation(); setSelectedId(isSelected ? null : node.id); }}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <g
                  key={`${node.id}-${activeType}`}
                  style={{ animation: `topoNodeIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` }}
                >
                  <circle r={NODE_R + 14} fill={color} opacity={(isSelected || (blastRadiusId && inBlastRadius)) ? 0.22 : 0.08} />
                  <circle r={NODE_R} fill={color} opacity={1} />
                  {(isSelected || (blastRadiusId && inBlastRadius)) && <circle r={NODE_R} fill="none" stroke="white" strokeWidth={2} opacity={0.9} />}
                  <foreignObject x={-NODE_R} y={-NODE_R} width={NODE_R * 2} height={NODE_R * 2}>
                    {(() => {
                      const Icon = NODE_ICONS[node.type] ?? DEFAULT_NODE_ICON;
                      return (
                        <div style={{ width: NODE_R * 2, height: NODE_R * 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={NODE_R} color="white" strokeWidth={1.75} />
                        </div>
                      );
                    })()}
                  </foreignObject>
                  <text y={NODE_R + 17} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize={13} fontWeight="500" fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" letterSpacing="-0.01em">{nameLabel}</text>
                  <text y={NODE_R + 31} textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize={11} fontWeight="400" fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" letterSpacing="0">{node.secondary}</text>
                </g>
              </g>
            );
          })}

        </g>
        {/* End zoomable content */}
      </svg>

      {/* Popover — top right, fixed position */}
      {selectedNode && (() => {
        const isWorkspace = selectedNode.type === "workspace";
        const d = selectedNode.data as Record<string, unknown>;

        // Workspace blast radius popover
        if (isWorkspace && activeType === "Workspaces" && blastRadiusId === selectedNode.id) {
          const downstreamCount = blastRadiusSet.size - 1; // exclude origin
          return (
            <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20, width: 300, background: "#161820", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", boxShadow: "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
              {/* Exit button */}
              <button
                onClick={() => setBlastRadiusId(null)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, height: 28, padding: "0 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
              >
                ← exit blast view
              </button>
              {/* Title */}
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 6 }}>{selectedNode.label}</div>
              {/* Subtitle */}
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                {downstreamCount > 0 ? `${downstreamCount} downstream workspace${downstreamCount > 1 ? "s" : ""}` : "no downstream workspaces"}
              </div>
            </div>
          );
        }

        // Workspace-specific layout matching screenshot
        if (isWorkspace && activeType === "Workspaces") {
          const providers = String(d.providers ?? "").split(",").map(p => p.trim()).filter(Boolean);
          return (
            <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20, width: 300, background: "#161820", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "18px 20px 16px", boxShadow: "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
              {/* Close */}
              <button onClick={() => { setSelectedId(null); setBlastRadiusId(null); }} style={{ position: "absolute", top: 12, right: 14, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "2px 4px" }}>✕</button>

              {/* Title */}
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 12, paddingRight: 20 }}>{selectedNode.label}</div>

              {/* Key-value rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                {[["org", d.org], ["project", d.project], ["resources", d.resources]].map(([k, v]) => (
                  <div key={String(k)} style={{ display: "flex", gap: 0 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", width: 80, flexShrink: 0 }}>{String(k)}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "ui-monospace, 'SF Mono', monospace" }}>{String(v ?? "—")}</span>
                  </div>
                ))}
              </div>

              {/* Output Consumers box */}
              <div style={{ background: "rgba(255,255,255,0.04)", borderLeft: "3px solid #4f6ef7", borderRadius: "0 6px 6px 0", padding: "10px 12px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Output Consumers</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>no workspaces access this workspace's outputs</div>
              </div>

              {/* Providers */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>providers</div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {providers.length ? providers.map(p => (
                    <li key={p} style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{p}</li>
                  )) : <li style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>none</li>}
                </ul>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => onViewResources?.(selectedNode.label)}
                  style={{ height: 38, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View resources <span>→</span>
                </button>
                <button
                  onClick={() => setBlastRadiusId(selectedNode.id)}
                  style={{ height: 38, borderRadius: 8, border: "1px solid rgba(234,179,8,0.6)", background: "transparent", color: "#eab308", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View blast radius <span>→</span>
                </button>
              </div>
            </div>
          );
        }

        // Generic popover for all other node types
        const fields = Object.entries(d);
        return (
          <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20, width: 272, background: "#1c1e2b", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", boxShadow: "0 12px 40px rgba(0,0,0,0.65)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.35, wordBreak: "break-word" }}>{selectedNode.label}</div>
                <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: NODE_COLORS[selectedNode.type] ?? "#9b8ff5", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#7b7f99", textTransform: "capitalize" }}>{selectedNode.type.replace(/-/g, " ")}</span>
                  <span style={{ fontSize: 11, color: "#4b4f66", marginLeft: 2 }}>·</span>
                  <span style={{ fontSize: 11, color: "#7b7f99" }}>{selectedNode.secondary}</span>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} style={{ color: "#4b4f66", background: "none", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px", flexShrink: 0 }}>✕</button>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 0 12px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: 320, overflowY: "auto" }}>
              {fields.map(([key, value]) => (
                <div key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, color: "#4b4f66", minWidth: 80, textTransform: "capitalize", lineHeight: 1.5, flexShrink: 0 }}>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", wordBreak: "break-word", lineHeight: 1.5 }}>{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Layout switcher — bottom right */}
      <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(19,20,26,0.88)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", gap: 4 }}>
        {(["force", "stacked", "radial"] as TopoLayout[]).map(layout => {
          const labels: Record<TopoLayout, string> = { force: "Force", stacked: "Stacked", radial: "Radial" };
          const isActive = topoLayout === layout;
          return (
            <button
              key={layout}
              onClick={() => { setTopoLayout(layout); setZoom({ tx: 0, ty: 0, scale: 1 }); }}
              style={{
                height: 26, padding: "0 12px", borderRadius: 5, border: "1px solid",
                borderColor: isActive ? "rgba(255,255,255,0.3)" : "transparent",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                fontSize: 12, fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                fontWeight: isActive ? 600 : 400, cursor: "pointer", transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {labels[layout]}
            </button>
          );
        })}
      </div>

      {/* Zoom controls — bottom right, above layout switcher */}
      <div style={{ position: "absolute", bottom: 62, right: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        <button onClick={() => zoomBy(1.25)} title="Zoom in" style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        <button onClick={() => zoomBy(1 / 1.25)} title="Zoom out" style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 20, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
        <button onClick={() => setZoom({ tx: 0, ty: 0, scale: 1 })} title="Reset zoom" style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontSize: 10, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.02em" }}>FIT</button>
      </div>

      {/* Legend key — bottom left */}
      <TopoLegend activeType={activeType} nodes={nodes} />
    </div>
  );
}

const NODE_TYPE_LABELS: Record<string, string> = {
  workspace: "Workspace",
  module: "Module",
  provider: "Provider",
  "terraform-version": "TF Version",
  "resource-compute": "Compute",
  "resource-identity": "Identity",
  "resource-networking": "Networking",
  "resource-security": "Security",
  "resource-storage": "Storage & Data",
  "policy-set": "Policy Set",
};

function TopoLegend({ activeType: _activeType, nodes }: { activeType: string; nodes: TopoNode[] }) {
  const typeItems = useMemo(() => {
    const seen = new Set<string>();
    const items: { color: string; label: string }[] = [];
    for (const n of nodes) {
      if (!seen.has(n.type)) {
        seen.add(n.type);
        items.push({ color: NODE_COLORS[n.type] ?? "#9b8ff5", label: NODE_TYPE_LABELS[n.type] ?? n.type });
      }
    }
    return items;
  }, [nodes]);

  const allItems = [
    ...typeItems,
    { color: SELECTED_COLOR, label: "selected" },
    { color: NEIGHBOR_COLOR, label: "direct dependent" },
  ];

  // Split into rows of up to 4 items
  const rows: typeof allItems[] = [];
  for (let i = 0; i < allItems.length; i += 4) rows.push(allItems.slice(i, i + 4));

  return (
    <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(19,20,26,0.88)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "nowrap" }}>
          {row.map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", whiteSpace: "nowrap" }}>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Explorer Splash ──────────────────────────────────────────────────────────

const splashItems = [
  { Icon: WorkspaceIcon, label: "Workspaces",   badge: null },
  { Icon: Shield,     label: "Policy sets",        badge: null },
  { Icon: ModuleIcon,       label: "Modules",            badge: null },
  { Icon: Globe,          label: "Providers",          badge: null },
  { Icon: ResourcesIcon,           label: "Resources",          badge: "BETA" },
  { Icon: TerraformIcon,  label: "Terraform versions", badge: null },
] as const;

// Map splash label → navItem label for routing into detail view
const splashToNavLabel: Record<string, string> = {
  "Workspaces":        "Workspaces",
  "Policy sets":       "Policy Sets",
  "Modules":           "Modules",
  "Providers":         "Providers",
  "Resources":         "Resources",
  "Terraform versions":"Terraform Versions",
};

function ExplorerSplashView({ onSelectType, onSelectUseCase }: { onSelectType: (type: string) => void; onSelectUseCase: (type: string, title: string) => void }) {
  const [activeTab, setActiveTab] = useState<"types" | "usecases" | "saved">("types");

  return (
    <div className="flex h-full flex-col overflow-auto bg-white px-8 py-7 font-sans text-[#0c0c0e]" style={{ minWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-1.5 text-[12px] text-[#656a76]">
        <span>ILM_Demo_Space</span>
        <span>/</span>
        <span>Explorer</span>
        <span>/</span>
        <span className="font-medium text-[#3b3d45]">{activeTab === "usecases" ? "Use cases" : activeTab === "saved" ? "Saved views" : "Types"}</span>
      </div>

      {/* Title row */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="m-0 text-[28px] font-bold leading-8 text-[#0c0c0e]">Explorer</h1>
          <p className="mt-2 text-[14px] text-[#656a76]">Explore your data to analyze your Organization&apos;s Terraform usage.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-[5px] bg-[#1060ff] px-4 py-2 text-[13px] font-medium text-white shadow-sm hover:bg-[#0c56e9]"
        >
          New query <ChevronDown size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex items-center gap-0 border-b border-[#dedfe3]">
        {(["types", "usecases", "saved"] as const).map(tab => {
          const labels = { types: "Types", usecases: "Use cases", saved: "Saved views" };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 pb-3 pt-2.5 text-[14px] font-medium transition-colors ${isActive ? "text-[#1060ff]" : "text-[#656a76] hover:text-[#3b3d45]"}`}
            >
              {labels[tab]}
              {tab === "saved" && (
                <span className="ml-1.5 rounded-full bg-[#f1f2f3] px-1.5 py-0.5 text-[11px] font-medium text-[#656a76]">52</span>
              )}
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-[2px] bg-[#1060ff]" />}
            </button>
          );
        })}
      </div>

      {/* Types list */}
      {activeTab === "types" && (
        <div className="mt-6">
          <h2 className="mb-4 text-[16px] font-semibold text-[#0c0c0e]">Types</h2>
          <div className="flex flex-col gap-3">
            {splashItems.map(({ Icon, label, badge }) => (
              <button
                key={label}
                type="button"
                onClick={() => onSelectType(splashToNavLabel[label])}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#dedfe3] bg-white px-5 py-[18px] text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#f8f9fa] hover:shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={1.6} className="text-[#3b3d45]" />
                  <span className="text-[15px] font-medium text-[#0c0c0e]">{label}</span>
                  {badge && (
                    <span className="rounded-full border border-[rgba(59,61,69,0.3)] px-2 py-0.5 text-[11px] font-medium text-[#656a76]">{badge}</span>
                  )}
                </span>
                <ChevronRight size={18} className="text-[#1060ff]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "usecases" && (
        <div className="mt-5">
          <p className="mb-6 text-[14px] text-[#656a76]">
            Get started with a pre-defined view. Want a view not listed?{" "}
            <a href="#feedback" className="inline-flex items-center gap-1 text-[#1060ff] hover:underline">
              Send us feedback <ExternalLink size={12} />
            </a>
          </p>

          {[
            {
              heading: "Workspaces",
              Icon: WorkspaceIcon,
              type: "Workspaces",
              items: [
                "Workspaces without VCS", "Workspace VCS source",
                "Workspaces with failed checks", "Drifted Workspaces",
                "All workspace versions", "Workspaces by run status",
                "Latest updated workspaces", "Oldest applied workspaces",
                "Latest Terraform versions",
              ],
            },
            {
              heading: "Policy Sets",
              Icon: Shield,
              type: "Policy Sets",
              items: [
                "Policy sets with failures", "Policy sets with overrides",
                "Policy sets with runtime errors", "Global policy sets",
                "Recently updated policy sets", "tf-policy sets",
                "Sentinel policy sets", "OPA sets",
              ],
            },
            {
              heading: "Modules",
              Icon: ModuleIcon,
              type: "Modules",
              items: ["Top module versions"],
            },
            {
              heading: "Providers",
              Icon: Globe,
              type: "Providers",
              items: ["Loremipsum"],
            },
            {
              heading: "Resources",
              Icon: ResourcesIcon,
              type: "Resources",
              items: ["Loremipsum"],
            },
            {
              heading: "Terraform versions",
              Icon: TerraformIcon,
              type: "Terraform Versions",
              items: ["Top Terraform versions"],
            },
          ].map(({ heading, Icon, type, items }) => (
            <div key={heading} className="mb-8">
              <h2 className="mb-3 text-[16px] font-semibold text-[#0c0c0e]">{heading}</h2>
              <div className="grid grid-cols-2 gap-3">
                {items.map(label => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onSelectUseCase(type, label)}
                    className="flex w-full items-center justify-between rounded-[8px] border border-[#dedfe3] bg-white px-5 py-[18px] text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#f8f9fa] hover:shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={1.6} className="text-[#3b3d45]" />
                      <span className="text-[15px] font-medium text-[#0c0c0e]">{label}</span>
                    </span>
                    <ChevronRight size={18} className="text-[#1060ff]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="mt-5">
          {/* Toolbar */}
          <div className="mb-3 flex items-center gap-3">
            <label className="flex h-8 w-[220px] items-center gap-2 rounded-[5px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[#656a76]">
              <Search size={14} strokeWidth={1.7} />
              <input placeholder="Search" className="min-w-0 flex-1 bg-transparent text-[13px] text-[#3b3d45] outline-none placeholder:text-[#656a76]" />
            </label>
            <button type="button" className="flex h-8 items-center gap-1.5 rounded-[5px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[13px] text-[#3b3d45] hover:bg-[#f1f2f3]">
              Type <ChevronDown size={13} />
            </button>
          </div>
          <p className="mb-4 flex items-center gap-1.5 text-[13px] text-[#656a76]">
            No filters applied
            <span className="inline-flex size-[16px] items-center justify-center rounded-full border border-[#c2c5cb] text-[10px] text-[#656a76]">i</span>
          </p>

          {/* Table */}
          <div className="overflow-hidden rounded-[8px] border border-[#dedfe3]">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#f8f9fa]">
                <tr>
                  <th className="border-b border-[#dedfe3] px-5 py-3 text-[13px] font-semibold text-[#0c0c0e]">Name</th>
                  <th className="border-b border-[#dedfe3] px-5 py-3 text-[13px] font-semibold text-[#0c0c0e]">Type</th>
                  <th className="border-b border-[#dedfe3] px-5 py-3 text-[13px] font-semibold text-[#0c0c0e]">Owner</th>
                  <th className="border-b border-[#dedfe3] px-5 py-3 text-[13px] font-semibold text-[#0c0c0e]">Last Updated</th>
                  <th className="border-b border-[#dedfe3] px-5 py-3 text-[13px] font-semibold text-[#0c0c0e]">Options</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "name/rum/resource count - workspace has resources", type: "Workspaces",         owner: "lyn_kotuby-e2f5b9c9",  updated: "May 27 2026" },
                  { name: "modules with multiple workspaces",                  type: "Modules",            owner: "ken-cox",               updated: "Apr 29 2026" },
                  { name: "Ange Test 87",                                       type: "Modules",            owner: "angekaplanchambers",    updated: "Oct 16 2025" },
                  { name: "child saved",                                        type: "Workspaces",         owner: "ashtronaut",            updated: "Oct 1 2025"  },
                  { name: "test",                                               type: "Workspaces",         owner: "simonxmhuang",          updated: "Jul 28 2025" },
                  { name: "red",                                                type: "Workspaces",         owner: "simonxmhuang",          updated: "Jul 25 2025" },
                  { name: "test2",                                              type: "Workspaces",         owner: "simonxmhuang",          updated: "Jul 25 2025" },
                  { name: "rum_test",                                           type: "Workspaces",         owner: "simonxmhuang",          updated: "Jul 25 2025" },
                  { name: "random stuff",                                       type: "Workspaces",         owner: "lyn_kotuby-e2f5b9c9",  updated: "Jun 4 2025"  },
                  { name: "sim",                                                type: "Workspaces",         owner: "simonxmhuang",          updated: "Jun 2 2025"  },
                  { name: "testing tf version bug",                             type: "Terraform Versions", owner: "jondavidjohn",          updated: "Nov 14 2024" },
                  { name: "new view",                                           type: "Terraform Versions", owner: "jondavidjohn",          updated: "Nov 14 2024" },
                  { name: "try again",                                          type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "yet another one",                                    type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "new test name",                                      type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "super duper errored workspaces",                     type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "another new name",                                   type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "new name",                                           type: "Workspaces",         owner: "jondavidjohn",          updated: "Nov 12 2024" },
                  { name: "tf test",                                            type: "Terraform Versions", owner: "aditisl",               updated: "Nov 12 2024" },
                  { name: "new tf versions",                                    type: "Terraform Versions", owner: "martinhenry",            updated: "Nov 12 2024" },
                ].map((row, i) => (
                  <tr key={row.name + i} className={`group transition-colors hover:bg-[#f8f9fa] ${i > 0 ? "border-t border-[#dedfe3]" : ""}`}>
                    <td className="px-5 py-3.5">
                      <button type="button" className="text-left text-[13px] font-medium text-[#1060ff] hover:underline">{row.name}</button>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-[#3b3d45]">{row.type}</td>
                    <td className="px-5 py-3.5 text-[13px] text-[#3b3d45]">{row.owner}</td>
                    <td className="px-5 py-3.5 text-[13px] text-[#3b3d45]">{row.updated}</td>
                    <td className="px-5 py-3.5">
                      <button type="button" className="flex size-[28px] items-center justify-center rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-white text-[#3b3d45] hover:bg-[#f1f2f3]">
                        <span className="text-[14px] leading-none tracking-widest">···</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between text-[13px] text-[#656a76]">
            <span>1–20 of 52</span>
            <div className="flex items-center gap-1">
              <button type="button" className="flex size-[28px] items-center justify-center rounded text-[#c2c5cb]"><ChevronLeft size={15} /></button>
              {[1, 2, 3].map(p => (
                <button key={p} type="button" className={`flex size-[28px] items-center justify-center rounded text-[13px] ${p === 1 ? "border-b-2 border-[#1060ff] font-medium text-[#1060ff]" : "text-[#3b3d45] hover:bg-[#f1f2f3]"}`}>{p}</button>
              ))}
              <button type="button" className="flex size-[28px] items-center justify-center rounded text-[#3b3d45]"><ChevronRight size={15} /></button>
            </div>
            <span className="flex items-center gap-2">
              Items per page
              <span className="flex items-center gap-1 rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-2 py-1 text-[13px] text-[#3b3d45]">20 <ChevronDown size={12} /></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Workspaces Explorer ──────────────────────────────────────────────────────

export function WorkspacesExplorerView() {
  const [explorerPage, setExplorerPage] = useState<"splash" | "detail">("detail");
  const [conditionsExpanded, setConditionsExpanded] = useState(false);
  const [conditionCount, setConditionCount] = useState(1);
  const [openFieldIndex, setOpenFieldIndex] = useState<number | null>(null);
  const [conditionFields, setConditionFields] = useState<string[]>(["name"]);
  const [openOperatorIndex, setOpenOperatorIndex] = useState<number | null>(null);
  const [conditionOperators, setConditionOperators] = useState<string[]>(["is"]);
  const [conditionValues, setConditionValues] = useState<string[]>([""]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [itemsMenuOpen, setItemsMenuOpen] = useState(false);
  const [activeType, setActiveType] = useState("Workspaces");
  const [activeView, setActiveView] = useState<"table" | "graph">("table");
  const [graphInitialWorkspace, setGraphInitialWorkspace] = useState<string | null>(null);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState<string | null>(null);
  const isModulesView = activeType === "Modules";
  const isProvidersView = activeType === "Providers";
  const isResourcesView = activeType === "Resources";
  const isTerraformVersionsView = activeType === "Terraform Versions";
  const isPolicySetsView = activeType === "Policy Sets";
  const isRegistryView = isModulesView || isProvidersView;
  const activeTableColumns = isTerraformVersionsView ? terraformVersionTableColumns : isResourcesView ? resourceTableColumns : isRegistryView ? moduleTableColumns : tableColumns;
  const queryColumns = activeTableColumns;
  const typeLabel = isPolicySetsView ? "Policy Sets" : isModulesView ? "Modules" : isProvidersView ? "Providers" : isResourcesView ? "Resources" : isTerraformVersionsView ? "Terraform Versions" : "Workspaces";
  const pageLabel = customTitle ?? typeLabel;
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [columnQuery, setColumnQuery] = useState("");
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(() => tableColumns.map(column => column.id));
  const [draftColumnIds, setDraftColumnIds] = useState<string[]>(() => tableColumns.map(column => column.id));
  const shownColumns = tableColumns.filter(column => visibleColumnIds.includes(column.id));
  const filteredColumns = activeTableColumns.filter(column => column.label.toLowerCase().includes(columnQuery.toLowerCase()));
  const draftConditions = conditionFields.map((fieldId, index) => ({ index, fieldId, operator: conditionOperators[index], value: conditionValues[index]?.trim() ?? "" })).filter(condition => condition.fieldId && condition.operator && condition.value);

  function valueForColumn(row: typeof workspaceRows[number], columnId: string) {
    const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = row.metadata;
    return {
      name: row.name, project: row.project, run: row.run, runStatus: row.runStatus, currentRunApplied,
      repository, noCodeModule: row.noCodeModule, moduleCount, modules, providerCount, providers, terraformVersion,
      drifted: row.drifted, healthChecksSucceeded: row.healthChecksSucceeded, healthChecksPassed: row.healthChecksPassed,
      healthChecksFailed: row.healthChecksFailed, healthChecksErrored: row.healthChecksErrored, resourcesDrifted: row.resourcesDrifted,
      resourcesUndrifted: row.resourcesUndrifted, stateTerraformVersion: row.stateTerraformVersion, currentRumCount: row.currentRumCount,
      resources: row.count, tags: row.tags, created: row.created, updated: row.updated,
    }[columnId];
  }

  function matchesCondition(row: typeof workspaceRows[number], condition: { fieldId: string; operator: string; value: string }) {
    const column = tableColumns.find(item => item.id === condition.fieldId);
    if (!column) return true;
    const actual = valueForColumn(row, condition.fieldId);
    const actualText = String(actual).toLowerCase();
    const expectedText = condition.value.toLowerCase();

    if (column.valueType === "text") {
      if (condition.operator === "is") return actualText.includes(expectedText);
      if (condition.operator === "is not") return !actualText.includes(expectedText);
      if (condition.operator === "contains") return actualText.includes(expectedText);
      if (condition.operator === "does not contain") return !actualText.includes(expectedText);
      if (condition.operator === "is empty") return !actualText;
      if (condition.operator === "is not empty") return Boolean(actualText);
    }

    if (column.valueType === "number") {
      const actualNumber = Number(String(actual).replace(/[^\d.-]/g, ""));
      const expectedNumber = Number(condition.value.replace(/[^\d.-]/g, ""));
      if (condition.operator === "=") return actualText.includes(expectedText) || (!Number.isNaN(expectedNumber) && actualNumber === expectedNumber);
      if (condition.operator === "≠") return !actualText.includes(expectedText) && (Number.isNaN(expectedNumber) || actualNumber !== expectedNumber);
      if (condition.operator === ">") return actualNumber > expectedNumber;
      if (condition.operator === "<") return actualNumber < expectedNumber;
      if (condition.operator === ">=") return actualNumber >= expectedNumber;
      if (condition.operator === "<=") return actualNumber <= expectedNumber;
      if (condition.operator === "is empty") return !actualText;
      if (condition.operator === "is not empty") return Boolean(actualText);
    }

    if (column.valueType === "date") {
      const actualDate = new Date(String(actual)).getTime();
      const expectedDate = new Date(condition.value).getTime();
      if (condition.operator === "before") return actualDate < expectedDate;
      if (condition.operator === "after") return actualDate > expectedDate;
    }

    if (column.valueType === "boolean") {
      const expectedBoolean = ["true", "1", "yes"].includes(expectedText);
      if (condition.operator === "is") return Boolean(actual) === expectedBoolean;
      if (condition.operator === "is empty") return actual === null || actual === undefined;
      if (condition.operator === "is not empty") return actual !== null && actual !== undefined;
    }
    return true;
  }

  const filteredWorkspaceRows = draftConditions.length ? workspaceRows.filter(row => draftConditions.every(condition => matchesCondition(row, condition))) : workspaceRows;
  const totalCount = isPolicySetsView ? policySetRows.length : isModulesView ? moduleRows.length : isProvidersView ? providerRows.length : isResourcesView ? resourceRows.length : isTerraformVersionsView ? terraformVersionRows.length : filteredWorkspaceRows.length;
  const totalPages = Math.max(1, Math.ceil(filteredWorkspaceRows.length / itemsPerPage));
  const pageRows = filteredWorkspaceRows.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => { setPage(1); }, [conditionFields, conditionOperators, conditionValues, itemsPerPage]);

  function openColumnsMenu() {
    setDraftColumnIds(visibleColumnIds);
    setColumnQuery("");
    setColumnsOpen(true);
  }

  function toggleDraftColumn(id: string) {
    setDraftColumnIds(current => current.includes(id) ? current.filter(columnId => columnId !== id) : [...current, id]);
  }

  function navigateToType(type: string) {
    setActiveType(type);
    setCustomTitle(null);
    setActiveView("table");
    setGraphInitialWorkspace(null);
    setConditionCount(1);
    setConditionFields(["name"]);
    setConditionOperators(["is"]);
    setConditionValues([""]);
    setOpenFieldIndex(null);
    setOpenOperatorIndex(null);
    const nextColumns = type === "Terraform Versions" ? terraformVersionTableColumns : type === "Resources" ? resourceTableColumns : type === "Modules" || type === "Providers" ? moduleTableColumns : tableColumns;
    setVisibleColumnIds(nextColumns.map(c => c.id));
    setDraftColumnIds(nextColumns.map(c => c.id));
    setExplorerPage("detail");
  }

  function navigateToTypeWithFilter(type: string, field: string, operator: string, value: string) {
    setActiveType(type);
    setCustomTitle(null);
    setActiveView("table");
    setGraphInitialWorkspace(null);
    setConditionCount(1);
    setConditionFields([field]);
    setConditionOperators([operator]);
    setConditionValues([value]);
    setConditionsExpanded(true);
    setOpenFieldIndex(null);
    setOpenOperatorIndex(null);
    const nextColumns = type === "Terraform Versions" ? terraformVersionTableColumns : type === "Resources" ? resourceTableColumns : type === "Modules" || type === "Providers" ? moduleTableColumns : tableColumns;
    setVisibleColumnIds(nextColumns.map(c => c.id));
    setDraftColumnIds(nextColumns.map(c => c.id));
    setExplorerPage("detail");
  }

  function navigateToUseCase(type: string, title: string) {
    setActiveType(type);
    setCustomTitle(title);
    setActiveView("table");
    setConditionCount(1);
    setConditionFields(["name"]);
    setConditionOperators(["is"]);
    setConditionValues([""]);
    setOpenFieldIndex(null);
    setOpenOperatorIndex(null);
    const nextColumns = type === "Terraform Versions" ? terraformVersionTableColumns : type === "Resources" ? resourceTableColumns : type === "Modules" || type === "Providers" ? moduleTableColumns : tableColumns;
    setVisibleColumnIds(nextColumns.map(c => c.id));
    setDraftColumnIds(nextColumns.map(c => c.id));
    setExplorerPage("detail");
  }

  if (explorerPage === "splash") {
    return (
      <div className="flex h-full min-w-[1200px] bg-white font-sans text-[#0c0c0e]">
        <aside className="w-[220px] shrink-0 border-r border-[#dedfe3] bg-[#fafafa] px-3 pt-3">
          <div className="mb-4 flex items-center justify-between px-1.5 text-[12px] font-medium text-[#3b3d45]">
            <span className="flex items-center gap-2 text-[#1060ff] font-semibold"><ChevronLeft size={15} />Explorer</span>
            <ChevronLeft size={14} />
          </div>
        </aside>
        <ExplorerSplashView onSelectType={navigateToType} onSelectUseCase={navigateToUseCase} />
      </div>
    );
  }

  return (
    <div className="flex h-full min-w-[1200px] bg-white font-sans text-[#0c0c0e]">
      <aside className="w-[220px] shrink-0 border-r border-[#dedfe3] bg-[#fafafa] px-3 pt-3 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between px-1.5 text-[12px] font-medium text-[#3b3d45]">
          <button
            type="button"
            onClick={() => setExplorerPage("splash")}
            className="flex items-center gap-2 hover:text-[#1060ff] transition-colors"
          >
            <ChevronLeft size={15} />Explorer
          </button>
          <ChevronLeft size={14} />
        </div>

        {/* Types section */}
        <div className="mb-1 px-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9b9cb8]">Types</div>
        <nav className="flex flex-col">
          {navItems.map(([Icon, label]) => {
            const isActive = activeType === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (label !== activeType) {
                    setActiveType(label);
                    setCustomTitle(null);
                    setConditionCount(1);
                    setConditionFields(["name"]);
                    setConditionOperators(["is"]);
                    setConditionValues([""]);
                                    setOpenFieldIndex(null);
                    setOpenOperatorIndex(null);
                    const nextColumns = label === "Terraform Versions" ? terraformVersionTableColumns : label === "Resources" ? resourceTableColumns : label === "Modules" || label === "Providers" ? moduleTableColumns : tableColumns;
                    setVisibleColumnIds(nextColumns.map(c => c.id));
                    setDraftColumnIds(nextColumns.map(c => c.id));
                  }
                }}
                className={`flex items-center gap-2 rounded-[5px] px-3 py-[5px] pl-5 text-left text-[13px] transition-colors ${isActive ? "bg-[#edf4ff] font-medium text-[#1060ff]" : "text-[#3b3d45] hover:bg-[#f1f2f3]"}`}
              >
                <Icon size={13} strokeWidth={1.7} className="shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={`flex-1 flex flex-col px-6 pt-6 ${activeView === "graph" ? "overflow-hidden pb-0" : "overflow-auto pb-12"}`} style={{ minWidth: "1200px" }}>
        <div className={activeView === "graph" ? "flex flex-col flex-1 min-h-0" : ""}>

          {/* 1. Breadcrumb */}
          <div className="mb-3 flex items-center gap-2 text-[11px] text-[#656a76]">
            <span>My-organization</span><span>/</span><span>Explorer</span><span>/</span><span>{customTitle ? "Use cases" : "Types"}</span><span>/</span><span className="font-medium text-[#3b3d45]">{pageLabel}</span>
          </div>

          {/* 2. Page title */}
          <h1 className="m-0 mb-1 text-[20px] font-semibold leading-6 text-[#3b3d45]">{pageLabel}</h1>

          {/* 3. Subtitle */}
          <div className="mb-5">
            {isPolicySetsView ? <div className="flex items-center gap-2 text-[11px] text-[#656a76]"><Shield size={13} />Policy Sets</div> : isModulesView ? <div className="flex items-center gap-2 text-[11px] text-[#656a76]"><ModuleIcon size={14} />Modules</div> : isProvidersView ? <div className="flex items-center gap-2 text-[11px] text-[#656a76]"><Globe size={14} />Providers</div> : isResourcesView ? <div className="flex items-center gap-2 text-[11px] text-[#656a76]"><ResourcesIcon size={14} />Resources</div> : isTerraformVersionsView ? <div className="flex items-center gap-2 text-[11px] text-[#656a76]"><TerraformIcon size={14} />Terraform Versions</div> : <div className="flex items-center gap-3 text-[11px] text-[#656a76]"><WorkspaceIcon size={13} />Workspaces <span>ID: <span className="text-[#3b3d45]">None</span></span></div>}
          </div>

          {/* 4. Query container */}
          <section className="mb-4 rounded-[6px] border border-[rgba(101,106,118,0.35)] bg-white shadow-[0_1px_1px_rgba(101,106,118,0.05)]">
            <div className="flex items-center gap-3 px-3 py-3">
              <button
                type="button"
                onClick={() => setConditionsExpanded(expanded => !expanded)}
                aria-expanded={conditionsExpanded}
                aria-label={conditionsExpanded ? "Collapse conditions" : "Expand conditions"}
                className={`flex size-[18px] items-center justify-center rounded-[3px] border ${conditionsExpanded ? "border-[#0f62fe] text-[#3b3d45] ring-2 ring-[#a6c8ff]" : "border-[rgba(59,61,69,0.4)] text-[#3b3d45]"}`}
              >
                {conditionsExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              <span><strong className="block text-[12px] font-semibold leading-4">{conditionsExpanded ? "Modify conditions" : "Show conditions"}</strong><span className="text-[11px] text-[#656a76]">No conditions applied&nbsp; ⓘ</span></span>
            </div>
            {conditionsExpanded && (
              <div className="border-t border-[rgba(101,106,118,0.12)] px-5 pb-4 pt-3">
                <div className="space-y-3">
                  {Array.from({ length: conditionCount }, (_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-[78px] text-[12px] font-medium text-[#3b3d45]">{index === 0 ? "WHERE" : "AND"}</span>
                      {(() => {
                        const selectedField = queryColumns.find(column => column.id === conditionFields[index]) ?? queryColumns[0];
                        const SelectedFieldIcon = selectedField.valueType === "date" ? CalendarDays : selectedField.valueType === "number" ? Hash : selectedField.valueType === "boolean" ? ToggleRight : Type;
                        return (
                          <div className="relative min-w-[190px]">
                            <button type="button" onClick={() => setOpenFieldIndex(current => current === index ? null : index)} aria-expanded={openFieldIndex === index} aria-haspopup="listbox" className="flex h-8 w-full items-center justify-between gap-2 rounded-l-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45]">
                              <span className="flex items-center gap-2"><SelectedFieldIcon size={14} />{selectedField.label}</span><ChevronDown size={14} />
                            </button>
                            {openFieldIndex === index && (
                              <div role="listbox" className="absolute left-0 top-[34px] z-40 max-h-64 w-64 overflow-y-auto rounded-[4px] border border-[rgba(101,106,118,0.2)] bg-white py-1 shadow-[0_2px_6px_rgba(101,106,118,0.2)]">
                                {queryColumns.map(column => {
                                  const FieldIcon = column.valueType === "date" ? CalendarDays : column.valueType === "number" ? Hash : column.valueType === "boolean" ? ToggleRight : Type;
                                  return <button key={column.id} type="button" role="option" aria-selected={selectedField.id === column.id} onClick={() => { setConditionFields(fields => fields.map((field, fieldIndex) => fieldIndex === index ? column.id : field)); setConditionOperators(operators => operators.map((operator, operatorIndex) => operatorIndex === index ? operatorsByValueType[column.valueType][0] : operator)); setOpenFieldIndex(null); }} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] hover:bg-[#f1f2f3] ${selectedField.id === column.id ? "bg-[#edf4ff] text-[#0f62fe]" : "text-[#3b3d45]"}`}><FieldIcon size={14} />{column.label}</button>;
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                      {(() => {
                        const selectedField = queryColumns.find(column => column.id === conditionFields[index]) ?? queryColumns[0];
                        const selectedOperator = conditionOperators[index] ?? operatorsByValueType[selectedField.valueType][0];
                        const availableOperators = operatorsByValueType[selectedField.valueType];
                        return (
                          <div className="relative -ml-2 min-w-[150px]">
                            <button type="button" onClick={() => setOpenOperatorIndex(current => current === index ? null : index)} aria-expanded={openOperatorIndex === index} aria-haspopup="listbox" className="flex h-8 w-full items-center justify-between gap-2 border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45]">{selectedOperator}<ChevronDown size={14} /></button>
                            {openOperatorIndex === index && (
                              <div role="listbox" className="absolute left-0 top-[34px] z-40 max-h-64 w-64 overflow-y-auto rounded-[4px] border border-[rgba(101,106,118,0.2)] bg-white py-1 shadow-[0_2px_6px_rgba(101,106,118,0.2)]">
                                {availableOperators.map(operator => <button key={operator} type="button" role="option" aria-selected={selectedOperator === operator} onClick={() => { setConditionOperators(operators => operators.map((current, operatorIndex) => operatorIndex === index ? operator : current)); setOpenOperatorIndex(null); }} className={`flex w-full px-3 py-2 text-left text-[12px] hover:bg-[#f1f2f3] ${selectedOperator === operator ? "bg-[#edf4ff] text-[#0f62fe]" : "text-[#3b3d45]"}`}>{operator}</button>)}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                      {(() => {
                        const selectedField = queryColumns.find(column => column.id === conditionFields[index]) ?? queryColumns[0];
                        return selectedField.valueType === "date" ? (
                          <input type="datetime-local" step="1" value={conditionValues[index] ?? ""} onChange={event => setConditionValues(values => values.map((value, valueIndex) => valueIndex === index ? event.target.value : value))} aria-label="Condition date and time" className="-ml-2 h-8 min-w-0 flex-1 rounded-r-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45] outline-none focus:border-[#0f62fe]" />
                        ) : (
                          <input type="text" value={conditionValues[index] ?? ""} onChange={event => setConditionValues(values => values.map((value, valueIndex) => valueIndex === index ? event.target.value : value))} aria-label="Condition value" placeholder="Enter a value" className="-ml-2 h-8 min-w-0 flex-1 rounded-r-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45] outline-none placeholder:text-[#656a76] focus:border-[#0f62fe]" />
                        );
                      })()}
                      <button type="button" onClick={() => {
                        if (conditionCount === 1) {
                          setConditionFields(["name"]);
                          setConditionOperators(["is"]);
                          setConditionValues([""]);
                        } else {
                          setConditionCount(count => count - 1);
                          setConditionFields(fields => fields.filter((_, fieldIndex) => fieldIndex !== index));
                          setConditionOperators(operators => operators.filter((_, operatorIndex) => operatorIndex !== index));
                          setConditionValues(values => values.filter((_, valueIndex) => valueIndex !== index));
                        }
                        setOpenFieldIndex(null);
                        setOpenOperatorIndex(null);
                      }} aria-label={conditionCount === 1 ? "Clear condition" : "Remove condition"} className="flex size-8 items-center justify-center rounded-[4px] border border-[rgba(59,61,69,0.25)] bg-[#fafafa] text-[#3b3d45] hover:bg-[#f1f2f3]"><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => { setConditionCount(count => count + 1); setConditionFields(fields => [...fields, "name"]); setConditionOperators(operators => [...operators, "is"]); setConditionValues(values => [...values, ""]); }} className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-[#0f62fe] hover:underline"><Plus size={15} />Add condition</button>
                <div className="mt-6 flex items-center gap-3">
                  <button type="button" onClick={() => setConditionsExpanded(false)} className="h-8 rounded-[4px] bg-[#0f62fe] px-4 text-[12px] font-medium text-white hover:bg-[#0043ce]">Run Query</button>
                  <button type="button" onClick={() => { setConditionCount(1); setConditionFields(["name"]); setConditionOperators(["is"]); setConditionValues([""]); setOpenFieldIndex(null); setOpenOperatorIndex(null); setConditionsExpanded(false); }} className="h-8 rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-4 text-[12px] font-medium text-[#3b3d45] hover:bg-[#f1f2f3]">Cancel</button>
                </div>
              </div>
            )}
          </section>

          {/* 5. Row count + Table/Graph toggle + View columns + Actions */}
          <div className="mb-4 flex items-center justify-between">
            {/* Row count */}
            <span className="text-[13px] text-[#3b3d45]">
              Results: <strong>{totalCount}</strong> <strong>{typeLabel}</strong> found.
            </span>

            {/* Table/Graph toggle + View columns + Actions */}
            <div className="flex items-center gap-2">
              {/* Table / Graph toggle */}
              <div className="flex items-center" role="group" aria-label="Workspace view">
                <button
                  type="button"
                  onClick={() => setActiveView("table")}
                  aria-pressed={activeView === "table"}
                  className={`-mr-px flex h-7 items-center gap-1.5 rounded-l-[5px] border px-[13px] text-[13px] font-medium ${activeView === "table" ? "z-10 border-[rgba(59,61,69,0.4)] bg-[#dedfe3] text-[#3b3d45]" : "border-[rgba(59,61,69,0.4)] bg-[#fafafa] text-[#3b3d45]"}`}
                >
                  <Table2 size={12} strokeWidth={1.8} />Table
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("graph")}
                  aria-pressed={activeView === "graph"}
                  className={`flex h-7 items-center gap-1.5 rounded-r-[5px] border px-[13px] text-[13px] font-medium ${activeView === "graph" ? "z-10 border-[rgba(59,61,69,0.4)] bg-[#dedfe3] text-[#3b3d45]" : "border-[rgba(59,61,69,0.4)] bg-[#fafafa] text-[#3b3d45] shadow-[0_1px_0.5px_rgba(101,106,118,0.05),0_2px_1px_rgba(101,106,118,0.05)]"}`}
                >
                  <ChartNoAxesCombined size={12} strokeWidth={1.8} />Graph
                </button>
              </div>

            {/* Actions (3-dot) */}
            <div className="flex">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActionsOpen(open => !open)}
                  aria-expanded={actionsOpen}
                  aria-haspopup="menu"
                  className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] text-[#3b3d45] hover:bg-[#f1f2f3]"
                >
                  <MoreHorizontal size={15} strokeWidth={1.8} />
                </button>
                {actionsOpen && (
                  <div role="menu" className="absolute right-0 top-[32px] z-30 w-72 overflow-hidden rounded-[4px] border border-[rgba(101,106,118,0.2)] bg-white shadow-[0_2px_6px_rgba(101,106,118,0.2)]">
                    <div className="p-3 pb-1">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b9cb8]">Actions</p>
                      <button role="menuitem" className="flex w-full items-center gap-2 rounded-[3px] px-1 py-1.5 text-left text-[12px] text-[#3b3d45] hover:bg-[#f1f2f3]"><Save size={14} strokeWidth={1.7} />Save</button>
                      <button role="menuitem" className="flex w-full items-center gap-2 rounded-[3px] px-1 py-1.5 text-left text-[12px] text-[#3b3d45] hover:bg-[#f1f2f3]"><Download size={14} strokeWidth={1.7} />Download</button>
                    </div>
                    {activeView === "table" && (
                      <>
                        <hr className="border-[#e5e6ea]" />
                        <div className="p-3">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b9cb8]">View columns</p>
                          <label className="mb-2 flex h-8 items-center gap-2 rounded-[4px] border border-[rgba(59,61,69,0.4)] px-2 text-[#656a76]">
                            <Search size={14} strokeWidth={1.7} />
                            <input value={columnQuery} onChange={event => setColumnQuery(event.target.value)} placeholder="Search columns" className="min-w-0 flex-1 bg-transparent text-[12px] text-[#3b3d45] outline-none placeholder:text-[#656a76]" />
                          </label>
                          <div className="max-h-48 overflow-y-auto py-1">
                            {filteredColumns.map(column => (
                              <label key={column.id} className="flex cursor-pointer items-center gap-2 px-1 py-1.5 text-[12px] text-[#3b3d45] hover:bg-[#f1f2f3]">
                                <input type="checkbox" checked={draftColumnIds.includes(column.id)} onChange={() => toggleDraftColumn(column.id)} className="size-3.5 accent-[#1060ff]" />
                                {column.label}
                              </label>
                            ))}
                            {filteredColumns.length === 0 && <p className="px-1 py-3 text-[12px] text-[#656a76]">No columns found.</p>}
                          </div>
                          <button type="button" onClick={() => { setVisibleColumnIds(draftColumnIds); setActionsOpen(false); }} className="mt-3 flex h-8 w-full items-center justify-center rounded-[4px] bg-[#1060ff] px-3 text-[12px] font-medium text-white hover:bg-[#0c56e9]">Apply</button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            </div>{/* end Table/Graph + View columns + Actions */}
          </div>

          {activeView === "graph" ? (
            <div className="flex-1 min-h-0 pb-6" style={{ display: "flex", flexDirection: "column" }}>
              <TopologyGraph
                activeType={activeType}
                initialWorkspace={graphInitialWorkspace}
                onViewResources={(workspaceName) => {
                  setGraphInitialWorkspace(workspaceName);
                  setActiveType("Resources");
                  setActiveView("graph");
                }}
              />
            </div>
          ) : isPolicySetsView ? <PolicySetsTable conditions={draftConditions} onNavigate={navigateToType} /> : isTerraformVersionsView ? <TerraformVersionsTable visibleColumnIds={visibleColumnIds} conditions={draftConditions} onNavigate={navigateToType} /> : isResourcesView ? <ResourcesTable visibleColumnIds={visibleColumnIds} conditions={draftConditions} onNavigate={navigateToType} /> : isRegistryView ? <RegistryTable rows={isModulesView ? moduleRows : providerRows} visibleColumnIds={visibleColumnIds} conditions={draftConditions} onNavigate={navigateToType} /> :<>
          <div className="overflow-x-auto overflow-y-hidden rounded-[6px] border border-[#dedfe3]">
            <table className="min-w-[5000px] table-fixed border-collapse text-left">
              <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
                <tr>
                  {shownColumns.map(column => (
                    <th key={column.id} className={`h-12 border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`}>
                      <span className="flex items-center gap-2 whitespace-nowrap">{column.label}<SortControl /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] text-[#52525b]">
                {pageRows.map(({ id, name, project, count, run, runStatus, status, noCodeModule, drifted, healthChecksSucceeded, healthChecksPassed, healthChecksFailed, healthChecksErrored, resourcesDrifted, resourcesUndrifted, stateTerraformVersion, currentRumCount, tags, created, updated, metadata }) => {
                  const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = metadata;
                  return (
                    <tr key={id} className="h-12 border-t border-[#dedfe3] bg-white">
                      {shownColumns.map(column => {
                        const contentByColumn = {
                          name: <a href="#workspace" className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{name}</a>,
                          project: <a href="#project" className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{project}</a>,
                          run: <a href="#run" className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{run}</a>,
                          runStatus: <span className={`inline-flex rounded-[4px] border px-1.5 py-0.5 text-[11px] font-medium ${runStatus === "errored" ? "border-[#da1e28] bg-transparent text-[#a2191f]" : "border-[#24a148] bg-transparent text-[#198038]"}`}>{runStatus}</span>,
                          currentRunApplied,
                          repository, noCodeModule,
                          moduleCount: <a href="#" onClick={e => { e.preventDefault(); navigateToTypeWithFilter("Modules", "workspaces", "contains", name); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{moduleCount}</a>,
                          modules,
                          providerCount: <a href="#" onClick={e => { e.preventDefault(); navigateToTypeWithFilter("Providers", "workspaces", "contains", name); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{providerCount}</a>,
                          providers, terraformVersion: <a href="#" onClick={e => { e.preventDefault(); navigateToTypeWithFilter("Terraform Versions", "workspaces", "contains", name); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{terraformVersion}</a>,
                          drifted: <span className="rounded-[4px] bg-[#dedfe3] px-1.5 py-0.5 font-medium text-[#52525b]">{drifted ? "true" : "false"}</span>,
                          healthChecksSucceeded, healthChecksPassed, healthChecksFailed, healthChecksErrored,
                          resourcesDrifted, resourcesUndrifted, stateTerraformVersion: <a href="#" onClick={e => { e.preventDefault(); navigateToTypeWithFilter("Terraform Versions", "workspaces", "contains", name); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{stateTerraformVersion}</a>, currentRumCount,
                          resources: <a href="#" onClick={e => { e.preventDefault(); navigateToTypeWithFilter("Resources", "workspace", "contains", name); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{count}</a>,
                          tags, created, updated,
                        };
                        return <td key={column.id} className={`border-r border-[#dedfe3] px-3 whitespace-nowrap text-[12px] last:border-r-0 ${column.width}`}>{contentByColumn[column.id]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] text-[#3b3d45]">
            <span>{filteredWorkspaceRows.length === 0 ? 0 : (page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, filteredWorkspaceRows.length)} of {filteredWorkspaceRows.length}</span>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous page" onClick={() => setPage(current => Math.max(1, current - 1))} disabled={page === 1} className="p-1 text-[#656a76] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={15} /></button>
              {pageNumbers.map(value => <button key={value} type="button" onClick={() => setPage(value)} className={`min-w-5 border-b-2 px-1 py-1 text-[11px] font-normal text-[#3b3d45] ${page === value ? "border-[#1060ff]" : "border-transparent"}`}>{value}</button>)}
              <button type="button" aria-label="Next page" onClick={() => setPage(current => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="p-1 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={15} /></button>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setItemsMenuOpen(open => !open)}
                aria-expanded={itemsMenuOpen}
                aria-haspopup="menu"
                className="flex h-7 items-center gap-1.5 rounded-[4px] border border-[rgba(59,61,69,0.4)] bg-[#fafafa] px-3 text-[12px] font-medium text-[#3b3d45]"
              >
                Items per page: {itemsPerPage} <ChevronDown size={14} />
              </button>
              {itemsMenuOpen && (
                <div role="menu" className="absolute bottom-[32px] right-0 z-30 w-36 overflow-hidden rounded-[4px] border border-[rgba(101,106,118,0.2)] bg-white py-1 shadow-[0_2px_6px_rgba(101,106,118,0.2)]">
                  {[20, 50, 100].map(option => <button key={option} type="button" role="menuitem" onClick={() => { setItemsPerPage(option); setPage(1); setItemsMenuOpen(false); }} className={`flex w-full items-center px-3 py-2 text-left text-[12px] hover:bg-[#f1f2f3] ${itemsPerPage === option ? "font-medium text-[#1060ff]" : "text-[#3b3d45]"}`}>{option}</button>)}
                </div>
              )}
            </div>
          </div>
          </>}
        </div>
      </main>
    </div>
  );
}
