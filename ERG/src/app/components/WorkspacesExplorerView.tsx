import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import DotBackgroundGraph from "../../imports/DotBackgroundGraph";
import {
  CalendarDays, ChartNoAxesCombined, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown, Clipboard, Compass,
  Cpu, Database, Download, ExternalLink, Globe, HardDrive, Hash, Layers, ListOrdered, Lock, MoreHorizontal, Plus, RefreshCw, Save, Search, Server, Shield, Table2, Tag, ToggleRight, Trash2, Type, User, X
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const WORKSPACE_SVG_PATH = "M0 2.75C0 1.23122 1.23122 0 2.75 0H17.25C18.7688 0 20 1.23122 20 2.75V17.25C20 18.7688 18.7688 20 17.25 20H2.75C1.23122 20 0 18.7688 0 17.25V2.75ZM7 18.5H17.25C17.9404 18.5 18.5 17.9404 18.5 17.25V7.5H7V18.5ZM5.5 7.5V18.5H2.75C2.05964 18.5 1.5 17.9404 1.5 17.25V7.5H5.5ZM18.5 6V2.75C18.5 2.05964 17.9404 1.5 17.25 1.5H2.75C2.05964 1.5 1.5 2.05964 1.5 2.75V6H18.5Z";

function WorkspaceIcon({ size = 16, className = "", color }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className} style={color ? { color } : undefined}>
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

// Per-view title filter for workspace pre-defined views.
// Each function receives a workspaceRow and returns true if it belongs to that view.
type WsRow = typeof workspaceRows[number];
const VIEW_TITLE_FILTER: Record<string, (row: WsRow, index?: number) => boolean> = {
  "View All Workspaces":    () => true,
  "Workspaces without VCS": row => !row.metadata[1] || row.metadata[1] === "",
  "Workspace VCS source":   row => !!(row.metadata[1] && row.metadata[1] !== ""),
  "Workspaces with failed checks": row => row.healthChecksFailed > 0 || row.healthChecksErrored > 0,
  "Drifted Workspaces":     row => row.drifted === true,
  "All workspace versions": () => true,
  "Workspaces by run status": () => true,
  "Latest updated workspaces": (_row, index) => (index ?? 0) < 20,
  "Oldest applied workspaces": row => row.status === "applied",
  "Latest Terraform versions": () => true,
};

// Returns the filtered workspace rows for a given view title (or all rows if no filter defined).
function getWorkspaceRowsForTitle(title: string | null): WsRow[] {
  if (!title || !VIEW_TITLE_FILTER[title]) return workspaceRows;
  const fn = VIEW_TITLE_FILTER[title];
  return workspaceRows.filter((row, i) => fn(row, i));
}

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

// Module Type details schema — intentionally limited to these five fields.
const moduleTableColumns = [
  { id: "name", label: "Name", width: "w-[210px]", valueType: "text" },
  { id: "version", label: "Version", width: "w-[130px]", valueType: "text" },
  { id: "source", label: "Source", width: "w-[380px]", valueType: "text" },
  { id: "workspaceCount", label: "Workspace count", width: "w-[165px]", valueType: "number" },
  { id: "workspaces", label: "Workspaces", width: "w-[315px]", valueType: "text" },
] as const;

const providerTableColumns = [
  { id: "name", label: "Name", valueType: "text" },
  { id: "version", label: "Version", valueType: "text" },
  { id: "source", label: "Source", valueType: "text" },
  { id: "workspaceCount", label: "Workspace count", valueType: "number" },
  { id: "workspaces", label: "Workspaces", valueType: "text" },
] as const;

// Resource Type details schema — intentionally limited to these twelve fields.
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

// Terraform Version Type details schema — intentionally limited to these three fields.
const terraformVersionTableColumns = [
  { id: "version", label: "Version", width: "w-[190px]", valueType: "text" },
  { id: "workspaceCount", label: "Workspace count", width: "w-[175px]", valueType: "number" },
  { id: "workspaces", label: "Workspaces", width: "w-[635px]", valueType: "text" },
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
  return <ChevronsUpDown size={14} className="text-[#656a76] shrink-0" />;
}

function TablePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 20,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, 2, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-6 flex items-center justify-between text-[13px] font-normal text-[#3b3d45] select-none">
      {/* Left: Range text */}
      <div>
        {startItem}–{endItem} of {totalItems}
      </div>

      {/* Center: Page controls */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-[#656a76] hover:text-[#17171a] disabled:cursor-not-allowed disabled:text-[#c2c5cb] transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-4">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="text-[#3b3d45]">
                  ...
                </span>
              );
            }
            const pageNum = Number(p);
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange?.(pageNum)}
                className={`relative px-1 pb-0.5 text-[13px] font-normal transition-colors ${
                  isActive
                    ? "text-[#0f62fe] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0f62fe]"
                    : "text-[#3b3d45] hover:text-[#0f62fe]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="text-[#3b3d45] hover:text-[#17171a] disabled:cursor-not-allowed disabled:text-[#c2c5cb] transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Right: Items per page */}
      <div className="relative flex items-center gap-2.5">
        <span>Items per page</span>
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          className="flex h-8 items-center gap-2 rounded-[6px] border border-[#8c909c] bg-white px-3 py-1 font-normal text-[#17171a] hover:bg-[#f8f9fa] shadow-sm transition-colors"
        >
          <span>{pageSize}</span>
          <ChevronsUpDown size={14} className="text-[#656a76]" />
        </button>
        {menuOpen && (
          <div className="absolute bottom-[38px] right-0 z-50 min-w-[80px] overflow-hidden rounded-[6px] border border-[#b8bcc5] bg-white py-1 shadow-md">
            {pageSizeOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onPageSizeChange?.(opt);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] hover:bg-[#f1f2f3] ${
                  opt === pageSize ? "font-medium text-[#0f62fe]" : "text-[#3b3d45]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
      <div className="overflow-x-auto rounded-[6px] border border-[#dedfe3]">
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
            <tr>
              {columns.map((column, ci) => (
                <th key={column.id} className="h-11 border-r border-[#dedfe3] px-3 last:border-r-0" style={ci === 0 ? { position: "sticky", left: 0, zIndex: 2, background: "#f1f2f3" } : undefined}><span className="flex items-center justify-between gap-2 text-[12px] font-semibold text-[#17171a]">{column.label}<SortControl /></span></th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[12px] text-[#52525b]">
            {filteredRows.map(([name, version, source, workspaceCount, workspaces]) => (
              <tr key={`${name}-${version}`} className="border-t border-[#dedfe3] bg-white">
                {columns.map((column, ci) => {
                  const content = {
                    name,
                    version,
                    source: <a href="#module-source" className="text-[#0f62fe] hover:underline">{source} <ExternalLink className="inline" size={13} /></a>,
                    workspaceCount: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{workspaceCount}</a>,
                    workspaces,
                  };
                  return <td key={column.id} className="border-r border-[#dedfe3] px-3 py-4 break-words last:border-r-0" style={ci === 0 ? { position: "sticky", left: 0, background: "#ffffff" } : undefined}>{content[column.id]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={1}
        totalPages={1}
        totalItems={filteredRows.length}
        pageSize={20}
      />
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
      <div className="overflow-x-auto rounded-[6px] border border-[#dedfe3]">
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]"><tr>{columns.map((column, ci) => <th key={column.id} className="h-11 border-r border-[#dedfe3] px-3 last:border-r-0" style={ci === 0 ? { position: "sticky", left: 0, zIndex: 2, background: "#f1f2f3" } : undefined}><span className="flex items-center justify-between gap-2 text-[12px] font-semibold text-[#17171a]">{column.label}<SortControl /></span></th>)}</tr></thead>
          <tbody className="text-[11px] text-[#52525b]">{filteredRows.map(([version, workspaceCount, workspaces]) => <tr key={version} className="h-11 border-t border-[#dedfe3] bg-white">{columns.map((column, ci) => { const content = { version, workspaceCount: <a href="#" onClick={e => { e.preventDefault(); onNavigate("Workspaces"); }} className="whitespace-nowrap text-[#1060ff] underline underline-offset-2">{workspaceCount}</a>, workspaces }; return <td key={column.id} className="border-r border-[#dedfe3] px-3 last:border-r-0" style={ci === 0 ? { position: "sticky", left: 0, background: "#ffffff" } : undefined}>{content[column.id]}</td>; })}</tr>)}</tbody>
        </table>
      </div>
      <TablePagination
        currentPage={1}
        totalPages={1}
        totalItems={filteredRows.length}
        pageSize={20}
      />
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

type ResourceRow = typeof resourceRows[number];

// Mock attribute data for the Attributes section (keyed by resource id)
const MOCK_ATTRIBUTES: Record<string, { key: string; value: string }[]> = {};
resourceRows.forEach(row => {
  MOCK_ATTRIBUTES[row.id] = [
    { key: "account_id", value: "#lorem-account-id" },
    { key: "ami_version", value: "1.0.2.3" },
    { key: "arn", value: `arn:aws:cloudfront::486183785707:distribution/E3IR73QQZ1DXX9` },
    { key: "IP_address", value: "10.36.56.888" },
    { key: "instance_type", value: "t3.medium" },
    { key: "lambda_function_association", value: "-" },
    { key: "max_ttl", value: "86400" },
    { key: "min_ttl", value: "0" },
    { key: "origin_request_policy_id", value: "-" },
    { key: "realtime_log_config_arn", value: "-" },
    { key: "region", value: "US West (Oregon) us-west-02" },
    { key: "response_headers_policy_id", value: "-" },
    { key: "smooth_streaming", value: "false" },
    { key: "tags", value: "value01, value02, value03" },
    { key: "target_origin_id", value: "S3-Website" },
    { key: "trusted_key_groups", value: "-" },
    { key: "trusted_signers", value: "-" },
    { key: "viewer_protocol_policy", value: "redirect-to-https" },
  ];
});

function ResourceDetailView({ row, themeMode }: { row: ResourceRow; themeMode: "light" | "dark" }) {
  const [attrSearch, setAttrSearch] = React.useState("");
  const allAttrs = MOCK_ATTRIBUTES[row.id] ?? [];
  const filteredAttrs = attrSearch
    ? allAttrs.filter(a => a.key.toLowerCase().includes(attrSearch.toLowerCase()) || a.value.toLowerCase().includes(attrSearch.toLowerCase()))
    : allAttrs;

  const border = themeMode === "light" ? "1px solid rgba(101,106,118,0.2)" : "1px solid rgba(255,255,255,0.1)";
  const surfaceFaint = themeMode === "light" ? "#fafafa" : "#1a1c24";
  const surfaceStrong = themeMode === "light" ? "#f1f2f3" : "#21232e";
  const surfacePrimary = themeMode === "light" ? "#ffffff" : "#161820";
  const fgStrong = themeMode === "light" ? "#0c0c0e" : "#ffffff";
  const fgPrimary = themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.85)";
  const fgFaint = themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.45)";
  const fgAction = "#1060ff";
  const badgeBg = themeMode === "light" ? "#dedfe3" : "rgba(255,255,255,0.12)";
  const cellBorder = "rgba(101,106,118,0.2)";

  const MetaItem = ({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 0 0", minWidth: 0 }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: fgPrimary, lineHeight: "20px" }}>{label}</p>
      {isLink
        ? <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 14, color: fgAction, textDecoration: "underline", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</a>
        : <p style={{ fontSize: 14, color: fgStrong, lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</p>
      }
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>
      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Metadata card ── */}
        <div style={{ background: surfaceFaint, border, borderRadius: 6, padding: 16, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Row 1: Name · Type · Provider · Workspace */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <MetaItem label="Name" value={row.address} />
            <MetaItem label="Type" value={row.type} />
            <MetaItem label="Provider" value={row.provider} isLink />
            <MetaItem label="Workspace" value={row.workspace} isLink />
          </div>
          <div style={{ height: 1, background: "rgba(101,106,118,0.2)" }} />
          {/* Row 2: Address · Unique ID · Project · Module */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <MetaItem label="Address" value={row.address} />
            <MetaItem label="Unique ID" value={`wsr-1df1sd65f1d6sg54P`} />
            <MetaItem label="Project" value={row.project} isLink />
            <MetaItem label="Module" value={row.moduleName} isLink />
          </div>
          <div style={{ height: 1, background: "rgba(101,106,118,0.2)" }} />
          {/* Row 3: Terraform version · Billable RUM · Mode */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <MetaItem label="Terraform version" value={row.terraformVersion} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 0 0", minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: fgPrimary, lineHeight: "20px" }}>Billable RUM</p>
              <span style={{ display: "inline-flex", alignItems: "center", background: badgeBg, borderRadius: 5, padding: "4px 8px", fontSize: 13, fontWeight: 500, color: fgPrimary, alignSelf: "flex-start" }}>true</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 0 0", minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: fgPrimary, lineHeight: "20px" }}>Mode</p>
              <span style={{ display: "inline-flex", alignItems: "center", background: badgeBg, borderRadius: 5, padding: "4px 8px", fontSize: 13, fontWeight: 500, color: fgPrimary, alignSelf: "flex-start" }}>Managed</span>
            </div>
            <div style={{ flex: "1 0 0", minWidth: 0 }} />
          </div>
        </div>

        {/* ── Source section ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: fgStrong, letterSpacing: "-0.5px" }}>Source</span>
            <span style={{ background: badgeBg, borderRadius: 12, padding: "4px 12px", fontSize: 13, fontWeight: 500, color: fgPrimary }}>1</span>
          </div>
          <p style={{ fontSize: 14, color: fgPrimary, marginTop: -8 }}>Run stack associated with this Resource.</p>
          {/* Source table */}
          <div style={{ borderRadius: 6, overflow: "hidden", border: `1px solid ${cellBorder}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr style={{ background: surfaceStrong }}>
                  {["source id", "source type", "source updated at"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 14, fontWeight: 600, color: fgStrong, borderBottom: `1px solid ${cellBorder}`, borderRight: `1px solid ${cellBorder}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: surfacePrimary }}>
                  <td style={{ padding: "16px", fontSize: 14, borderRight: `1px solid ${cellBorder}` }}>
                    <a href="#" onClick={e => e.preventDefault()} style={{ color: fgAction, textDecoration: "underline" }}>{row.sourceId}</a>
                  </td>
                  <td style={{ padding: "16px", fontSize: 13, fontFamily: "Menlo, monospace", color: fgPrimary, borderRight: `1px solid ${cellBorder}` }}>{row.sourceType}</td>
                  <td style={{ padding: "16px", fontSize: 14, color: fgPrimary }}>{row.sourceUpdatedAt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Attributes section ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: fgStrong, letterSpacing: "-0.5px" }}>Attributes</span>
            <span style={{ background: badgeBg, borderRadius: 12, padding: "4px 12px", fontSize: 13, fontWeight: 500, color: fgPrimary }}>{allAttrs.length}</span>
          </div>
          <p style={{ fontSize: 14, color: fgPrimary, marginTop: -8 }}>All attributes associated with this Resource.</p>
          {/* Search */}
          <div style={{ position: "relative", width: 330 }}>
            <input
              type="text"
              placeholder="Search by attribute key or value"
              value={attrSearch}
              onChange={e => setAttrSearch(e.target.value)}
              style={{ width: "100%", height: 36, padding: "0 8px 0 32px", borderRadius: 5, border: `1px solid ${themeMode === "light" ? "#8c909c" : "rgba(255,255,255,0.2)"}`, background: surfacePrimary, color: fgPrimary, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
            <svg style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke={fgFaint} strokeWidth="1.5" />
              <line x1="10" y1="10" x2="14" y2="14" stroke={fgFaint} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {/* Key/Value table */}
          <div style={{ borderRadius: 6, overflow: "hidden", border: `1px solid ${cellBorder}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr style={{ background: surfaceStrong }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 14, fontWeight: 600, color: fgStrong, borderBottom: `1px solid ${cellBorder}`, borderRight: `1px solid ${cellBorder}` }}>Key</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 14, fontWeight: 600, color: fgStrong, borderBottom: `1px solid ${cellBorder}` }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttrs.map((attr, idx) => (
                  <tr key={attr.key} style={{ background: surfacePrimary, borderTop: idx === 0 ? undefined : `1px solid ${cellBorder}` }}>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: fgPrimary, borderRight: `1px solid ${cellBorder}`, borderTop: idx === 0 ? undefined : `1px solid ${cellBorder}` }}>{attr.key}</td>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: fgPrimary, borderTop: idx === 0 ? undefined : `1px solid ${cellBorder}` }}>{attr.value}</td>
                  </tr>
                ))}
                {filteredAttrs.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: "16px", fontSize: 13, color: fgFaint, textAlign: "center" }}>No attributes match "{attrSearch}"</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function ResourcesTable({ visibleColumnIds, conditions, onNavigate, onSelectResource, workspaceFilter, sourceRows: sourceRowsProp }: { visibleColumnIds: string[]; conditions: ConditionFilter[]; onNavigate: (type: string) => void; onSelectResource?: (id: string) => void; workspaceFilter?: string | null; sourceRows?: typeof resourceRows }) {
  const columns = resourceTableColumns.filter(column => visibleColumnIds.includes(column.id));
  const allRows = sourceRowsProp ?? resourceRows;
  const baseRows = workspaceFilter ? allRows.filter(r => r.workspace === workspaceFilter) : allRows;
  const filteredRows = conditions.length
    ? baseRows.filter(row =>
        conditions.every(c => {
          const col = resourceTableColumns.find(col => col.id === c.fieldId);
          const val = (row as Record<string, unknown>)[c.fieldId] ?? "";
          return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
        })
      )
    : baseRows;
  return (
    <>
      <div className="overflow-x-auto rounded-[6px] border border-[#dedfe3]">
        <table className="min-w-[2300px] table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]"><tr>{columns.map((column, ci) => <th key={column.id} className={`h-11 border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`} style={ci === 0 ? { position: "sticky", left: 0, zIndex: 2, background: "#f1f2f3" } : undefined}><span className="flex items-center justify-between gap-2 text-[12px] font-semibold text-[#17171a]">{column.label}<SortControl /></span></th>)}</tr></thead>
          <tbody className="text-[11px] text-[#52525b]">
            {filteredRows.map(row => (
              <tr
                key={row.id}
                className="group h-12 border-t border-[#dedfe3] bg-white hover:bg-[#f5f7ff]"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectResource?.(row.id)}
              >
                {columns.map((column, ci) => {
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
                  return <td key={column.id} className={`border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}${ci === 0 ? " bg-white group-hover:bg-[#f5f7ff]" : ""}`} style={ci === 0 ? { position: "sticky", left: 0 } : undefined}>{content[column.id as keyof typeof content]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={1}
        totalPages={172}
        totalItems={3427}
        pageSize={20}
      />
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

// Per-view title filter for Policy Sets pre-defined views.
const PS_TITLE_FILTER: Record<string, (row: PolicySetRow) => boolean> = {
  "Policy sets with failures":       row => row.failCount > 0,
  "Policy sets with overrides":      row => row.enforcementLevel === "Soft Mandatory" && row.failCount > 0,
  "Policy sets with runtime errors": row => row.errorCount > 0,
  "Global policy sets":              row => row.sourceType === "Global",
  "Recently updated policy sets":    () => true,
  "tf-policy sets":                  row => row.framework === "tf-policy",
  "Sentinel policy sets":            row => row.framework === "Sentinel",
  "OPA sets":                        row => row.framework === "OPA",
};

function getPolicySetRowsForTitle(title: string | null): PolicySetRow[] {
  if (!title || !PS_TITLE_FILTER[title]) return policySetRows;
  return policySetRows.filter(row => PS_TITLE_FILTER[title](row));
}

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

function PolicySetsTable({ conditions, onNavigate, rows: rowsOverride }: { conditions: ConditionFilter[]; onNavigate: (type: string) => void; rows?: PolicySetRow[] }) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setExpandedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const baseRows = rowsOverride ?? policySetRows;
  const filteredRows = conditions.length
    ? baseRows.filter(row =>
        conditions.every(c => {
          const col = policySetColumns.find(col => col.id === c.fieldId);
          const val = (row as Record<string, unknown>)[c.fieldId] ?? "";
          return matchValue(val, col ? "text" : "text", c.operator, c.value);
        })
      )
    : baseRows;

  return (
    <>
      <div className="overflow-x-auto rounded-[6px] border border-[#dedfe3]">
        <table className="min-w-[2100px] table-fixed border-collapse text-left">
          <thead className="bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
            <tr>
              <th className="h-11 w-10 border-r border-[#dedfe3] px-3" style={{ position: "sticky", left: 0, zIndex: 2, background: "#f1f2f3" }} />
              {policySetColumns.map((col, ci) => (
                <th key={col.id} className={`h-11 border-r border-[#dedfe3] px-3 last:border-r-0 ${col.width}`} style={ci === 0 ? { position: "sticky", left: 40, zIndex: 2, background: "#f1f2f3" } : undefined}>
                  <span className="flex items-center justify-between gap-2 whitespace-nowrap text-[12px] font-semibold text-[#17171a]">{col.label}<SortControl /></span>
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
                    <td className="border-r border-[#dedfe3] px-3 text-center" style={{ position: "sticky", left: 0, background: "#ffffff" }}>
                      <button
                        type="button"
                        onClick={() => toggle(row.id)}
                        className="inline-flex items-center justify-center rounded text-[#656a76] hover:text-[#3b3d45]"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </td>
                    <td className="border-r border-[#dedfe3] px-3 w-[200px]" style={{ position: "sticky", left: 40, background: "#ffffff" }}>
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
                      <td colSpan={policySetColumns.length + 1} className="px-6 py-4">
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
      <TablePagination
        currentPage={1}
        totalPages={1}
        totalItems={policySetRows.length}
        pageSize={20}
      />
    </>
  );
}

// ── Topology Graph ──────────────────────────────────────────────────────────

const NODE_COLORS: Record<string, string> = {
  workspace: "#9b8ff5",
  module: "#2dd4bf",
  provider: "#34d399",
  "terraform-version": "#38bdf8",
  "resource": "#f472b6",
  "policy-set": "#fbbf24",
  "ws-group-project": "#6366f1",
  "ws-group-status": "#f59e0b",
};

const SELECTED_COLOR = "#f97316";
const NEIGHBOR_COLOR = "#22c55e";
const VW = 1200;
const VH = 660;
const NODE_SIZE = 28;
const NODE_RADIUS = 14;
const NODE_R = NODE_SIZE / 2;

type TopoNode = {
  id: string;
  label: string;
  type: string;
  secondary: string;
  data: Record<string, string | number | boolean>;
};
type TopoEdge = { source: string; target: string };

function buildTopoGraph(activeType: string, conditions: ConditionFilter[] = [], graphTitle: string | null = null): { nodes: TopoNode[]; edges: TopoEdge[] } {
  const nodes: TopoNode[] = [];
  const edgeSet = new Set<string>();
  const edges: TopoEdge[] = [];

  function addEdge(a: string, b: string) {
    if (a === b) return;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (!edgeSet.has(key)) { edgeSet.add(key); edges.push({ source: a, target: b }); }
  }

  if (activeType === "Workspaces") {
    const titleRows = getWorkspaceRowsForTitle(graphTitle);
    const filteredWs = conditions.length
      ? titleRows.filter(row => {
          const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = row.metadata;
          return conditions.every(c => {
            const col = tableColumns.find(col => col.id === c.fieldId);
            const fieldMap: Record<string, unknown> = {
              name: row.name, project: row.project, run: row.run, runStatus: row.runStatus,
              currentRunApplied, repository, noCodeModule: row.noCodeModule,
              moduleCount, modules, providerCount, providers, terraformVersion,
              drifted: String(row.drifted), healthChecksSucceeded: row.healthChecksSucceeded,
              healthChecksPassed: row.healthChecksPassed, healthChecksFailed: row.healthChecksFailed,
              healthChecksErrored: row.healthChecksErrored, resourcesDrifted: row.resourcesDrifted,
              resourcesUndrifted: row.resourcesUndrifted, stateTerraformVersion: row.stateTerraformVersion,
              currentRumCount: row.currentRumCount, resources: row.count, tags: row.tags,
              created: row.created, updated: row.updated,
            };
            return matchValue(fieldMap[c.fieldId] ?? "", col?.valueType ?? "text", c.operator, c.value);
          });
        })
      : titleRows;
    const subset = filteredWs;
    for (const ws of subset) {
      const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = ws.metadata;
      const wsProviders = ["registry.terraform.io/hashicorp/aws", "registry.terraform.io/hashicorp/google", "registry.terraform.io/hashicorp/azurerm", "registry.terraform.io/hashicorp/kubernetes"][ws.count % 4];
      nodes.push({ id: `ws-${ws.id}`, label: ws.name, type: "workspace", secondary: `${ws.count} res`, data: {
        org: "hashicorp-demo",
        project: ws.project,
        run: ws.run,
        runStatus: ws.runStatus,
        currentRunApplied,
        repository,
        noCodeModule: ws.noCodeModule,
        moduleCount,
        modules,
        providerCount,
        providers: wsProviders,
        terraformVersion,
        drifted: ws.drifted,
        healthChecksSucceeded: ws.healthChecksSucceeded,
        healthChecksPassed: ws.healthChecksPassed,
        healthChecksFailed: ws.healthChecksFailed,
        healthChecksErrored: ws.healthChecksErrored,
        resourcesDrifted: ws.resourcesDrifted,
        resourcesUndrifted: ws.resourcesUndrifted,
        stateTerraformVersion: ws.stateTerraformVersion,
        currentRumCount: ws.currentRumCount,
        resources: ws.count,
        tags: ws.tags,
        created: ws.created,
        updated: ws.updated,
      } });
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
    const filteredMods = conditions.length
      ? moduleRows.filter(([name, version, source, workspaceCount, workspaces]) =>
          conditions.every(c => {
            const col = moduleTableColumns.find(col => col.id === c.fieldId);
            const val = ({ name, version, source, workspaceCount, workspaces } as Record<string, string>)[c.fieldId] ?? "";
            return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
          })
        )
      : moduleRows;
    // Add module nodes and connect each to its individual workspace nodes.
    // Only add a module node if it has at least one valid workspace to connect to.
    const wsNodeIds = new Map<string, string>(); // workspace name → node id
    for (const [name, version, , , wsList] of filteredMods) {
      const wsNames = wsList.split(",").map((w: string) => w.trim().replace(/…$/, "").trim()).filter(Boolean);
      if (wsNames.length === 0) continue; // skip isolated module nodes
      const nodeId = `mod-${name}-${version}`;
      const shortName = name.split("/").slice(-2).join("/");
      nodes.push({ id: nodeId, label: shortName, type: "module", secondary: `v${version}`, data: { name, version, workspaces: wsList } });
      for (const wsName of wsNames) {
        if (!wsNodeIds.has(wsName)) {
          const wsId = `ws-mod-${wsName}`;
          wsNodeIds.set(wsName, wsId);
          nodes.push({ id: wsId, label: wsName, type: "workspace", secondary: "workspace", data: { name: wsName } });
        }
        addEdge(nodeId, wsNodeIds.get(wsName)!);
      }
    }
  }

  else if (activeType === "Providers") {
    const filteredProvs = conditions.length
      ? providerRows.filter(([name, version, source, workspaceCount, workspaces]) =>
          conditions.every(c => {
            const col = moduleTableColumns.find(col => col.id === c.fieldId);
            const val = ({ name, version, source, workspaceCount, workspaces } as Record<string, string>)[c.fieldId] ?? "";
            return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
          })
        )
      : providerRows;
    // Add provider nodes and connect each to its individual workspace nodes.
    // Only add a provider node if it has at least one valid workspace to connect to.
    const wsNodeIds = new Map<string, string>(); // workspace name → node id
    for (const [name, version, , wsCount, workspaceList] of filteredProvs) {
      const wsNames = workspaceList.split(",").map((w: string) => w.trim()).filter(Boolean);
      if (wsNames.length === 0) continue; // skip isolated provider nodes
      const nodeId = `prov-${name.replace("/", "_")}-${version}`;
      const baseName = name.split("/").pop()!;
      nodes.push({ id: nodeId, label: `${baseName} ${version}`, type: "provider", secondary: `${wsCount} ws`, data: { name, version, workspace: workspaceList } });
      for (const wsName of wsNames) {
        if (!wsNodeIds.has(wsName)) {
          const wsId = `ws-prov-${wsName}`;
          wsNodeIds.set(wsName, wsId);
          nodes.push({ id: wsId, label: wsName, type: "workspace", secondary: "workspace", data: { name: wsName } });
        }
        addEdge(nodeId, wsNodeIds.get(wsName)!);
      }
    }
  }

  else if (activeType === "Terraform Versions") {
    const filteredTFV = conditions.length
      ? terraformVersionRows.filter(([version, workspaceCount, workspaces]) =>
          conditions.every(c => {
            const col = terraformVersionTableColumns.find(col => col.id === c.fieldId);
            const val = ({ version, workspaceCount, workspaces } as Record<string, string>)[c.fieldId] ?? "";
            return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
          })
        )
      : terraformVersionRows;
    for (const [version, wsCount, wsList] of filteredTFV) {
      const versionNodeId = `tfver-${version}`;
      nodes.push({ id: versionNodeId, label: version, type: "terraform-version", secondary: `${wsCount} ws`, data: { version, workspaces: wsList } });
    }
    // Connect versions in the same major.minor series (e.g., 1.9.x peers)
    const byMinor = new Map<string, string[]>();
    for (const [version] of filteredTFV) {
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
    const filteredRes = conditions.length
      ? resourceRows.filter(row =>
          conditions.every(c => {
            const col = resourceTableColumns.find(col => col.id === c.fieldId);
            const val = (row as Record<string, unknown>)[c.fieldId] ?? "";
            return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
          })
        )
      : resourceRows;
    const SUBTYPES = ["compute", "identity", "networking", "security", "storage"] as const;
    const bySubtype = new Map<string, string[]>();
    for (let i = 0; i < filteredRes.length; i++) {
      const row = filteredRes[i];
      const subType = SUBTYPES[i % 5]; // used only for edge-grouping
      const typeKey = `resource-${subType}`;
      const nodeId = `res-${row.id}`;
      nodes.push({ id: nodeId, label: row.address, type: "resource", secondary: row.type, data: {
        type: row.type,
        name: row.name,
        address: row.address,
        workspace: row.workspace,
        project: row.project,
        moduleName: row.moduleName,
        provider: row.provider,
        terraformVersion: row.terraformVersion,
        billableRum: row.billableRum,
        sourceType: row.sourceType,
        sourceId: row.sourceId,
        sourceUpdatedAt: row.sourceUpdatedAt,
      } });
      if (!bySubtype.has(typeKey)) bySubtype.set(typeKey, []);
      bySubtype.get(typeKey)!.push(nodeId);
    }
    // Chain resources within each sub-type
    for (const [, ids] of bySubtype) {
      for (let i = 0; i < ids.length - 1; i++) addEdge(ids[i], ids[i + 1]);
    }
    // Connect subtype leaders to each other in a chain
    const leaders = [...bySubtype.entries()].map(([, ids]) => ids[0]);
    for (let i = 0; i < leaders.length - 1; i++) addEdge(leaders[i], leaders[i + 1]);
  }

  else if (activeType === "Policy Sets") {
    const filteredPS = getPolicySetRowsForTitle(graphTitle);
    for (const row of filteredPS) {
      nodes.push({ id: `ps-${row.id}`, label: row.name, type: "policy-set", secondary: `${row.policyCount} policies`, data: {
        mode: row.enforcementLevel.toLowerCase().includes("hard") ? "enforced" : "advisory",
        framework: row.framework,
        scope: row.scope,
        sourceType: row.sourceType,
        passCount: row.passCount,
        failCount: row.failCount,
        errorCount: row.errorCount,
      } });
    }
    // Connect Hard Mandatory in a ring, others to first Hard Mandatory
    const enforced = filteredPS.filter(r => r.enforcementLevel.toLowerCase().includes("hard")).map(r => `ps-${r.id}`);
    const advisory = filteredPS.filter(r => !r.enforcementLevel.toLowerCase().includes("hard")).map(r => `ps-${r.id}`);
    for (let i = 0; i < enforced.length; i++) addEdge(enforced[i], enforced[(i + 1) % enforced.length]);
    if (enforced.length) for (const aId of advisory) addEdge(aId, enforced[0]);
    else for (let i = 0; i < advisory.length - 1; i++) addEdge(advisory[i], advisory[i + 1]);
  }

  // Make ~30% of nodes isolated for certain types: remove all edges that touch them.
  // Skip this for Providers and Modules — every node must stay connected to its workspaces.
  if (activeType === "Providers" || activeType === "Modules") {
    return { nodes, edges };
  }
  const isolatedIds = new Set(
    nodes.filter((_, i) => i % 3 === 2).map(n => n.id)
  );
  const connectedEdges = edges.filter(
    e => !isolatedIds.has(e.source) && !isolatedIds.has(e.target)
  );

  return { nodes, edges: connectedEdges };
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

function runGridLayout(nodes: TopoNode[]): Map<string, { x: number; y: number }> {
  const pos = new Map<string, { x: number; y: number }>();
  const n = nodes.length;
  if (n === 0) return pos;
  const PADDING = NODE_R + 50;
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const colSpacing = (VW - PADDING * 2) / Math.max(cols - 1, 1);
  const rowSpacing = (VH - PADDING * 2) / Math.max(rows - 1, 1);
  nodes.forEach((node, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = cols === 1 ? VW / 2 : PADDING + col * colSpacing;
    const y = rows === 1 ? VH / 2 : PADDING + row * rowSpacing;
    pos.set(node.id, { x, y });
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
  "resource": ResourcesIcon,
};

// Fallback for unknown types
const DEFAULT_NODE_ICON: LucideIcon = Server;

type TopoLayout = "force" | "stacked" | "radial" | "grid";
type WsGroupMode = "none" | "project" | "status";

// Returns key-value pairs for a node's popover, using the column labels for the active type.
function getNodeFields(node: TopoNode, activeType: string): { label: string; value: string }[] {
  const d = (node.data ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (v === undefined || v === null || v === "") ? "—" : String(v);

  if (activeType === "Workspaces") {
    return [
      { label: "Name",                    value: str(node.label) },
      { label: "Project name",            value: str(d.project) },
      { label: "Current run ID",          value: str(d.run) },
      { label: "Run status",              value: str(d.runStatus) },
      { label: "Current run applied",     value: str(d.currentRunApplied) },
      { label: "VCS repo",                value: str(d.repository) },
      { label: "No-code module",          value: str(d.noCodeModule) },
      { label: "Module count",            value: str(d.moduleCount) },
      { label: "Modules",                 value: str(d.modules) },
      { label: "Provider count",          value: str(d.providerCount) },
      { label: "Providers",               value: str(d.providers) },
      { label: "Terraform version",       value: str(d.terraformVersion) },
      { label: "Drifted",                 value: str(d.drifted) },
      { label: "Health checks succeeded", value: str(d.healthChecksSucceeded) },
      { label: "Health checks passed",    value: str(d.healthChecksPassed) },
      { label: "Health checks failed",    value: str(d.healthChecksFailed) },
      { label: "Health checks errored",   value: str(d.healthChecksErrored) },
      { label: "Resources drifted",       value: str(d.resourcesDrifted) },
      { label: "Resources undrifted",     value: str(d.resourcesUndrifted) },
      { label: "State TF version",        value: str(d.stateTerraformVersion) },
      { label: "Current RUM count",       value: str(d.currentRumCount) },
      { label: "Resource count",          value: str(d.resources) },
      { label: "Tags",                    value: str(d.tags) },
      { label: "Created",                 value: str(d.created) },
      { label: "Updated",                 value: str(d.updated) },
    ];
  }
  if (activeType === "Modules") {
    return [
      { label: "Name",            value: str(node.label) },
      { label: "Version",         value: str(node.secondary) },
      { label: "Workspaces",      value: str(d.workspaces) },
    ];
  }
  if (activeType === "Providers") {
    return [
      { label: "Name",            value: str(d.name ?? node.label) },
      { label: "Version",         value: str(d.version) },
      { label: "Workspace",       value: str(d.workspace) },
    ];
  }
  if (activeType === "Terraform Versions") {
    return [
      { label: "Version",         value: str(d.version ?? node.label) },
      { label: "Workspace count", value: str(node.secondary?.replace(" ws", "")) },
      { label: "Workspaces",      value: str(d.workspaces) },
    ];
  }
  if (activeType === "Resources") {
    return [
      { label: "Type",              value: str(d.type) },
      { label: "Name",              value: str(d.name) },
      { label: "Address",           value: str(node.label) },
      { label: "Workspace",         value: str(d.workspace) },
      { label: "Project",           value: str(d.project) },
      { label: "Module name",       value: str(d.moduleName) },
      { label: "Provider",          value: str(d.provider) },
      { label: "Terraform version", value: str(d.terraformVersion) },
      { label: "Billable RUM",      value: str(d.billableRum) },
      { label: "Source type",       value: str(d.sourceType) },
      { label: "Source ID",         value: str(d.sourceId) },
      { label: "Source updated at", value: str(d.sourceUpdatedAt) },
    ];
  }
  if (activeType === "Policy Sets") {
    return [
      { label: "Name",       value: str(node.label) },
      { label: "Policies",   value: str(node.secondary) },
      { label: "Mode",       value: str(d.mode) },
      { label: "Scope",      value: str(d.scope) },
      { label: "Workspaces", value: str(d.workspaces) },
    ];
  }
  // Generic fallback
  return Object.entries(d).slice(0, 6).map(([k, v]) => ({ label: k, value: str(v) }));
}

type OverlayInfo =
  | { kind: "resources"; workspaceName: string; rows: { id: string; address: string; type: string; name: string; workspace: string; project: string; moduleName: string; provider: string; terraformVersion: string; billableRum: boolean; sourceType: string; sourceId: string; sourceUpdatedAt: string }[] }
  | { kind: "modules"; workspaceName: string; rows: ReadonlyArray<readonly [string, string, string, string, string]> }
  | { kind: "providers"; workspaceName: string; rows: ReadonlyArray<readonly [string, string, string, string, string]> };
function TopologyGraph({ activeType, graphTitle, initialWorkspace, conditions = [], onViewResources, onOverlayWorkspaceChange, wsGroupMode = "none", setWsGroupMode, themeMode = "dark", setThemeMode, tableViewOpen = false, onTableViewToggle }: { activeType: string; graphTitle?: string | null; initialWorkspace?: string | null; conditions?: ConditionFilter[]; onViewResources?: (workspaceName: string) => void; onOverlayWorkspaceChange?: (info: OverlayInfo | null) => void; wsGroupMode?: WsGroupMode; setWsGroupMode?: React.Dispatch<React.SetStateAction<WsGroupMode>>; themeMode?: "light" | "dark"; setThemeMode?: React.Dispatch<React.SetStateAction<"light" | "dark">>; tableViewOpen?: boolean; onTableViewToggle?: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [blastRadiusId, setBlastRadiusId] = useState<string | null>(null);
  const [viewResourcesWsName, setViewResourcesWsName] = useState<string | null>(null);
  const [viewResourcesCount, setViewResourcesCount] = useState<number>(0);
  const [viewModulesWsName, setViewModulesWsName] = useState<string | null>(null);
  const [viewModulesCount, setViewModulesCount] = useState<number>(0);
  const [viewProvidersWsName, setViewProvidersWsName] = useState<string | null>(null);
  const [viewProvidersCount, setViewProvidersCount] = useState<number>(0);
  const [wsPopoverView, setWsPopoverView] = useState<"main" | "modules">("main");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [topoLayout, setTopoLayout] = useState<TopoLayout>((activeType === "Providers" || activeType === "Modules" || activeType === "Workspaces") ? "force" : "radial");
  const [showEdges, setShowEdges] = useState<boolean>(true);
  const [zoom, setZoom] = useState({ tx: 0, ty: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Reset zoom and layout whenever activeType changes
  useEffect(() => {
    setZoom({ tx: 0, ty: 0, scale: 1 });
    setTopoLayout((activeType === "Providers" || activeType === "Modules" || activeType === "Workspaces") ? "force" : "radial");
    setShowEdges(true);
  }, [activeType, refreshKey]);
  const dragRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(initialWorkspace ?? null);
  useEffect(() => { if (initialWorkspace !== undefined) setSelectedWorkspace(initialWorkspace ?? null); }, [initialWorkspace]);
  const [providerSourceInput, setProviderSourceInput] = useState("");
  const [providerVersionInput, setProviderVersionInput] = useState("");
  const [providerSourceFilter, setProviderSourceFilter] = useState("");
  const [providerVersionFilter, setProviderVersionFilter] = useState("");

  const { nodes: rawNodes, edges: rawEdges } = useMemo(() => buildTopoGraph(activeType, conditions, graphTitle ?? null), [activeType, conditions, graphTitle]);

  // Workspace grouping: inject hub nodes and rewire edges when wsGroupMode is active
  const { nodes, edges } = useMemo(() => {
    if (activeType !== "Workspaces" || wsGroupMode === "none") return { nodes: rawNodes, edges: rawEdges };
    const groupKey = (n: TopoNode): string =>
      wsGroupMode === "project" ? String(n.data?.project ?? "unknown") : String(n.data?.status ?? n.data?.runStatus ?? "unknown");
    const hubType = wsGroupMode === "project" ? "ws-group-project" : "ws-group-status";
    // Count members per group
    const groupCounts = new Map<string, number>();
    for (const n of rawNodes) { const k = groupKey(n); groupCounts.set(k, (groupCounts.get(k) ?? 0) + 1); }
    // Build hub nodes
    const hubNodes: TopoNode[] = [];
    const hubIds = new Map<string, string>();
    for (const [key, count] of groupCounts) {
      const hubId = `hub-${wsGroupMode}-${key}`;
      hubIds.set(key, hubId);
      hubNodes.push({ id: hubId, label: key, type: hubType, secondary: `${count} workspace${count !== 1 ? "s" : ""}`, data: { group: key, count } });
    }
    // Spoke edges: each workspace → its hub only
    const spokeEdges: TopoEdge[] = rawNodes
      .filter(n => n.type === "workspace")
      .map(n => ({ source: hubIds.get(groupKey(n))!, target: n.id }))
      .filter(e => e.source);
    return { nodes: [...hubNodes, ...rawNodes], edges: spokeEdges };
  }, [rawNodes, rawEdges, activeType, wsGroupMode]);

  // Resource overlay: when a workspace's "View resources" is clicked, build a mini-graph
  // of all resourceRows belonging to that workspace, plus the workspace node itself.
  const resourceOverlay = useMemo(() => {
    if (!viewResourcesWsName) return null;
    // Use the count stored on the node (matches "Resource count" in the popover).
    // Generate that many synthetic resource rows so the list matches exactly.
    const count = viewResourcesCount;
    const SUBTYPES = ["compute", "identity", "networking", "security", "storage"] as const;
    const baseRows = resourceRows.filter(r => r.workspace === viewResourcesWsName);
    // Build a list of `count` rows: real rows first, then synthetic repeats with unique ids.
    const syntheticRows = Array.from({ length: count }, (_, i) => {
      const base = baseRows.length > 0 ? baseRows[i % baseRows.length] : resourceRows[i % resourceRows.length];
      return { ...base, id: `syn-${i}`, workspace: viewResourcesWsName, address: i < baseRows.length ? base.address : `${base.type}.res_${i}` };
    });
    const overlayNodes: TopoNode[] = [];
    const overlayEdgeSet = new Set<string>();
    const overlayEdges: TopoEdge[] = [];
    function addOEdge(a: string, b: string) {
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (!overlayEdgeSet.has(key)) { overlayEdgeSet.add(key); overlayEdges.push({ source: a, target: b }); }
    }
    const bySubtype = new Map<string, string[]>();
    const wsNodeId = `ws-res-ov-${viewResourcesWsName}`;
    overlayNodes.push({ id: wsNodeId, label: viewResourcesWsName, type: "workspace", secondary: `${count} res`, data: { name: viewResourcesWsName } });
    syntheticRows.forEach((row, i) => {
      const subType = SUBTYPES[i % 5];
      const nodeId = `res-ov-${row.id}`;
      overlayNodes.push({ id: nodeId, label: row.address, type: "resource", secondary: row.type, data: {
        type: row.type, name: row.name, address: row.address, workspace: row.workspace,
        project: row.project, moduleName: row.moduleName, provider: row.provider,
        terraformVersion: row.terraformVersion, billableRum: row.billableRum,
        sourceType: row.sourceType, sourceId: row.sourceId, sourceUpdatedAt: row.sourceUpdatedAt,
      } });
      if (!bySubtype.has(`resource-${subType}`)) bySubtype.set(`resource-${subType}`, []);
      bySubtype.get(`resource-${subType}`)!.push(nodeId);
      addOEdge(nodeId, wsNodeId);
    });
    for (const [, ids] of bySubtype) {
      for (let i = 0; i < ids.length - 1; i++) addOEdge(ids[i], ids[i + 1]);
    }
    return { nodes: overlayNodes, edges: overlayEdges };
  }, [viewResourcesWsName, viewResourcesCount]);

  // Module overlay: generate exactly viewModulesCount synthetic module nodes connected to the workspace,
  // using real moduleRows as templates (same pattern as resourceOverlay).
  const moduleOverlay = useMemo(() => {
    if (!viewModulesWsName) return null;
    const count = viewModulesCount;
    const overlayNodes: TopoNode[] = [];
    const overlayEdges: TopoEdge[] = [];
    const edgeSet = new Set<string>();
    function addMEdge(a: string, b: string) {
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (!edgeSet.has(key)) { edgeSet.add(key); overlayEdges.push({ source: a, target: b }); }
    }
    const wsNodeId = `ws-mod-ov-${viewModulesWsName}`;
    overlayNodes.push({ id: wsNodeId, label: viewModulesWsName, type: "workspace", secondary: `${count} mod`, data: { name: viewModulesWsName } });
    // Build count synthetic module nodes cycling through real moduleRows as templates
    Array.from({ length: count }, (_, i) => {
      const base = moduleRows[i % moduleRows.length];
      const nodeId = `mod-ov-${i}`;
      const label = i < moduleRows.length ? base[0] : `${base[0].split("/")[0]}/module-${i}/${base[0].split("/")[2] ?? "null"}`;
      overlayNodes.push({ id: nodeId, label, type: "module", secondary: `v${base[1]}`, data: {
        name: label, version: base[1], source: base[2], workspaceCount: base[3], workspaces: viewModulesWsName,
      }});
      addMEdge(wsNodeId, nodeId);
    });
    return { nodes: overlayNodes, edges: overlayEdges };
  }, [viewModulesWsName, viewModulesCount]);

  // Provider overlay: generate exactly viewProvidersCount synthetic provider nodes connected to workspace.
  const providerOverlay = useMemo(() => {
    if (!viewProvidersWsName) return null;
    const count = viewProvidersCount;
    const overlayNodes: TopoNode[] = [];
    const overlayEdges: TopoEdge[] = [];
    const edgeSet = new Set<string>();
    function addPEdge(a: string, b: string) {
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (!edgeSet.has(key)) { edgeSet.add(key); overlayEdges.push({ source: a, target: b }); }
    }
    const wsNodeId = `ws-prov-ov-${viewProvidersWsName}`;
    overlayNodes.push({ id: wsNodeId, label: viewProvidersWsName, type: "workspace", secondary: `${count} prov`, data: { name: viewProvidersWsName } });
    Array.from({ length: count }, (_, i) => {
      const base = providerRows[i % providerRows.length];
      const nodeId = `prov-ov-${i}`;
      const label = i < providerRows.length ? base[0] : `${base[0].split("/")[0]}/provider-${i}`;
      overlayNodes.push({ id: nodeId, label, type: "provider", secondary: `v${base[1]}`, data: {
        name: label, version: base[1], source: base[2], workspaceCount: base[3], workspaces: viewProvidersWsName,
      }});
      addPEdge(wsNodeId, nodeId);
    });
    return { nodes: overlayNodes, edges: overlayEdges };
  }, [viewProvidersWsName, viewProvidersCount]);

  const activeNodes = resourceOverlay ? resourceOverlay.nodes : moduleOverlay ? moduleOverlay.nodes : providerOverlay ? providerOverlay.nodes : nodes;
  const activeEdges = resourceOverlay ? resourceOverlay.edges : moduleOverlay ? moduleOverlay.edges : providerOverlay ? providerOverlay.edges : edges;
  const forcePositions = useMemo(() => runForceLayout(activeNodes, activeEdges), [activeNodes, activeEdges, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const stackedPositions = useMemo(() => runStackedLayout(activeNodes), [activeNodes]);
  const radialPositions = useMemo(() => runRadialLayout(activeNodes), [activeNodes]);
  const gridPositions = useMemo(() => runGridLayout(activeNodes), [activeNodes]);

  const positions = topoLayout === "grid" ? gridPositions : topoLayout === "stacked" ? stackedPositions : topoLayout === "radial" ? radialPositions : forcePositions;

  // Filter nodes/edges based on active filters (hide completely, don't dim)
  const visibleNodes = useMemo(() => {
    if (resourceOverlay) return activeNodes;
    if (activeType === "Providers" && (providerSourceFilter || providerVersionFilter)) {
      return activeNodes.filter(n =>
        (!providerSourceFilter || String(n.data?.name ?? "").toLowerCase().includes(providerSourceFilter.toLowerCase())) &&
        (!providerVersionFilter || String(n.data?.version ?? "").toLowerCase().includes(providerVersionFilter.toLowerCase()))
      );
    }
    if (activeType === "Resources" && selectedWorkspace !== null) {
      return activeNodes.filter(n =>
        n.data?.workspace === selectedWorkspace ||
        (n.type === "workspace" && n.data?.name === selectedWorkspace)
      );
    }
    return activeNodes;
  }, [activeNodes, activeType, providerSourceFilter, providerVersionFilter, selectedWorkspace, resourceOverlay]);

  // Mirror the same 30% isolation stride used in buildTopoGraph.
  // We compute against the full nodes array (pre-filter) so the isolated set is stable.
  const isolatedNodeIds = useMemo(() => {
    const connectedIds = new Set(activeEdges.flatMap(e => [e.source, e.target]));
    return new Set(activeNodes.filter(n => !connectedIds.has(n.id)).map(n => n.id));
  }, [activeNodes, activeEdges]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() =>
    activeEdges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)),
    [activeEdges, visibleNodeIds]
  );

  const neighborSet = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const s = new Set<string>();
    for (const e of activeEdges) {
      if (e.source === selectedId) s.add(e.target);
      if (e.target === selectedId) s.add(e.source);
    }
    return s;
  }, [selectedId, edges]);

  const hoverNeighborSet = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const s = new Set<string>();
    for (const e of activeEdges) {
      if (e.source === hoveredId) s.add(e.target);
      if (e.target === hoveredId) s.add(e.source);
    }
    return s;
  }, [hoveredId, edges]);

  // Blast radius: BFS depth map for all reachable nodes + visible set limited to 1 hop
  const { blastRadiusSet, blastDepthMap } = useMemo(() => {
    if (!blastRadiusId) return { blastRadiusSet: new Set<string>(), blastDepthMap: new Map<string, number>() };
    const visited = new Set<string>([blastRadiusId]);
    const depthMap = new Map<string, number>([[blastRadiusId, 0]]);
    const queue: string[] = [blastRadiusId];
    while (queue.length) {
      const cur = queue.shift()!;
      const curDepth = depthMap.get(cur)!;
      for (const e of activeEdges) {
        const neighbor = e.source === cur ? e.target : e.target === cur ? e.source : null;
        if (neighbor && !visited.has(neighbor)) {
          visited.add(neighbor);
          depthMap.set(neighbor, curDepth + 1);
          queue.push(neighbor);
        }
      }
    }
    // Only show one hop in each direction — depth 0 (origin) + depth 1 (immediate neighbours)
    const visibleSet = new Set<string>();
    for (const [id, depth] of depthMap) {
      if (depth <= 1) visibleSet.add(id);
    }
    return { blastRadiusSet: visibleSet, blastDepthMap: depthMap };
  }, [blastRadiusId, activeEdges]);

  const selectedNode = activeNodes.find(n => n.id === selectedId) ?? null;
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
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      flex: 1,
      minHeight: 0,
      // The explorer owns the dotted canvas; a transparent graph surface keeps it visible and crisp.
      backgroundColor: themeMode === "light" ? "transparent" : "#13141a",
      borderRadius: 8,
      overflow: "hidden"
    }}>
      {/* The page-level dot canvas lives below this graph; keep the SVG surface clear. */}
      <div style={{ position: "absolute", top: 14, left: 16, zIndex: 10, display: "flex", flexDirection: "column", gap: 4, fontFamily: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {activeType === "Providers" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}>
            <span style={{ color: themeMode === "light" ? "#9b9cb8" : "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>Providers:</span>
            <input
              value={providerSourceInput}
              onChange={e => setProviderSourceInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { setProviderSourceFilter(providerSourceInput); setProviderVersionFilter(providerVersionInput); } }}
              placeholder="provider_source"
              style={{ height: 30, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "0 10px", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.8)", fontSize: 12, outline: "none", width: 160, fontFamily: "inherit" }}
            />
            <input
              value={providerVersionInput}
              onChange={e => setProviderVersionInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { setProviderSourceFilter(providerSourceInput); setProviderVersionFilter(providerVersionInput); } }}
              placeholder="version_constraint"
              style={{ height: 30, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "0 10px", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.8)", fontSize: 12, outline: "none", width: 160, fontFamily: "inherit" }}
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
          <style>{`
            @keyframes topoNodeIn {
              0%   { opacity: 0; transform: scale(0.25); }
              60%  { opacity: 1; transform: scale(1.18); }
              78%  { transform: scale(0.93); }
              90%  { transform: scale(1.05); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>
          {/* Orange arrowhead — downstream edges, tip at end (markerEnd) */}
          <marker id="blast-arrow-downstream" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#D55E00" />
          </marker>
          {/* Purple arrowhead — upstream edges, tip at start (markerStart), so reversed: tip points left */}
          <marker id="blast-arrow-upstream" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#a855f7" />
          </marker>
        </defs>

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
          {/* Edges — in blast mode: blast edges hidden here (drawn orange below), non-blast edges dimmed */}
          {showEdges && visibleEdges.map((edge, i) => {
            const ps = positions.get(edge.source);
            const pt = positions.get(edge.target);
            if (!ps || !pt) return null;
            // Only edges directly touching the origin (depth 0) count as blast edges.
            // Peer edges between two depth-1 nodes stay grey and visible.
            const isBlastEdge = blastRadiusId
              ? (blastDepthMap.get(edge.source) === 0 || blastDepthMap.get(edge.target) === 0) &&
                blastRadiusSet.has(edge.source) && blastRadiusSet.has(edge.target)
              : false;
            const subViewOpen = !!(viewResourcesWsName || viewModulesWsName || viewProvidersWsName);
            const activeId = hoveredId ?? (subViewOpen ? null : selectedId);
            const isLit = !activeId || edge.source === activeId || edge.target === activeId;
            const opacity = blastRadiusId
              ? (isBlastEdge ? 0 : 0.06)
              : (activeId ? (isLit ? 1 : (themeMode === "light" ? 0.08 : 0.06)) : 1);
            return (
              <path
                key={i}
                d={curvePath(ps.x, ps.y, pt.x, pt.y)}
                fill="none"
                stroke={themeMode === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.28)"}
                strokeWidth={1 / scale}
                strokeDasharray={`${5 / scale} ${4 / scale}`}
                strokeLinecap="round"
                opacity={opacity}
                style={{ transition: "opacity 0.2s ease" }}
              />
            );
          })}

          {/* Blast radius edges — only origin↔neighbour edges get orange/purple arrows */}
          {showEdges && blastRadiusId && visibleEdges.map((edge, i) => {
            const isOriginEdge = blastDepthMap.get(edge.source) === 0 || blastDepthMap.get(edge.target) === 0;
            if (!isOriginEdge || !blastRadiusSet.has(edge.source) || !blastRadiusSet.has(edge.target)) return null;
            const ps = positions.get(edge.source);
            const pt = positions.get(edge.target);
            if (!ps || !pt) return null;
            const depthSource = blastDepthMap.get(edge.source) ?? 0;
            const depthTarget = blastDepthMap.get(edge.target) ?? 0;
            // downstream: origin → outward (depth increases). upstream: back toward origin.
            const isDownstream = depthSource <= depthTarget;
            const color = isDownstream ? "#D55E00" : "#a855f7";
            // For downstream: draw from upstream node toward downstream node, arrowhead at end.
            // For upstream: draw from the far node toward origin, arrowhead at start (the far node end).
            const [fromPos, toPos] = isDownstream ? [ps, pt] : [pt, ps];
            // Pull back the arrowhead end so the tip lands at the node boundary
            const dx = toPos.x - fromPos.x;
            const dy = toPos.y - fromPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const pullBack = (NODE_R + 2) / scale;
            const ex = toPos.x - (dx / dist) * pullBack;
            const ey = toPos.y - (dy / dist) * pullBack;
            // Also pull back the start for upstream so the arrowhead tip lands at the far node boundary
            const sx = isDownstream ? fromPos.x : fromPos.x + (dx / dist) * pullBack;
            const sy = isDownstream ? fromPos.y : fromPos.y + (dy / dist) * pullBack;
            return (
              <path
                key={`blast-${i}`}
                d={curvePath(sx, sy, ex, ey)}
                fill="none"
                stroke={color}
                strokeWidth={1 / scale}
                strokeLinecap="round"
                markerEnd={isDownstream ? "url(#blast-arrow-downstream)" : undefined}
                markerStart={!isDownstream ? "url(#blast-arrow-upstream)" : undefined}
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
            const isIsolated = isolatedNodeIds.has(node.id);
            const isHoverNeighbor = hoverNeighborSet.has(node.id);
            const inBlastRadius = blastRadiusId ? blastRadiusSet.has(node.id) : false;
            const isBlastOrigin = node.id === blastRadiusId;
            const isDimmed = blastRadiusId
              ? !inBlastRadius
              : hoveredId
                ? (!isHovered && !isHoverNeighbor)
                : (!!selectedId && !isSelected && !isNeighbor && !viewResourcesWsName && !viewModulesWsName && !viewProvidersWsName);
            // Interaction states are expressed with an outline, never by replacing the node's category color.
            const color = NODE_COLORS[node.type] ?? "#9b8ff5";
            const isHub = node.type === "ws-group-project" || node.type === "ws-group-status";
            const nR = isHub ? Math.round(NODE_R * 1.8) : NODE_R;
            const nSize = nR * 2;
            const nameLabel = node.label.length > 20 ? node.label.slice(0, 19) + "…" : node.label;
            const delay = Math.min(i * 28, 600);
            const hasNodeGlow = isHovered || isSelected || Boolean(blastRadiusId && inBlastRadius);
            const nodeOutlineColor = themeMode === "light" ? "#0c0c0e" : "#ffffff";

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
                  key={`${node.id}-${activeType}-${refreshKey}`}
                  style={{ animation: `topoNodeIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` }}
                >
                  {hasNodeGlow && <circle r={nR + 14} fill={color} opacity={(isSelected || (blastRadiusId && inBlastRadius)) ? 0.22 : 0.08} />}
                  <rect x={-nR} y={-nR} width={nSize} height={nSize} rx={isHub ? nR * 0.3 : NODE_RADIUS} fill={color} opacity={1} style={hasNodeGlow ? { filter: `drop-shadow(0 0 40px ${color})` } : undefined} />
                  {(isHovered || isSelected) && <rect x={-nR} y={-nR} width={nSize} height={nSize} rx={isHub ? nR * 0.3 : NODE_RADIUS} fill="none" stroke={nodeOutlineColor} strokeWidth={2} />}
                  <foreignObject x={-nR} y={-nR} width={nSize} height={nSize}>
                    {(() => {
                      const Icon = NODE_ICONS[node.type] ?? DEFAULT_NODE_ICON;
                      return (
                        <div style={{ width: nSize, height: nSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={nR} color="white" strokeWidth={1.75} />
                        </div>
                      );
                    })()}
                  </foreignObject>
                  <text y={nR + 16} textAnchor="middle" fill={themeMode === "light" ? "#0c0c0e" : "rgba(255,255,255,0.92)"} fontSize={isHub ? 12 : 10} fontWeight={isHub ? "700" : "600"} fontFamily="'SF UI Text', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif" letterSpacing="0">{nameLabel}</text>
                  <text y={nR + 30} textAnchor="middle" fill={themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.38)"} fontSize={10} fontWeight="400" fontFamily="'SF UI Text', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif" letterSpacing="0">{node.secondary}</text>
                </g>
              </g>
            );
          })}

        </g>
        {/* End zoomable content */}
      </svg>

      {/* Resource-view popover — independent of selectedNode, shown whenever overlay is active */}
      {viewResourcesWsName && (() => {
        const resNodes = resourceOverlay?.nodes.filter(n => n.type !== "workspace") ?? [];
        return (
          <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 300, background: themeMode === "light" ? "#ffffff" : "#161820", borderRadius: 12, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
            <button
              onClick={() => { setViewResourcesWsName(null); setViewResourcesCount(0); onOverlayWorkspaceChange?.(null); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, height: 28, padding: "0 12px", borderRadius: 20, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            >
              ← exit resource view
            </button>
            <div style={{ fontSize: 15, fontWeight: 700, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 4 }}>{viewResourcesWsName}</div>
            <div style={{ fontSize: 12, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginBottom: 14 }}>
              {resNodes.length} resource{resNodes.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 420, overflowY: "auto" }}>
              {resNodes.map(n => (
                <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: NODE_COLORS[n.type] ?? "#9b8ff5", flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: themeMode === "light" ? "#1f2328" : "rgba(255,255,255,0.9)", wordBreak: "break-all", lineHeight: 1.4 }}>{n.label}</div>
                    <div style={{ fontSize: 10, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginTop: 1, textTransform: "capitalize" }}>{n.secondary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Modules overlay panel */}
      {viewModulesWsName && (() => {
        const modNodes = moduleOverlay?.nodes.filter(n => n.type !== "workspace") ?? [];
        return (
          <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 300, background: themeMode === "light" ? "#ffffff" : "#161820", borderRadius: 12, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
            <button
              onClick={() => { setViewModulesWsName(null); setViewModulesCount(0); onOverlayWorkspaceChange?.(null); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, height: 28, padding: "0 12px", borderRadius: 20, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            >
              ← exit module view
            </button>
            <div style={{ fontSize: 15, fontWeight: 700, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 4 }}>{viewModulesWsName}</div>
            <div style={{ fontSize: 12, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginBottom: 14 }}>
              {modNodes.length} module{modNodes.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 420, overflowY: "auto" }}>
              {modNodes.length === 0
                ? <div style={{ fontSize: 12, color: themeMode === "light" ? "#9ca3af" : "rgba(255,255,255,0.3)" }}>No modules found for this workspace.</div>
                : modNodes.map(n => (
                  <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: NODE_COLORS["module"] ?? "#9b8ff5", flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: themeMode === "light" ? "#1f2328" : "rgba(255,255,255,0.9)", wordBreak: "break-all", lineHeight: 1.4 }}>{n.label}</div>
                      <div style={{ fontSize: 10, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginTop: 1 }}>{n.secondary}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        );
      })()}

      {/* Providers overlay panel */}
      {viewProvidersWsName && (() => {
        const provNodes = providerOverlay?.nodes.filter(n => n.type !== "workspace") ?? [];
        return (
          <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 300, background: themeMode === "light" ? "#ffffff" : "#161820", borderRadius: 12, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
            <button
              onClick={() => { setViewProvidersWsName(null); setViewProvidersCount(0); onOverlayWorkspaceChange?.(null); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, height: 28, padding: "0 12px", borderRadius: 20, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            >
              ← exit provider view
            </button>
            <div style={{ fontSize: 15, fontWeight: 700, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 4 }}>{viewProvidersWsName}</div>
            <div style={{ fontSize: 12, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginBottom: 14 }}>
              {provNodes.length} provider{provNodes.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 420, overflowY: "auto" }}>
              {provNodes.length === 0
                ? <div style={{ fontSize: 12, color: themeMode === "light" ? "#9ca3af" : "rgba(255,255,255,0.3)" }}>No providers found for this workspace.</div>
                : provNodes.map(n => (
                  <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: NODE_COLORS["provider"] ?? "#9b8ff5", flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: themeMode === "light" ? "#1f2328" : "rgba(255,255,255,0.9)", wordBreak: "break-all", lineHeight: 1.4 }}>{n.label}</div>
                      <div style={{ fontSize: 10, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", marginTop: 1 }}>{n.secondary}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        );
      })()}

      {/* Popover — top right, fixed position, for selected nodes */}
      {selectedNode && !viewResourcesWsName && !viewModulesWsName && !viewProvidersWsName && (() => {
        const isWorkspace = selectedNode.type === "workspace";
        const d = selectedNode.data as Record<string, unknown>;

        // Workspace blast radius popover
        if (isWorkspace && activeType === "Workspaces" && blastRadiusId === selectedNode.id) {
          // Split immediate neighbours into downstream (edge: origin→node) and upstream (edge: node→origin)
          const downstreamIds = new Set<string>();
          const upstreamIds = new Set<string>();
          for (const e of activeEdges) {
            if (e.source === blastRadiusId && blastRadiusSet.has(e.target)) downstreamIds.add(e.target);
            if (e.target === blastRadiusId && blastRadiusSet.has(e.source)) upstreamIds.add(e.source);
          }
          const nodeById = new Map(activeNodes.map(n => [n.id, n]));
          const downstreamNodes = [...downstreamIds].map(id => nodeById.get(id)).filter(Boolean) as typeof activeNodes;
          const upstreamNodes = [...upstreamIds].map(id => nodeById.get(id)).filter(Boolean) as typeof activeNodes;

          const nodeRow = (n: typeof activeNodes[number], accent: string) => (
            <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 6, background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: themeMode === "light" ? "#1f2328" : "rgba(255,255,255,0.88)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.label}</div>
              </div>
            </div>
          );

          return (
            <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 300, background: themeMode === "light" ? "#ffffff" : "#161820", borderRadius: 12, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "16px 18px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
              {/* Exit button */}
              <button
                onClick={() => setBlastRadiusId(null)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, height: 28, padding: "0 12px", borderRadius: 20, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)", color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
              >
                ← exit blast view
              </button>
              {/* Title */}
              <div style={{ fontSize: 15, fontWeight: 700, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 12 }}>{selectedNode.label}</div>

              {/* Downstream section */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none"><line x1="1" y1="5" x2="20" y2="5" stroke="#D55E00" strokeWidth="1.5" strokeLinecap="round" /><polygon points="20,2 28,5 20,8" fill="#D55E00" /></svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#D55E00", textTransform: "uppercase", letterSpacing: "0.04em" }}>Downstream ({downstreamNodes.length})</span>
                </div>
                {downstreamNodes.length > 0
                  ? <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{downstreamNodes.map(n => nodeRow(n, "#D55E00"))}</div>
                  : <div style={{ fontSize: 11, color: themeMode === "light" ? "#9ca3af" : "rgba(255,255,255,0.3)", paddingLeft: 4 }}>none</div>
                }
              </div>

              {/* Upstream section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none"><line x1="1" y1="5" x2="20" y2="5" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" /><polygon points="20,2 28,5 20,8" fill="#a855f7" /></svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: themeMode === "light" ? "#7c3aed" : "#c084fc", textTransform: "uppercase", letterSpacing: "0.04em" }}>Upstream ({upstreamNodes.length})</span>
                </div>
                {upstreamNodes.length > 0
                  ? <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{upstreamNodes.map(n => nodeRow(n, "#a855f7"))}</div>
                  : <div style={{ fontSize: 11, color: themeMode === "light" ? "#9ca3af" : "rgba(255,255,255,0.3)", paddingLeft: 4 }}>none</div>
                }
              </div>
            </div>
          );
        }

        // Workspace-specific layout matching screenshot
        if (isWorkspace && activeType === "Workspaces") {
          const providers = String(d.providers ?? "").split(",").map(p => p.trim()).filter(Boolean);
          return (
            <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 300, background: themeMode === "light" ? "#ffffff" : "#161820", borderRadius: 12, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "18px 20px 16px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 16px 48px rgba(0,0,0,0.7)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
              {/* Close */}
              <button onClick={() => { setSelectedId(null); setBlastRadiusId(null); }} style={{ position: "absolute", top: 12, right: 14, color: themeMode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "2px 4px" }}>✕</button>

              {/* Title */}
              <div style={{ fontSize: 15, fontWeight: 700, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.3, wordBreak: "break-all", marginBottom: 12, paddingRight: 20 }}>{selectedNode.label}</div>

              {/* Key-value rows — all table columns */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, maxHeight: 340, overflowY: "auto" }}>
                {getNodeFields(selectedNode, activeType).map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.4)", minWidth: 120, flexShrink: 0, lineHeight: 1.5 }}>{label}</span>
                    <span style={{ fontSize: 11, color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.85)", wordBreak: "break-word", lineHeight: 1.5 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => {
                    const count = Number((selectedNode.data as Record<string, unknown>).resources ?? 0);
                    const wsName = selectedNode.label;
                    const baseRows = resourceRows.filter(r => r.workspace === wsName);
                    const synRows = Array.from({ length: count }, (_, i) => {
                      const base = baseRows.length > 0 ? baseRows[i % baseRows.length] : resourceRows[i % resourceRows.length];
                      return { ...base, id: `syn-${i}`, workspace: wsName, address: i < baseRows.length ? base.address : `${base.type}.res_${i}` };
                    });
                    setViewResourcesWsName(wsName);
                    onOverlayWorkspaceChange?.({ kind: "resources", workspaceName: wsName, rows: synRows });
                    setViewResourcesCount(count);
                  }}
                  style={{ height: 38, borderRadius: 8, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", color: themeMode === "light" ? "#0c0c0e" : "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View resources <span>→</span>
                </button>
                <button
                  onClick={() => {
                    const modCount = Number((selectedNode.data as Record<string, unknown>).moduleCount ?? 0);
                    const wsName = selectedNode.label;
                    const modRows: readonly (readonly [string, string, string, string, string])[] = Array.from({ length: modCount }, (_, i) => {
                      const base = moduleRows[i % moduleRows.length];
                      const name = i < moduleRows.length ? base[0] : `${base[0].split("/")[0]}/module-${i}/${base[0].split("/")[2] ?? "null"}`;
                      return [name, base[1], base[2], base[3], wsName] as const;
                    });
                    setViewModulesWsName(wsName);
                    setViewModulesCount(modCount);
                    onOverlayWorkspaceChange?.({ kind: "modules", workspaceName: wsName, rows: modRows });
                  }}
                  style={{ height: 38, borderRadius: 8, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", color: themeMode === "light" ? "#0c0c0e" : "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View modules ({Number((selectedNode.data as Record<string, unknown>).moduleCount ?? 0)}) <span>→</span>
                </button>
                <button
                  onClick={() => {
                    const provCount = Number((selectedNode.data as Record<string, unknown>).providerCount ?? 0);
                    const wsName = selectedNode.label;
                    const provRows: readonly (readonly [string, string, string, string, string])[] = Array.from({ length: provCount }, (_, i) => {
                      const base = providerRows[i % providerRows.length];
                      const name = i < providerRows.length ? base[0] : `${base[0].split("/")[0]}/provider-${i}`;
                      return [name, base[1], base[2], base[3], wsName] as const;
                    });
                    setViewProvidersWsName(wsName);
                    setViewProvidersCount(provCount);
                    onOverlayWorkspaceChange?.({ kind: "providers", workspaceName: wsName, rows: provRows });
                  }}
                  style={{ height: 38, borderRadius: 8, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", color: themeMode === "light" ? "#0c0c0e" : "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View providers ({Number((selectedNode.data as Record<string, unknown>).providerCount ?? 0)}) <span>→</span>
                </button>
                <button
                  onClick={() => setBlastRadiusId(selectedNode.id)}
                  style={{ height: 38, borderRadius: 8, border: "1px solid rgba(213,94,0,0.4)", background: "transparent", color: "#D55E00", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View blast radius <span>→</span>
                </button>
              </div>
            </div>
          );
        }

        // Generic popover for all other node types — uses column-label key-value pairs
        const fields = getNodeFields(selectedNode, activeType);
        return (
          <div style={{ position: "absolute", top: 14, right: 50, zIndex: 20, width: 272, background: themeMode === "light" ? "#ffffff" : "#1c1e2b", borderRadius: 10, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", boxShadow: themeMode === "light" ? "0 12px 32px rgba(0,0,0,0.15)" : "0 12px 40px rgba(0,0,0,0.65)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: themeMode === "light" ? "#0c0c0e" : "#fff", lineHeight: 1.35, wordBreak: "break-word" }}>{selectedNode.label}</div>
                <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: NODE_COLORS[selectedNode.type] ?? "#9b8ff5", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: themeMode === "light" ? "#656a76" : "#7b7f99", textTransform: "capitalize" }}>{selectedNode.type.replace(/-/g, " ")}</span>
                  <span style={{ fontSize: 11, color: themeMode === "light" ? "#c2c5cb" : "#4b4f66", marginLeft: 2 }}>·</span>
                  <span style={{ fontSize: 11, color: themeMode === "light" ? "#656a76" : "#7b7f99" }}>{selectedNode.secondary}</span>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} style={{ color: themeMode === "light" ? "#656a76" : "#4b4f66", background: "none", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px", flexShrink: 0 }}>✕</button>
            </div>
            <div style={{ height: 1, background: themeMode === "light" ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)", margin: "0 0 12px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: 320, overflowY: "auto" }}>
              {fields.map(({ label, value }) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, color: themeMode === "light" ? "#656a76" : "#4b4f66", minWidth: 80, lineHeight: 1.5, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 11, color: themeMode === "light" ? "#3b3d45" : "rgba(255,255,255,0.72)", wordBreak: "break-word", lineHeight: 1.5 }}>{value}</span>
                </div>
              ))}
            </div>
            {isWorkspace && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: themeMode === "light" ? "1px solid rgba(0,0,0,0.07)" : "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => {
                    const wsName = selectedNode.label;
                    const baseRows = resourceRows.filter(r => r.workspace === wsName);
                    setViewResourcesWsName(wsName);
                    onOverlayWorkspaceChange?.({ workspaceName: wsName, rows: baseRows });
                    setViewResourcesCount(0);
                    setSelectedId(null);
                    setZoom({ tx: 0, ty: 0, scale: 1 });
                  }}
                  style={{ width: "100%", height: 34, borderRadius: 8, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", background: themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.08)", color: themeMode === "light" ? "#0c0c0e" : "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
                >
                  View resources <span>→</span>
                </button>
              </div>
            )}
          </div>
        );
      })()}

      {/* Layout & Theme switcher — bottom right */}
      <div style={{ position: "absolute", bottom: 16, right: 16, background: themeMode === "light" ? "rgba(255,255,255,0.88)" : "rgba(19,20,26,0.88)", backdropFilter: "blur(6px)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center", gap: 4 }}>
        {(["force", "stacked", "radial", "grid"] as TopoLayout[]).map(layout => {
          const labels: Record<TopoLayout, string> = { force: "Force", stacked: "Stacked", radial: "Radial", grid: "Grid" };
          const isActive = topoLayout === layout;
          return (
            <button
              key={layout}
              onClick={() => { setTopoLayout(layout); setZoom({ tx: 0, ty: 0, scale: 1 }); }} // zoom already resets
              style={{
                height: 26, padding: "0 12px", borderRadius: 5, border: "1px solid",
                borderColor: isActive ? (themeMode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)") : "transparent",
                background: isActive ? (themeMode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)") : "transparent",
                color: isActive ? (themeMode === "light" ? "#0c0c0e" : "rgba(255,255,255,0.95)") : (themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.5)"),
                fontSize: 12, fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                fontWeight: isActive ? 600 : 400, cursor: "pointer", transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {labels[layout]}
            </button>
          );
        })}

        {/* Connectors divider + toggle */}
        <div style={{ width: 1, height: 16, background: themeMode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)", margin: "0 4px" }} />
        <button
          onClick={() => setShowEdges(v => !v)}
          style={{
            height: 26, padding: "0 12px", borderRadius: 5, border: "1px solid",
            borderColor: showEdges ? (themeMode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)") : "transparent",
            background: showEdges ? (themeMode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)") : "transparent",
            color: showEdges ? (themeMode === "light" ? "#0c0c0e" : "rgba(255,255,255,0.95)") : (themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.5)"),
            fontSize: 12, fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
            fontWeight: showEdges ? 600 : 400, cursor: "pointer", transition: "all 0.15s ease",
            whiteSpace: "nowrap",
          }}
        >
          Connectors
        </button>

        {setThemeMode && (
          <>
            <div style={{ width: 1, height: 16, background: themeMode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)", margin: "0 4px" }} />
            {(["light", "dark"] as const).map(mode => {
              const isActive = themeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  style={{
                    height: 26, padding: "0 10px", borderRadius: 5, border: "1px solid",
                    borderColor: isActive ? (themeMode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)") : "transparent",
                    background: isActive ? (themeMode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)") : "transparent",
                    color: isActive ? (themeMode === "light" ? "#0c0c0e" : "rgba(255,255,255,0.95)") : (themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.5)"),
                    fontSize: 12, fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                    fontWeight: isActive ? 600 : 400, cursor: "pointer", transition: "all 0.15s ease",
                    textTransform: "capitalize"
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* Zoom controls — bottom right, above layout switcher */}
      <div style={{ position: "absolute", bottom: 62, right: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Table view toggle — only in View All views and not while blast radius is active */}
        {onTableViewToggle && !blastRadiusId && (
          <button
            onClick={onTableViewToggle}
            title={tableViewOpen ? "Close table view" : "Open table view"}
            style={{ width: 30, height: 30, borderRadius: 6, border: tableViewOpen ? "1px solid rgba(16,96,255,0.4)" : (themeMode === "light" ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)"), background: tableViewOpen ? "rgba(16,96,255,0.12)" : (themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)"), color: tableViewOpen ? "#1060ff" : (themeMode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)"), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ListOrdered size={13} />
          </button>
        )}
        <button onClick={() => zoomBy(1.25)} title="Zoom in" style={{ width: 30, height: 30, borderRadius: 6, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", color: themeMode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        <button onClick={() => zoomBy(1 / 1.25)} title="Zoom out" style={{ width: 30, height: 30, borderRadius: 6, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", color: themeMode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)", fontSize: 20, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
        <button onClick={() => setZoom({ tx: 0, ty: 0, scale: 1 })} title="Reset zoom" style={{ width: 30, height: 30, borderRadius: 6, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", color: themeMode === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)", fontSize: 10, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.02em" }}>FIT</button>
        <button
          onClick={() => {
            const isInitial =
              !selectedId && !blastRadiusId &&
              zoom.tx === 0 && zoom.ty === 0 && zoom.scale === 1 &&
              topoLayout === "radial" &&
              selectedWorkspace === (initialWorkspace ?? null) &&
              !providerSourceFilter && !providerVersionFilter;
            if (!isInitial) {
              setSelectedId(null);
              setBlastRadiusId(null);
              setZoom({ tx: 0, ty: 0, scale: 1 });
              setTopoLayout("radial");
              setSelectedWorkspace(initialWorkspace ?? null);
              setProviderSourceInput("");
              setProviderVersionInput("");
              setProviderSourceFilter("");
              setProviderVersionFilter("");
            }
            setRefreshKey(k => k + 1);
          }}
          title="Refresh"
          style={{ width: 30, height: 30, borderRadius: 6, border: themeMode === "light" ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)", background: themeMode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", color: themeMode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Legend key — bottom left */}
      <TopoLegend activeType={activeType} nodes={nodes} themeMode={themeMode} />
    </div>
  );
}

const NODE_TYPE_LABELS: Record<string, string> = {
  workspace: "Workspace",
  module: "Module",
  provider: "Provider",
  "terraform-version": "TF Version",
  "resource": "Resource",
  "policy-set": "Policy Set",
  "ws-group-project": "Project",
  "ws-group-status": "Status",
};

function TopoLegend({ activeType: _activeType, nodes, themeMode = "dark" }: { activeType: string; nodes: TopoNode[]; themeMode?: "light" | "dark" }) {
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
    <div style={{ position: "absolute", bottom: 16, left: 16, background: themeMode === "light" ? "rgba(255,255,255,0.88)" : "rgba(19,20,26,0.88)", backdropFilter: "blur(6px)", border: themeMode === "light" ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "nowrap" }}>
          {row.map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.75)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", whiteSpace: "nowrap" }}>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function InlineQueryBuilder({
  queryColumns,
  onApplyConditions
}: {
  queryColumns: readonly any[];
  onApplyConditions?: (conditions: ConditionFilter[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [conditions, setConditions] = useState<ConditionFilter[]>([
    { fieldId: "name", operator: "contains", value: "" }
  ]);
  const [openFieldIndex, setOpenFieldIndex] = useState<number | null>(null);
  const [openOperatorIndex, setOpenOperatorIndex] = useState<number | null>(null);

  const activeCount = conditions.filter(c => c.fieldId && c.operator && (c.operator.includes("empty") || c.value.trim())).length;

  function runQuery(currentConds = conditions) {
    const valid = currentConds.filter(c => c.fieldId && c.operator && (c.operator.includes("empty") || c.value.trim()));
    onApplyConditions?.(valid);
  }

  function handleCancel() {
    const defaultConds = [{ fieldId: "name", operator: "contains", value: "" }];
    setConditions(defaultConds);
    onApplyConditions?.([]);
  }

  return (
    <div className="mb-4 rounded-[8px] border border-[#dedfe3] bg-white p-4 shadow-sm text-[12px] text-[#3b3d45]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="flex size-[26px] items-center justify-center rounded-[5px] border border-[rgba(59,61,69,0.4)] text-[#3b3d45] hover:bg-[#f1f2f3]"
            aria-label={expanded ? "Collapse conditions" : "Expand conditions"}
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <div>
            <span className="block font-semibold text-[13px] text-[#17171a]">
              {expanded ? "Modify conditions" : "Show conditions"}
            </span>
            <span className="text-[11px] text-[#656a76]">
              {activeCount > 0 ? `${activeCount} condition${activeCount > 1 ? "s" : ""} applied ⓘ` : "No conditions applied ⓘ"}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3">
          {conditions.map((cond, index) => {
            const selectedField = queryColumns.find(c => c.id === cond.fieldId) ?? queryColumns[0];
            const SelectedFieldIcon = selectedField?.valueType === "date" ? CalendarDays : selectedField?.valueType === "number" ? Hash : selectedField?.valueType === "boolean" ? ToggleRight : Type;
            const availableOperators = operatorsByValueType[(selectedField?.valueType ?? "text") as keyof typeof operatorsByValueType];

            return (
              <div key={index} className="flex items-center gap-2">
                <span className="w-[60px] text-[12px] font-medium text-[#3b3d45]">{index === 0 ? "WHERE" : "AND"}</span>
                
                {/* Field selector */}
                <div className="relative min-w-[190px]">
                  <button
                    type="button"
                    onClick={() => setOpenFieldIndex(openFieldIndex === index ? null : index)}
                    className="flex h-9 w-full items-center justify-between rounded-l-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45]"
                  >
                    <span className="flex items-center gap-2"><SelectedFieldIcon size={14} />{selectedField?.label ?? "Name"}</span>
                    <ChevronDown size={14} />
                  </button>
                  {openFieldIndex === index && (
                    <div className="absolute left-0 top-[38px] z-40 max-h-60 w-60 overflow-y-auto rounded-[4px] border border-[#b8bcc5] bg-white py-1 shadow-md">
                      {queryColumns.map(col => {
                        const Icon = col.valueType === "date" ? CalendarDays : col.valueType === "number" ? Hash : col.valueType === "boolean" ? ToggleRight : Type;
                        return (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => {
                              setConditions(prev => prev.map((c, i) => i === index ? { ...c, fieldId: col.id, operator: operatorsByValueType[col.valueType as keyof typeof operatorsByValueType][0] } : c));
                              setOpenFieldIndex(null);
                            }}
                            className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] hover:bg-[#f1f2f3] ${cond.fieldId === col.id ? "bg-[#edf4ff] text-[#0f62fe]" : "text-[#3b3d45]"}`}
                          >
                            <Icon size={14} /> {col.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Operator selector */}
                <div className="relative -ml-2 min-w-[140px]">
                  <button
                    type="button"
                    onClick={() => setOpenOperatorIndex(openOperatorIndex === index ? null : index)}
                    className="flex h-9 w-full items-center justify-between border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45]"
                  >
                    <span>{cond.operator}</span>
                    <ChevronDown size={14} />
                  </button>
                  {openOperatorIndex === index && (
                    <div className="absolute left-0 top-[38px] z-40 max-h-60 w-48 overflow-y-auto rounded-[4px] border border-[#b8bcc5] bg-white py-1 shadow-md">
                      {availableOperators.map(op => (
                        <button
                          key={op}
                          type="button"
                          onClick={() => {
                            setConditions(prev => prev.map((c, i) => i === index ? { ...c, operator: op } : c));
                            setOpenOperatorIndex(null);
                          }}
                          className={`flex w-full px-3 py-1.5 text-left text-[12px] hover:bg-[#f1f2f3] ${cond.operator === op ? "bg-[#edf4ff] text-[#0f62fe]" : "text-[#3b3d45]"}`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Value input */}
                <input
                  type="text"
                  value={cond.value}
                  onChange={e => {
                    const val = e.target.value;
                    const newConds = conditions.map((c, i) => i === index ? { ...c, value: val } : c);
                    setConditions(newConds);
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter") runQuery();
                  }}
                  placeholder="Enter a value"
                  className="-ml-2 h-9 min-w-0 flex-1 rounded-r-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45] outline-none placeholder:text-[#8c909c] focus:border-[#0f62fe]"
                />

                {/* Trash button */}
                <button
                  type="button"
                  onClick={() => {
                    let newConds: ConditionFilter[];
                    if (conditions.length === 1) {
                      newConds = [{ fieldId: "name", operator: "contains", value: "" }];
                    } else {
                      newConds = conditions.filter((_, i) => i !== index);
                    }
                    setConditions(newConds);
                    runQuery(newConds);
                  }}
                  className="flex size-9 items-center justify-center rounded-[4px] border border-[rgba(59,61,69,0.25)] bg-[#fafafa] text-[#3b3d45] hover:bg-[#f1f2f3]"
                  aria-label="Remove condition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}

          {/* Add condition link */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setConditions(prev => [...prev, { fieldId: "name", operator: "contains", value: "" }])}
              className="flex items-center gap-1.5 text-[12px] font-medium text-[#1060ff] hover:underline"
            >
              Add condition <Plus size={14} />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => runQuery()}
              className="h-9 rounded-[6px] bg-[#1060ff] px-4 text-[12px] font-medium text-white shadow-sm hover:bg-[#0c56e9]"
            >
              Run Query
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="h-9 rounded-[6px] border border-[rgba(59,61,69,0.4)] bg-white px-4 text-[12px] font-medium text-[#3b3d45] hover:bg-[#f8f9fa]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkspacesTable({ conditions = [], visibleColumnIds, rows: rowsOverride, wsGroupMode = "none" }: { conditions?: ConditionFilter[]; visibleColumnIds: string[]; rows?: WsRow[]; wsGroupMode?: WsGroupMode }) {
  const [sort, setSort] = useState<{ id: string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const columns = tableColumns.filter(column => visibleColumnIds.includes(column.id));

  function valueForColumn(row: typeof workspaceRows[number], columnId: string): string | number | boolean {
    const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = row.metadata;
    return {
      name: row.name, project: row.project, run: row.run, runStatus: row.runStatus, currentRunApplied, repository,
      noCodeModule: row.noCodeModule, moduleCount, modules, providerCount, providers, terraformVersion,
      drifted: row.drifted, healthChecksSucceeded: row.healthChecksSucceeded, healthChecksPassed: row.healthChecksPassed,
      healthChecksFailed: row.healthChecksFailed, healthChecksErrored: row.healthChecksErrored,
      resourcesDrifted: row.resourcesDrifted, resourcesUndrifted: row.resourcesUndrifted,
      stateTerraformVersion: row.stateTerraformVersion, currentRumCount: row.currentRumCount,
      resources: row.count, tags: row.tags, created: row.created, updated: row.updated,
    }[columnId] ?? "";
  }

  const baseRows = rowsOverride ?? workspaceRows;
  const filteredRows = useMemo(() => {
    if (!conditions.length) return baseRows;
    return baseRows.filter(row =>
      conditions.every(c => {
        const col = tableColumns.find(column => column.id === c.fieldId);
        const val = valueForColumn(row, c.fieldId);
        return matchValue(val, col?.valueType ?? "text", c.operator, c.value);
      })
    );
  }, [conditions]);

  const sortedRows = useMemo(() => {
    if (!sort) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const left = valueForColumn(a, sort.id);
      const right = valueForColumn(b, sort.id);
      const numeric = typeof left === "number" || typeof right === "number";
      const comparison = numeric ? Number(left) - Number(right) : String(left).localeCompare(String(right));
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredRows, sort]);

  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const pageRows = sortedRows.slice((page - 1) * pageSize, page * pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function toggleSort(columnId: string) {
    setSort(current => current?.id === columnId ? { id: columnId, direction: current.direction === "asc" ? "desc" : "asc" } : { id: columnId, direction: "asc" });
    setPage(1);
  }

  function renderCell(row: typeof workspaceRows[number], columnId: string) {
    const value = valueForColumn(row, columnId);
    if (["name", "project", "run", "moduleCount", "providerCount", "terraformVersion", "resources", "stateTerraformVersion"].includes(columnId)) {
      return <a href="#workspace-table" onClick={event => event.preventDefault()} className="text-[#1060ff] underline underline-offset-2">{String(value)}</a>;
    }
    if (columnId === "runStatus") return <span className={`inline-flex rounded-[4px] border px-1.5 py-0.5 text-[11px] font-medium ${row.runStatus === "errored" ? "border-[#da1e28] text-[#a2191f]" : "border-[#24a148] text-[#198038]"}`}>{row.runStatus}</span>;
    if (columnId === "drifted") return <span className="rounded-[4px] bg-[#dedfe3] px-1.5 py-0.5 font-medium text-[#52525b]">{value ? "true" : "false"}</span>;
    return String(value);
  }

  // When group mode is active, build an ordered list of [groupKey, rows[]] pairs
  const groupedSections: [string, typeof sortedRows][] | null = useMemo(() => {
    if (wsGroupMode === "none") return null;
    const map = new Map<string, typeof sortedRows>();
    for (const row of sortedRows) {
      const key = wsGroupMode === "project"
        ? String(row.project ?? "Unknown")
        : String(row.runStatus ?? "Unknown");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [sortedRows, wsGroupMode]);

  const colSpan = columns.length + 1; // +1 for checkbox column

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 overflow-auto rounded-[6px] border border-[#dedfe3]">
        <table className="min-w-[5000px] table-fixed border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[#f1f2f3] text-[12px] font-semibold text-[#17171a]">
            <tr>
              <th className="h-11 w-10 border-r border-[#dedfe3] px-3 text-center" style={{ position: "sticky", left: 0, zIndex: 3, background: "#f1f2f3" }}><input type="checkbox" className="size-4 rounded-[2px] border-[#8c909c] accent-[#0f62fe]" /></th>
              {columns.map((column, ci) => (
                <th key={column.id} className={`h-11 border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`} style={ci === 0 ? { position: "sticky", left: 40, zIndex: 3, background: "#f1f2f3" } : undefined}>
                  <button type="button" onClick={() => toggleSort(column.id)} className="flex w-full items-center justify-between gap-2 whitespace-nowrap text-left text-[12px] font-semibold text-[#17171a]">
                    <span>{column.label}</span>
                    <SortControl />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[12px] text-[#52525b]">
            {groupedSections ? (
              groupedSections.map(([groupKey, groupRows]) => (
                <>
                  <tr key={`group-${groupKey}`}>
                    <td colSpan={colSpan} className="border-t border-[#dedfe3] bg-[#f7f8fa] px-4 py-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#52525b]">{groupKey}</span>
                      <span className="ml-2 text-[11px] text-[#8c909c]">{groupRows.length} workspace{groupRows.length !== 1 ? "s" : ""}</span>
                    </td>
                  </tr>
                  {groupRows.map(row => (
                    <tr key={row.id} className="h-12 border-t border-[#dedfe3] bg-white">
                      <td className="border-r border-[#dedfe3] px-3 text-center" style={{ position: "sticky", left: 0, background: "#ffffff" }}><input type="checkbox" className="size-4 rounded-[2px] border-[#8c909c] accent-[#0f62fe]" /></td>
                      {columns.map((column, ci) => <td key={column.id} className={`border-r border-[#dedfe3] px-3 whitespace-nowrap last:border-r-0 ${column.width}`} style={ci === 0 ? { position: "sticky", left: 40, background: "#ffffff" } : undefined}>{renderCell(row, column.id)}</td>)}
                    </tr>
                  ))}
                </>
              ))
            ) : (
              pageRows.map(row => (
                <tr key={row.id} className="h-12 border-t border-[#dedfe3] bg-white">
                  <td className="border-r border-[#dedfe3] px-3 text-center" style={{ position: "sticky", left: 0, background: "#ffffff" }}><input type="checkbox" className="size-4 rounded-[2px] border-[#8c909c] accent-[#0f62fe]" /></td>
                  {columns.map((column, ci) => <td key={column.id} className={`border-r border-[#dedfe3] px-3 whitespace-nowrap last:border-r-0 ${column.width}`} style={ci === 0 ? { position: "sticky", left: 40, background: "#ffffff" } : undefined}>{renderCell(row, column.id)}</td>)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!groupedSections && (
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={sortedRows.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={_size => { setPage(1); }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      )}
    </div>
  );
}

function TopologyTableView({ type, graphTitle, conditions = [], visibleColumnIds, onNavigate, onSelectResource, overlayInfo, wsGroupMode = "none" }: { type: string; graphTitle?: string | null; conditions?: ConditionFilter[]; visibleColumnIds: string[]; onNavigate: (type: string) => void; onSelectResource?: (id: string) => void; overlayInfo?: OverlayInfo | null; wsGroupMode?: WsGroupMode }) {
  // When a workspace overlay is active, show the scoped table for that kind.
  if (overlayInfo) {
    if (overlayInfo.kind === "modules") {
      return <RegistryTable rows={overlayInfo.rows} visibleColumnIds={moduleTableColumns.map(c => c.id)} conditions={[]} onNavigate={onNavigate} />;
    }
    if (overlayInfo.kind === "providers") {
      return <RegistryTable rows={overlayInfo.rows} visibleColumnIds={moduleTableColumns.map(c => c.id)} conditions={[]} onNavigate={onNavigate} />;
    }
    return <ResourcesTable
      visibleColumnIds={resourceTableColumns.map(c => c.id)}
      conditions={[]}
      onNavigate={onNavigate}
      onSelectResource={onSelectResource}
      sourceRows={overlayInfo.rows as typeof resourceRows}
    />;
  }
  // Reuse the Type details tables directly so the split Table View cannot drift from them.
  if (type === "Policy Sets") return <PolicySetsTable conditions={conditions} onNavigate={onNavigate} rows={getPolicySetRowsForTitle(graphTitle ?? null)} />;
  if (type === "Terraform Versions") return <TerraformVersionsTable visibleColumnIds={visibleColumnIds} conditions={conditions} onNavigate={onNavigate} />;
  if (type === "Resources") return <ResourcesTable visibleColumnIds={visibleColumnIds} conditions={conditions} onNavigate={onNavigate} onSelectResource={onSelectResource} />;
  if (type === "Modules") return <RegistryTable rows={moduleRows} visibleColumnIds={visibleColumnIds} conditions={conditions} onNavigate={onNavigate} />;
  if (type === "Providers") return <RegistryTable rows={providerRows} visibleColumnIds={visibleColumnIds} conditions={conditions} onNavigate={onNavigate} />;
  return <WorkspacesTable conditions={conditions} visibleColumnIds={visibleColumnIds} rows={getWorkspaceRowsForTitle(graphTitle ?? null)} wsGroupMode={wsGroupMode} />;
}

// ── ActionsDropdown ──────────────────────────────────────────────────────────

function ActionsDropdown({ columns, visibleColumnIds, onApply }: {
  columns: readonly { id: string; label: string }[];
  visibleColumnIds: string[];
  onApply: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState<string[]>(visibleColumnIds);
  const ref = useRef<HTMLDivElement>(null);

  // Sync pending when visible columns change from outside (type switch)
  useEffect(() => { setPending(visibleColumnIds); }, [visibleColumnIds]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const filteredColumns = search.trim()
    ? columns.filter(c => c.label.toLowerCase().includes(search.trim().toLowerCase()))
    : columns;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 32, width: 32, borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.15)",
          background: open ? "rgba(0,0,0,0.05)" : "#fff",
          color: "#3b3d45", cursor: "pointer",
        }}
      >
        <MoreHorizontal size={15} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          width: 240, zIndex: 60,
          background: "#fff", borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
          overflow: "hidden",
        }}>
          {/* Save */}
          <button type="button" style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 14px", background: "none", border: "none", color: "#3b3d45", fontSize: 13, cursor: "pointer", textAlign: "left" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            <Save size={14} style={{ color: "#656a76", flexShrink: 0 }} />
            Save
          </button>

          {/* Download */}
          <button type="button" style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 14px", background: "none", border: "none", color: "#3b3d45", fontSize: 13, cursor: "pointer", textAlign: "left" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            <Download size={14} style={{ color: "#656a76", flexShrink: 0 }} />
            Download
          </button>

          {/* Copy to clipboard */}
          <button type="button" style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 14px", background: "none", border: "none", color: "#3b3d45", fontSize: 13, cursor: "pointer", textAlign: "left" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            <Clipboard size={14} style={{ color: "#656a76", flexShrink: 0 }} />
            Copy to clipboard
          </button>

          <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

          {/* Narrow results search */}
          <div style={{ padding: "8px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid #d1d5db", borderRadius: 5, padding: "5px 9px", background: "#fafafa" }}>
              <Search size={12} style={{ color: "#9ca3af", flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Narrow results"
                style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 12, color: "#374151" }}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#9ca3af", lineHeight: 1, display: "flex" }}>
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

          {/* Deselect / Select all toggle */}
          <div style={{ padding: "4px 12px" }}>
            <button type="button"
              onClick={() => setPending(pending.length === 0 ? columns.map(c => c.id) : [])}
              style={{ background: "none", border: "none", padding: "4px 0", fontSize: 12, color: "#656a76", cursor: "pointer", fontWeight: 500 }}
            >
              {pending.length === 0 ? "Select all" : "Deselect all"}
            </button>
          </div>

          <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

          {/* View columns header */}
          <div style={{ padding: "6px 14px 3px", fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            View columns
          </div>

          {/* Checkbox list */}
          <div style={{ maxHeight: 200, overflowY: "auto", padding: "2px 0 4px" }}>
            {filteredColumns.length === 0 && (
              <div style={{ padding: "8px 14px", fontSize: 12, color: "#9ca3af" }}>No columns match.</div>
            )}
            {filteredColumns.map(col => {
              const checked = pending.includes(col.id);
              return (
                <label key={col.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#3b3d45" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#f5f5f7")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setPending(prev => checked ? prev.filter(id => id !== col.id) : [...prev, col.id])}
                    style={{ accentColor: "#0f62fe", width: 14, height: 14, cursor: "pointer", flexShrink: 0 }}
                  />
                  {col.label}
                </label>
              );
            })}
          </div>

          {/* Apply */}
          <div style={{ padding: "8px 12px", borderTop: "1px solid #e5e7eb" }}>
            <button
              type="button"
              onClick={() => { onApply(pending.length > 0 ? pending : columns.map(c => c.id)); setOpen(false); }}
              style={{ width: "100%", height: 32, borderRadius: 6, background: "#0f62fe", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
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
const savedViews = [
  { name: "name/rum/resource count - workspace has resources", type: "Workspaces", owner: "lyn_kotuby-e2f5b9c9", updated: "May 27 2026" },
  { name: "modules with multiple workspaces", type: "Modules", owner: "ken-cox", updated: "Apr 29 2026" },
  { name: "Ange Test 87", type: "Modules", owner: "angekaplanchambers", updated: "Oct 16 2025" },
  { name: "child saved", type: "Workspaces", owner: "ashtronaut", updated: "Oct 1 2025" },
  { name: "test", type: "Workspaces", owner: "simonxmhuang", updated: "Jul 28 2025" },
  { name: "red", type: "Workspaces", owner: "simonxmhuang", updated: "Jul 25 2025" },
  { name: "test2", type: "Workspaces", owner: "simonxmhuang", updated: "Jul 25 2025" },
  { name: "rum_test", type: "Workspaces", owner: "simonxmhuang", updated: "Jul 25 2025" },
  { name: "random stuff", type: "Workspaces", owner: "lyn_kotuby-e2f5b9c9", updated: "Jun 4 2025" },
  { name: "sim", type: "Workspaces", owner: "simonxmhuang", updated: "Jun 2 2025" },
  { name: "testing tf version bug", type: "Terraform Versions", owner: "jondavidjohn", updated: "Nov 14 2024" },
  { name: "new view", type: "Terraform Versions", owner: "jondavidjohn", updated: "Nov 14 2024" },
  { name: "try again", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "yet another one", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "new test name", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "super duper errored workspaces", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "another new name", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "new name", type: "Workspaces", owner: "jondavidjohn", updated: "Nov 12 2024" },
  { name: "tf test", type: "Terraform Versions", owner: "aditisl", updated: "Nov 12 2024" },
  { name: "new tf versions", type: "Terraform Versions", owner: "martinhenry", updated: "Nov 12 2024" },
] as const;

const splashToNavLabel: Record<string, string> = {
  "Workspaces":        "Workspaces",
  "Policy sets":       "Policy Sets",
  "Modules":           "Modules",
  "Providers":         "Providers",
  "Resources":         "Resources",
  "Terraform versions":"Terraform Versions",
};


// Shared catalog for every pre-defined Explorer view. The splash tab and HUD menu
// deliberately read from the same source so their navigation stays in sync.
const USE_CASE_CATEGORIES = [
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
  { heading: "Modules", Icon: ModuleIcon, type: "Modules", items: [] },
  { heading: "Providers", Icon: Globe, type: "Providers", items: [] },
  { heading: "Resources", Icon: ResourcesIcon, type: "Resources", items: [] },
  { heading: "Terraform Versions", Icon: TerraformIcon, type: "Terraform Versions", items: [] },
 ] as const;

// All pre-defined view titles (items + "View All {type}") — table view is allowed only for these
const PREDEFINED_VIEW_TITLES = new Set<string>([
  ...USE_CASE_CATEGORIES.flatMap(c => [...c.items, `View All ${c.type}`]),
]);

type SuggestedQuery = {
  type: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
};

const SUGGESTED_QUERIES: SuggestedQuery[] = [
  { type: "Workspaces",        label: "Workspaces with failed checks", Icon: WorkspaceIcon,  color: "#9b8ff5" },
  { type: "Policy Sets",       label: "Policy sets with failures",     Icon: Shield,          color: "#fbbf24" },
  { type: "Modules",           label: "Top module versions",           Icon: ModuleIcon,      color: "#2dd4bf" },
  { type: "Providers",         label: "Providers by workspace count",  Icon: Globe,           color: "#34d399" },
  { type: "Resources",         label: "Resources by type",             Icon: ResourcesIcon,   color: "#f472b6" },
  { type: "Terraform Versions", label: "Top Terraform versions",       Icon: TerraformIcon,   color: "#38bdf8" },
];

function SuggestedQueriesList({ themeMode, glassText, glassMuted, onSelect }: {
  themeMode: "light" | "dark";
  glassText: string;
  glassMuted: string;
  onSelect: (type: string, label: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setHasMore(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(() => { checkScroll(); }, []);

  return (
    <div className="mt-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: glassMuted }}>
        Try the following queries based on your usage.
      </p>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex flex-col gap-1 overflow-y-auto max-h-[98px]"
          style={{ scrollbarWidth: "none" }}
        >
          {SUGGESTED_QUERIES.map(query => {
            const Icon = query.Icon;
            const queryCount = query.type === "Workspaces"
              ? getWorkspaceRowsForTitle(query.label).length
              : query.type === "Policy Sets"
                ? getPolicySetRowsForTitle(query.label).length
                : query.type === "Modules" ? moduleRows.length
                : query.type === "Providers" ? providerRows.length
                : query.type === "Resources" ? resourceRows.length
                : query.type === "Terraform Versions" ? terraformVersionRows.length
                : 0;
            return (
              <button
                key={`${query.type}::${query.label}`}
                type="button"
                onClick={() => onSelect(query.type, query.label)}
                className="group flex w-full items-center gap-2 rounded-full border py-1 pl-1 pr-2.5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.07)] backdrop-blur-xl transition-all hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] active:translate-y-0 active:scale-[0.99]"
                style={{
                  background: themeMode === "light" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.08)",
                  borderColor: themeMode === "light" ? "rgba(209,213,219,0.60)" : "rgba(255,255,255,0.10)",
                }}
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-white ring-1 ring-black/5"
                  style={{ background: query.color }}
                >
                  <Icon size={10} />
                </span>
                <span className="flex-1 text-[11px] font-medium" style={{ color: glassText }}>
                  {query.label}
                </span>
                <span className="shrink-0 rounded-full bg-[#e8eaf0] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#656a76]">{queryCount}</span>
              </button>
            );
          })}
        </div>
        {hasMore && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 transition-opacity duration-200"
            style={{ background: themeMode === "light" ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.88))" : "linear-gradient(to bottom, transparent, rgba(19,20,26,0.9))" }}
          />
        )}
      </div>
    </div>
  );
}

function ExplorerSplashView({
  onSelectType,
  onSelectUseCase,
  conditionsExpanded, setConditionsExpanded,
  conditionCount, setConditionCount,
  openFieldIndex, setOpenFieldIndex,
  conditionFields, setConditionFields,
  openOperatorIndex, setOpenOperatorIndex,
  conditionOperators, setConditionOperators,
  conditionValues, setConditionValues,
  queryColumns,
  themeMode, setThemeMode,
  navOpen,
}: {
  onSelectType: (type: string) => void;
  onSelectUseCase: (type: string, title: string) => void;
  conditionsExpanded: boolean; setConditionsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  conditionCount: number; setConditionCount: React.Dispatch<React.SetStateAction<number>>;
  openFieldIndex: number | null; setOpenFieldIndex: React.Dispatch<React.SetStateAction<number | null>>;
  conditionFields: string[]; setConditionFields: React.Dispatch<React.SetStateAction<string[]>>;
  openOperatorIndex: number | null; setOpenOperatorIndex: React.Dispatch<React.SetStateAction<number | null>>;
  conditionOperators: string[]; setConditionOperators: React.Dispatch<React.SetStateAction<string[]>>;
  conditionValues: string[]; setConditionValues: React.Dispatch<React.SetStateAction<string[]>>;
  queryColumns: readonly any[];
  themeMode: "light" | "dark"; setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  navOpen: boolean;
}) {
  const [savedViewsModalOpen, setSavedViewsModalOpen] = useState(false);
  const [useCaseMenuOpen, setUseCaseMenuOpen] = useState(false);
  const [hoveredUseCaseType, setHoveredUseCaseType] = useState("Workspaces");
  const useCaseMenuRef = useRef<HTMLDivElement>(null);
  const useCaseDropdownRef = useRef<HTMLDivElement>(null);
  const useCaseTriggerRef = useRef<HTMLButtonElement>(null);
  const [useCaseMenuRect, setUseCaseMenuRect] = useState<{ top: number; left: number } | null>(null);
  const [selectedGraphType, setSelectedGraphType] = useState<string | null>(null);
  const [selectedGraphTitle, setSelectedGraphTitle] = useState<string | null>(null);
  const [tableViewOpen, setTableViewOpen] = useState(false);
  const [overlayInfo, setOverlayInfo] = useState<OverlayInfo | null>(null);
  const [wsGroupMode, setWsGroupMode] = useState<WsGroupMode>("none");
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [modalConditions, setModalConditions] = useState<ConditionFilter[]>([]);
  useEffect(() => {
    if (tableViewOpen) { setConditionsExpanded(false); }
  }, [tableViewOpen, setConditionsExpanded]);
  useEffect(() => {
    setModalConditions([]);
    if (selectedGraphType !== "Workspaces") setWsGroupMode("none");
  }, [selectedGraphType]);
  const [hudPosition, setHudPosition] = useState({ x: 56, y: 20 });
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [hudCollapsedTabTop, setHudCollapsedTabTop] = useState<number | null>(null);
  const hudTabRef = useRef<HTMLButtonElement>(null);
  const [hudDragging, setHudDragging] = useState(false);
  const hudDragRef = useRef<{ element: HTMLDivElement; canvas: HTMLElement; offsetX: number; offsetY: number } | null>(null);
  const [savedSearch, setSavedSearch] = useState("");
  const [savedType, setSavedType] = useState("All types");
  const modalQueryColumns =
    selectedGraphType === "Policy Sets" ? policySetColumns :
    selectedGraphType === "Modules" ? moduleTableColumns :
    selectedGraphType === "Providers" ? providerTableColumns :
    selectedGraphType === "Terraform Versions" ? terraformVersionTableColumns :
    selectedGraphType === "Resources" ? resourceTableColumns :
    tableColumns;
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(() => modalQueryColumns.map(c => c.id));
  useEffect(() => { setVisibleColumnIds(modalQueryColumns.map(c => c.id)); }, [selectedGraphType]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredSavedViews = useMemo(() => savedViews.filter(view => {
    const matchesSearch = view.name.toLowerCase().includes(savedSearch.trim().toLowerCase());
    const matchesType = savedType === "All types" || view.type === savedType;
    return matchesSearch && matchesType;
  }), [savedSearch, savedType]);

  function openGraph(type: string, title = type) {
    setSelectedGraphType(type);
    setSelectedGraphTitle(title);
    setSavedViewsModalOpen(false);
    setUseCaseMenuOpen(false);
  }

function startHudDrag(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("button, input, select, a")) return;

    const element = event.currentTarget;
    const canvas = element.parentElement;
    if (!canvas) return;
    const bounds = element.getBoundingClientRect();
    hudDragRef.current = {
      element,
      canvas,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    };
    setHudDragging(true);
    event.preventDefault();
  }


  useEffect(() => {
    function closeUseCaseMenu(event: MouseEvent) {
      if (
        useCaseMenuRef.current && !useCaseMenuRef.current.contains(event.target as Node) &&
        useCaseDropdownRef.current && !useCaseDropdownRef.current.contains(event.target as Node)
      ) {
        setUseCaseMenuOpen(false);
        setHoveredPanel2Item(null);
      }
    }
    window.addEventListener("mousedown", closeUseCaseMenu);
    return () => window.removeEventListener("mousedown", closeUseCaseMenu);
  }, []);

useEffect(() => {
    function moveHud(event: MouseEvent) {
      const drag = hudDragRef.current;
      if (!drag) return;
      const canvasBounds = drag.canvas.getBoundingClientRect();
      const pillBounds = drag.element.getBoundingClientRect();
      const nextX = Math.max(0, Math.min(event.clientX - canvasBounds.left - drag.offsetX, canvasBounds.width - pillBounds.width));
      const nextY = Math.max(0, Math.min(event.clientY - canvasBounds.top - drag.offsetY, canvasBounds.height - pillBounds.height));
      setHudPosition({ x: nextX, y: nextY });
    }



    function stopDragging() {
      if (hudDragRef.current) {
        hudDragRef.current = null;
        setHudDragging(false);
      }
    }

    window.addEventListener("mousemove", moveHud);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", moveHud);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  const tableResultCount = overlayInfo ? overlayInfo.rows.length
    : selectedGraphType === "Policy Sets" ? getPolicySetRowsForTitle(selectedGraphTitle).length
    : selectedGraphType === "Modules" ? moduleRows.length
    : selectedGraphType === "Providers" ? providerRows.length
    : selectedGraphType === "Resources" ? resourceRows.length
    : selectedGraphType === "Terraform Versions" ? terraformVersionRows.length
    : getWorkspaceRowsForTitle(selectedGraphTitle).length;

  const glassSurface = themeMode === "light" ? "rgba(255,255,255,0.88)" : "rgba(19,20,26,0.9)";
  const glassBorder = themeMode === "light" ? "rgba(17,24,39,0.13)" : "rgba(255,255,255,0.14)";
  const glassText = themeMode === "light" ? "#0c0c0e" : "rgba(255,255,255,0.95)";
  const glassMuted = themeMode === "light" ? "#656a76" : "rgba(255,255,255,0.64)";

  return (
    <div className="relative h-full min-h-[640px] min-w-[1200px] overflow-hidden bg-[#fafafa] font-sans" style={{ color: glassText }}>
      {/* One canvas for the full Explorer. It is deliberately behind every graph, HUD, and panel. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The imported canvas is 650px tall; repeat it so the same dot cadence reaches every viewport height. */}
        {[0, 650, 1300, 1950].map(offset => (
          <div key={offset} className="absolute inset-x-0 h-[650px]" style={{ top: offset }}>
            <DotBackgroundGraph />
          </div>
        ))}
      </div>

      {/* Topology graph */}
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-10 overflow-hidden"
        style={{ background: themeMode === "light" ? "transparent" : "#13141a" }}
      >
        {selectedGraphType ? (
          <TopologyGraph
            activeType={selectedGraphType}
            graphTitle={selectedGraphTitle}
            conditions={conditionFields.map((fieldId, index) => ({ fieldId, operator: conditionOperators[index], value: conditionValues[index]?.trim() ?? "" })).filter(condition => condition.fieldId && condition.operator && condition.value)}
            themeMode={themeMode} setThemeMode={setThemeMode}
            tableViewOpen={tableViewOpen}
            onTableViewToggle={selectedGraphTitle && PREDEFINED_VIEW_TITLES.has(selectedGraphTitle) ? () => {
              setTableViewOpen(open => !open);
              if (!tableViewOpen) setConditionsExpanded(false);
            } : undefined}
            onOverlayWorkspaceChange={setOverlayInfo}
            wsGroupMode={wsGroupMode}
            setWsGroupMode={setWsGroupMode}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-y-auto px-6 py-8" style={{ color: themeMode === "light" ? "#17171a" : "rgba(255,255,255,0.92)" }}>
            <div className="flex size-14 items-center justify-center rounded-[14px] border bg-white shadow-[0_12px_32px_rgba(23,23,26,0.14)]" style={{ borderColor: glassBorder }}>
              <ChartNoAxesCombined size={25} strokeWidth={1.65} />
            </div>
            <div className="max-w-[320px] text-center">
              <p className="text-[15px] font-semibold">Get started.</p>
              <p className="mt-1 text-[13px] leading-5" style={{ color: glassMuted }}>Select a Type or Use case to explore your Infrastructure.</p>
            </div>

          </div>
        )}
      </div>

      {/* Graph table view — centered modal */}
      <AnimatePresence>
        {tableViewOpen && selectedGraphType && (
          <>
            {/* Backdrop */}
            <motion.div
              key="table-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => { setTableViewOpen(false); setSelectedResourceId(null); }}
              style={{
                position: "fixed",
                inset: 0,
                top: 60,
                zIndex: 40,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(2px)",
              }}
            />
            {/* Centering shell — owns position, pointer-events pass through to backdrop */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                top: 60,
                zIndex: 41,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              {/* Modal — motion only animates opacity + scale, never transform-origin */}
              <motion.div
                key="table-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Table view"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  width: "85vw",
                  maxWidth: 1400,
                  height: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 12,
                  border: `1px solid ${glassBorder}`,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
                  background: glassSurface,
                  overflow: "hidden",
                  pointerEvents: "auto",
                }}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: glassBorder }}>
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: glassText }}>
                      {selectedResourceId ? (resourceRows.find(r => r.id === selectedResourceId)?.address ?? selectedResourceId) : (selectedGraphTitle ?? selectedGraphType)}
                    </p>
                    {!selectedResourceId && (
                      <p className="mt-0.5 text-[12px]" style={{ color: glassMuted }}>
                        {tableResultCount} {selectedGraphTitle ?? selectedGraphType} showing
                        {selectedGraphType === "Workspaces" && wsGroupMode !== "none" ? ` · grouped by ${wsGroupMode}` : ""}.
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {selectedResourceId ? (
                      <button
                        onClick={() => setSelectedResourceId(null)}
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 28, padding: "0 12px", borderRadius: 20, border: `1px solid ${glassBorder}`, background: "rgba(0,0,0,0.04)", color: glassMuted, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        ← back to table
                      </button>
                    ) : (
                      <ActionsDropdown
                        columns={modalQueryColumns}
                        visibleColumnIds={visibleColumnIds}
                        onApply={setVisibleColumnIds}
                      />
                    )}
                    <button type="button" onClick={() => { setTableViewOpen(false); setSelectedResourceId(null); }} className="flex size-8 items-center justify-center rounded-[6px] transition-colors hover:bg-black/5" style={{ color: glassMuted }} aria-label="Close table view">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-auto p-5">
                  {selectedResourceId ? (
                    (() => {
                      const row = (overlayInfo?.rows ?? resourceRows).find(r => r.id === selectedResourceId)
                        ?? resourceRows.find(r => r.id === selectedResourceId);
                      return row ? (
                        <ResourceDetailView
                          row={row}
                          themeMode={themeMode}
                        />
                      ) : null;
                    })()
                  ) : (
                    <>
                      <InlineQueryBuilder queryColumns={modalQueryColumns} onApplyConditions={setModalConditions} />
                      <TopologyTableView type={selectedGraphType} graphTitle={selectedGraphTitle} conditions={modalConditions} visibleColumnIds={visibleColumnIds} onNavigate={(type) => openGraph(type, type)} onSelectResource={setSelectedResourceId} overlayInfo={overlayInfo} wsGroupMode={wsGroupMode} />
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Saved Views modal */}
      <AnimatePresence>
        {savedViewsModalOpen && (
          <>
            <motion.div
              key="saved-views-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSavedViewsModalOpen(false)}
              style={{ position: "fixed", inset: 0, top: 60, zIndex: 40, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
            />
            <div style={{ position: "fixed", inset: 0, top: 60, zIndex: 41, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <motion.div
                key="saved-views-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Saved Views"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
                style={{ width: "85vw", maxWidth: 1400, height: "80vh", display: "flex", flexDirection: "column", borderRadius: 12, border: `1px solid ${glassBorder}`, boxShadow: "0 24px 64px rgba(0,0,0,0.28)", background: glassSurface, overflow: "hidden", pointerEvents: "auto" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: glassBorder }}>
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: glassText }}>Saved Views</p>
                    <p className="mt-0.5 text-[12px]" style={{ color: glassMuted }}>{savedViews.length} saved views available.</p>
                  </div>
                  <button type="button" onClick={() => setSavedViewsModalOpen(false)} className="flex size-8 items-center justify-center rounded-[6px] transition-colors hover:bg-black/5" style={{ color: glassMuted }} aria-label="Close saved views"><X size={18} /></button>
                </div>
                {/* Body */}
                <div className="min-h-0 flex-1 overflow-auto p-5">
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center">
                      <label className="flex h-9 w-[258px] items-center gap-2 rounded-l-[6px] border border-[#b8bcc5] bg-white px-3 text-[#656a76] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        <Search size={16} strokeWidth={2} />
                        <input
                          value={savedSearch}
                          onChange={event => setSavedSearch(event.target.value)}
                          placeholder="Search"
                          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#3b3d45] outline-none placeholder:text-[#737784]"
                          aria-label="Search saved views"
                        />
                      </label>
                      <label className="relative flex h-9 items-center border-y border-r border-[#b8bcc5] bg-white pl-3 pr-8 text-[13px] font-medium text-[#3b3d45] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        <select value={savedType} onChange={event => setSavedType(event.target.value)} className="appearance-none bg-transparent outline-none" aria-label="Filter saved views by type">
                          <option>All types</option>
                          <option>Workspaces</option>
                          <option>Modules</option>
                          <option>Terraform Versions</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5" size={15} />
                      </label>
                    </div>
                    <p className="mb-4 text-[13px] text-[#656a76]">{filteredSavedViews.length === savedViews.length ? "No filters applied" : `${filteredSavedViews.length} saved view${filteredSavedViews.length === 1 ? "" : "s"} shown`} <span className="font-semibold">ⓘ</span></p>
                    <div className="overflow-hidden rounded-[7px] border border-[#d7d9de] bg-white">
                      <table className="w-full table-fixed border-collapse text-left text-[12px]">
                        <thead className="bg-[#f1f2f3] text-[#17171a]">
                          <tr>
                            <th className="w-[31%] border-r border-[#d7d9de] px-4 py-3 font-semibold">Name</th>
                            <th className="w-[19%] border-r border-[#d7d9de] px-4 py-3 font-semibold">Type</th>
                            <th className="w-[20%] border-r border-[#d7d9de] px-4 py-3 font-semibold">Owner</th>
                            <th className="w-[18%] border-r border-[#d7d9de] px-4 py-3 font-semibold">Last Updated</th>
                            <th className="w-[12%] px-4 py-3 text-right font-semibold">Options</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#555964]">
                          {filteredSavedViews.map(view => (
                            <tr key={view.name} className="border-t border-[#d7d9de]">
                              <td className="break-words border-r border-[#e0e1e5] px-4 py-3.5"><a href="#saved-view" onClick={event => { event.preventDefault(); openGraph(view.type, view.name); }} className="text-[#1060ff] underline underline-offset-2 transition-colors hover:text-[#0043ce]">{view.name}</a></td>
                              <td className="border-r border-[#e0e1e5] px-4 py-3.5">{view.type}</td>
                              <td className="break-words border-r border-[#e0e1e5] px-4 py-3.5">{view.owner}</td>
                              <td className="border-r border-[#e0e1e5] px-4 py-3.5 whitespace-nowrap">{view.updated}</td>
                              <td className="px-4 py-3.5 text-right"><button type="button" className="inline-flex size-8 items-center justify-center rounded-[6px] border border-[#c9ccd2] bg-white text-[#535862] hover:bg-[#f2f3f5]" aria-label={`Options for ${view.name}`}><MoreHorizontal size={17} /></button></td>
                            </tr>
                          ))}
                          {filteredSavedViews.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-10 text-center text-[#656a76]">No saved views match your search.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* HUD wrapper — tab at bottom-right outside, card above tab in stacking order */}
      <div className="absolute" style={{ left: hudPosition.x, top: hudPosition.y, zIndex: 30 }}>

        {/* Tab — rendered first (lower z), attached to outside-right bottom corner */}
        <button
          ref={hudTabRef}
          type="button"
          onClick={e => {
            e.stopPropagation();
            if (!hudCollapsed && hudTabRef.current) {
              setHudCollapsedTabTop(hudTabRef.current.getBoundingClientRect().top);
            }
            setHudCollapsed(c => !c);
          }}
          onMouseDown={e => e.stopPropagation()}
          aria-label={hudCollapsed ? "Expand Explorer HUD" : "Collapse Explorer HUD"}
          style={hudCollapsed ? {
            position: "fixed",
            left: navOpen ? 280 : 0,
            top: hudCollapsedTabTop ?? Math.max(64, hudPosition.y + 25),
            width: 44,
            height: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#fafafa",
            border: "1px solid #DEDFE3",
            borderLeft: "none",
            borderRadius: "0 6px 6px 0",
            boxShadow: "3px 0 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            color: "#656a76",
            zIndex: 35,
            transition: "left 0.3s cubic-bezier(0.25,0.8,0.25,1)",
          } : {
            position: "absolute",
            bottom: 25,
            left: "100%",
            width: 44,
            height: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#fafafa",
            border: "1px solid #DEDFE3",
            borderLeft: "none",
            borderRadius: "0 6px 6px 0",
            boxShadow: "3px 0 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            color: "#656a76",
            zIndex: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path clipRule="evenodd" d="M11.914 4.97131C11.9979 4.71977 11.9324 4.44245 11.7449 4.25497C11.5574 4.06749 11.2801 4.00202 11.0286 4.08587L6.15359 5.71087C5.94456 5.78054 5.78054 5.94456 5.71087 6.15359L4.08587 11.0286C4.00202 11.2801 4.06749 11.5574 4.25497 11.7449C4.44245 11.9324 4.71977 11.9979 4.97131 11.914L9.8463 10.289C10.0553 10.2193 10.2193 10.0553 10.289 9.8463L11.914 4.97131ZM5.85674 10.1431L6.92834 6.92834L10.1431 5.85674L9.07155 9.07155L5.85674 10.1431Z" fill="currentColor" fillRule="evenodd" />
            <path clipRule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8Z" fill="currentColor" fillRule="evenodd" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1 }}>
            {hudCollapsed ? "VIEW" : "HIDE"}
          </span>
        </button>

        {/* HUD card — rendered after tab, z-index:1 so its dropdown always paints over the tab */}
        {!hudCollapsed && (
        <div
          className="w-[50vw] max-w-[425px] rounded-[12px] border px-4 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          style={{ position: "relative", zIndex: 1, background: glassSurface, borderColor: glassBorder, cursor: hudDragging ? "grabbing" : "grab", userSelect: hudDragging ? "none" : undefined }}
          onMouseDown={startHudDrag}
        >
      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: glassMuted }}>
        <span>ILM_Demo_Space</span>
        <span>/</span>
        <span>Explorer</span>
        <span>/</span>
        <span className="font-medium" style={{ color: glassText }}>Types</span>
      </div>

      {/* Title row — collapse button on right */}
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 flex items-center gap-2 text-[20px] font-semibold leading-6" style={{ color: glassText }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path clipRule="evenodd" d="M11.914 4.97131C11.9979 4.71977 11.9324 4.44245 11.7449 4.25497C11.5574 4.06749 11.2801 4.00202 11.0286 4.08587L6.15359 5.71087C5.94456 5.78054 5.78054 5.94456 5.71087 6.15359L4.08587 11.0286C4.00202 11.2801 4.06749 11.5574 4.25497 11.7449C4.44245 11.9324 4.71977 11.9979 4.97131 11.914L9.8463 10.289C10.0553 10.2193 10.2193 10.0553 10.289 9.8463L11.914 4.97131ZM5.85674 10.1431L6.92834 6.92834L10.1431 5.85674L9.07155 9.07155L5.85674 10.1431Z" fill="currentColor" fillRule="evenodd" />
              <path clipRule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8Z" fill="currentColor" fillRule="evenodd" />
            </svg>
            Explorer
          </h1>
          <p className="mt-1 text-[12px] leading-4" style={{ color: glassMuted }}>Explore your data to analyze your organization&apos;s Terraform usage.</p>
        </div>
      </div>

      {/* Browse Types dropdown + selected tag */}
      <div className="mt-3" ref={useCaseMenuRef} onMouseDown={event => event.stopPropagation()}>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: glassMuted }}>Browse</p>
        <div className="relative">
          <button
            ref={useCaseTriggerRef}
            type="button"
            onClick={() => {
              const rect = useCaseTriggerRef.current?.getBoundingClientRect();
              if (rect) setUseCaseMenuRect({ top: rect.bottom + 4, left: rect.left });
              setUseCaseMenuOpen(open => !open);
            }}
            aria-expanded={useCaseMenuOpen}
            aria-haspopup="menu"
            className="flex h-8 w-full items-center justify-between rounded-[4px] border px-3 text-left text-[12px] font-medium transition-colors bg-white text-[#3b3d45] hover:bg-[#f1f2f3]"
            style={{ borderColor: "rgba(59,61,69,0.4)" }}
          >
            <span className="flex items-center gap-2"><Compass size={14} />Types, Use cases and Saved views</span>
            <ChevronDown size={14} className={`transition-transform duration-150 ${useCaseMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {useCaseMenuOpen && (() => {
            const activeCategory = USE_CASE_CATEGORIES.find(category => category.type === hoveredUseCaseType) ?? USE_CASE_CATEGORIES[0];
            const typeRowCounts: Record<string, number> = {
              "Workspaces": workspaceRows.length,
              "Policy Sets": policySetRows.length,
              "Modules": moduleRows.length,
              "Providers": providerRows.length,
              "Resources": resourceRows.length,
              "Terraform Versions": terraformVersionRows.length,
            };
            const viewAllWorkspacesLabel = "View All Workspaces";
            return (
              <div
                ref={useCaseDropdownRef}
                role="menu"
                aria-label="Pre-defined Explorer views"
                className="fixed z-[200] grid rounded-[9px] border shadow-[0_18px_38px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                style={{
                  background: themeMode === "light" ? "rgba(249,250,252,0.96)" : "rgba(27,29,37,0.96)",
                  borderColor: glassBorder,
                  top: useCaseMenuRect?.top ?? 0,
                  left: useCaseMenuRect?.left ?? 0,
                  width: 620,
                  gridTemplateColumns: "240px 1fr",
                }}
              >
                {/* Panel 1 — Types */}
                <div className="border-r p-1.5" style={{ borderColor: glassBorder }}>
                  <p className="px-2.5 pb-1.5 pt-1 text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: glassMuted }}>Types</p>
                  {USE_CASE_CATEGORIES.map(category => {
                    const CategoryIcon = category.Icon;
                    const isHovered = category.type === activeCategory.type;
                    return (
                      <button
                        key={category.type}
                        type="button"
                        role="menuitem"
                        onClick={() => { setHoveredUseCaseType(category.type); setHoveredPanel2Item(null); }}
                        className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${isHovered ? "bg-[#0f62fe] text-white" : "hover:bg-black/5"}`}
                        style={!isHovered ? { color: glassText } : undefined}
                      >
                        <span className="flex items-center gap-2"><CategoryIcon size={14} className="shrink-0" />{category.heading}</span>
                        <ChevronRight size={14} className={isHovered ? "opacity-90" : "opacity-45"} />
                      </button>
                    );
                  })}
                  <div className="my-1.5 border-t" style={{ borderColor: glassBorder }} />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => { setSavedViewsModalOpen(true); setUseCaseMenuOpen(false); }}
                    className="flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-semibold transition-colors hover:bg-[#dbeafe] hover:text-[#0f62fe]"
                    style={{ color: glassText }}
                  >
                    <span className="flex items-center gap-2"><ListOrdered size={14} className="shrink-0" />Saved views</span>
                    <ChevronRight size={14} className="opacity-45" />
                  </button>
                </div>

                {/* Panel 2 — Pre-defined Views */}
                <div className="p-3">
                  <p className="mb-2 px-1 pt-1 text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: glassMuted }}>Pre-defined Views</p>
                  <div className="space-y-0.5">
                    {(() => {
                      const viewAllLabel = `View All ${activeCategory.type}`;
                      const isViewAllSelected = selectedGraphTitle === viewAllLabel && wsGroupMode === "none";
                      const viewAllCount = typeRowCounts[activeCategory.type] ?? 0;
                      return (
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => { setWsGroupMode("none"); openGraph(activeCategory.type, viewAllLabel); }}
                          className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${isViewAllSelected ? "bg-[#edf4ff] text-[#0f62fe]" : "hover:bg-[#dbeafe] hover:text-[#0f62fe]"}`}
                          style={!isViewAllSelected ? { color: glassText } : undefined}
                        >
                          <span>{viewAllLabel}</span>
                          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${isViewAllSelected ? "bg-[#0f62fe]/10 text-[#0f62fe]" : "bg-[#e8eaf0] text-[#656a76]"}`}>{viewAllCount}</span>
                        </button>
                      );
                    })()}
                    {/* Group-by sub-views — only for Workspaces */}
                    {activeCategory.type === "Workspaces" && (() => {
                      const wsCount = workspaceRows.length;
                      const byProjectSelected = selectedGraphTitle === viewAllWorkspacesLabel && wsGroupMode === "project";
                      const byStatusSelected  = selectedGraphTitle === viewAllWorkspacesLabel && wsGroupMode === "status";
                      return (
                        <>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => { setWsGroupMode("project"); openGraph("Workspaces", viewAllWorkspacesLabel); }}
                            className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${byProjectSelected ? "bg-[#edf4ff] text-[#0f62fe]" : "hover:bg-[#dbeafe] hover:text-[#0f62fe]"}`}
                            style={!byProjectSelected ? { color: glassText } : undefined}
                          >
                            <span>View All Workspaces by Project</span>
                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${byProjectSelected ? "bg-[#0f62fe]/10 text-[#0f62fe]" : "bg-[#e8eaf0] text-[#656a76]"}`}>{wsCount}</span>
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => { setWsGroupMode("status"); openGraph("Workspaces", viewAllWorkspacesLabel); }}
                            className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${byStatusSelected ? "bg-[#edf4ff] text-[#0f62fe]" : "hover:bg-[#dbeafe] hover:text-[#0f62fe]"}`}
                            style={!byStatusSelected ? { color: glassText } : undefined}
                          >
                            <span>View All Workspaces by Status</span>
                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${byStatusSelected ? "bg-[#0f62fe]/10 text-[#0f62fe]" : "bg-[#e8eaf0] text-[#656a76]"}`}>{wsCount}</span>
                          </button>
                        </>
                      );
                    })()}
                    {activeCategory.items.map(view => {
                      const isSelected = selectedGraphTitle === view;
                      const viewCount = activeCategory.type === "Workspaces"
                        ? getWorkspaceRowsForTitle(view).length
                        : activeCategory.type === "Policy Sets"
                          ? getPolicySetRowsForTitle(view).length
                          : typeRowCounts[activeCategory.type] ?? 0;
                      return (
                        <button
                          key={view}
                          type="button"
                          role="menuitem"
                          onClick={() => openGraph(activeCategory.type, view)}
                          className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${isSelected ? "bg-[#edf4ff] text-[#0f62fe]" : "hover:bg-[#dbeafe] hover:text-[#0f62fe]"}`}
                          style={!isSelected ? { color: glassText } : undefined}
                        >
                          <span>{view}</span>
                          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${isSelected ? "bg-[#0f62fe]/10 text-[#0f62fe]" : "bg-[#e8eaf0] text-[#656a76]"}`}>{viewCount}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })()}
        </div>

        {selectedGraphTitle && (() => {
          const ActiveIcon = USE_CASE_CATEGORIES.find(c => c.type === selectedGraphType)?.Icon ?? Compass;
          const typeRowCounts: Record<string, number> = {
            "Workspaces": workspaceRows.length,
            "Policy Sets": policySetRows.length,
            "Modules": moduleRows.length,
            "Providers": providerRows.length,
            "Resources": resourceRows.length,
            "Terraform Versions": terraformVersionRows.length,
          };
          const resultCount = selectedGraphType === "Workspaces"
            ? getWorkspaceRowsForTitle(selectedGraphTitle).length
            : selectedGraphType === "Policy Sets"
              ? getPolicySetRowsForTitle(selectedGraphTitle).length
              : typeRowCounts[selectedGraphType ?? ""] ?? 0;
          // Derive the exact label shown in the dropdown so the chip matches 1:1
          const chipLabel = selectedGraphType === "Workspaces" && wsGroupMode === "project"
            ? "View All Workspaces by Project"
            : selectedGraphType === "Workspaces" && wsGroupMode === "status"
              ? "View All Workspaces by Status"
              : selectedGraphTitle;
          return (
            <div className="mt-2 flex flex-col gap-2">
              {/* Chip — label matches the dropdown item that was clicked, plus count */}
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-[rgba(101,106,118,0.2)] bg-[#f1f2f3] pl-2 pr-2.5 py-1 text-[12px] font-medium text-[#3b3d45]">
                <span className="flex size-4 items-center justify-center text-[#656a76]">
                  <ActiveIcon size={14} />
                </span>
                {chipLabel}
                <span className="font-normal text-[#656a76]">({resultCount})</span>
                <button type="button" onClick={() => { setSelectedGraphType(null); setSelectedGraphTitle(null); setWsGroupMode("none"); }} className="hover:text-black ml-0.5" aria-label="Dismiss view">
                  <X size={13} />
                </button>
              </span>
            </div>
          );
        })()}

        <SuggestedQueriesList
          themeMode={themeMode}
          glassText={glassText}
          glassMuted={glassMuted}
          onSelect={openGraph}
        />
        </div>
        </div>
        )}
      </div>

    </div>
  );
}

// ── Workspaces Explorer ──────────────────────────────────────────────────────

export function WorkspacesExplorerView({ navOpen = false }: { navOpen?: boolean }) {
  const [explorerPage, setExplorerPage] = useState<"splash" | "detail">("splash");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
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
      <div className="h-full min-w-[1200px] bg-white font-sans text-[#0c0c0e]">
        <ExplorerSplashView
          onSelectType={navigateToType}
          onSelectUseCase={navigateToUseCase}
          conditionsExpanded={conditionsExpanded} setConditionsExpanded={setConditionsExpanded}
          conditionCount={conditionCount} setConditionCount={setConditionCount}
          openFieldIndex={openFieldIndex} setOpenFieldIndex={setOpenFieldIndex}
          conditionFields={conditionFields} setConditionFields={setConditionFields}
          openOperatorIndex={openOperatorIndex} setOpenOperatorIndex={setOpenOperatorIndex}
          conditionOperators={conditionOperators} setConditionOperators={setConditionOperators}
          conditionValues={conditionValues} setConditionValues={setConditionValues}
          queryColumns={tableColumns}
          themeMode={themeMode} setThemeMode={setThemeMode}
          navOpen={navOpen}
        />
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
            <span>ILM_Demo_Space</span><span>/</span><span className="font-medium text-[#3b3d45]">Explorer</span>
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
                        const selectedField = activeTableColumns.find(column => column.id === conditionFields[index]) ?? activeTableColumns[0];
                        const SelectedFieldIcon = selectedField.valueType === "date" ? CalendarDays : selectedField.valueType === "number" ? Hash : selectedField.valueType === "boolean" ? ToggleRight : Type;
                        return (
                          <div className="relative min-w-[190px]">
                            <button type="button" onClick={() => setOpenFieldIndex(current => current === index ? null : index)} aria-expanded={openFieldIndex === index} aria-haspopup="listbox" className="flex h-8 w-full items-center justify-between gap-2 rounded-l-[4px] border border-[rgba(59,61,69,0.4)] bg-white px-3 text-[12px] text-[#3b3d45]">
                              <span className="flex items-center gap-2"><SelectedFieldIcon size={14} />{selectedField.label}</span><ChevronDown size={14} />
                            </button>
                            {openFieldIndex === index && (
                              <div role="listbox" className="absolute left-0 top-[34px] z-40 max-h-64 w-64 overflow-y-auto rounded-[4px] border border-[rgba(101,106,118,0.2)] bg-white py-1 shadow-[0_2px_6px_rgba(101,106,118,0.2)]">
                                {activeTableColumns.map(column => {
                                  const FieldIcon = column.valueType === "date" ? CalendarDays : column.valueType === "number" ? Hash : column.valueType === "boolean" ? ToggleRight : Type;
                                  return <button key={column.id} type="button" role="option" aria-selected={selectedField.id === column.id} onClick={() => { setConditionFields(fields => fields.map((field, fieldIndex) => fieldIndex === index ? column.id : field)); setConditionOperators(operators => operators.map((operator, operatorIndex) => operatorIndex === index ? operatorsByValueType[column.valueType as keyof typeof operatorsByValueType][0] : operator)); setOpenFieldIndex(null); }} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] hover:bg-[#f1f2f3] ${selectedField.id === column.id ? "bg-[#edf4ff] text-[#0f62fe]" : "text-[#3b3d45]"}`}><FieldIcon size={14} />{column.label}</button>;
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                      {(() => {
                        const selectedField = activeTableColumns.find(column => column.id === conditionFields[index]) ?? activeTableColumns[0];
                        const selectedOperator = conditionOperators[index] ?? operatorsByValueType[selectedField.valueType as keyof typeof operatorsByValueType][0];
                        const availableOperators = operatorsByValueType[selectedField.valueType as keyof typeof operatorsByValueType];
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
                        const selectedField = activeTableColumns.find(column => column.id === conditionFields[index]) ?? activeTableColumns[0];
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
                conditions={draftConditions}
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
                  <th className="h-11 w-10 border-r border-[#dedfe3] px-3 text-center"><input type="checkbox" className="size-4 rounded-[2px] border-[#8c909c] accent-[#0f62fe]" /></th>
                  {shownColumns.map(column => (
                    <th key={column.id} className={`h-11 border-r border-[#dedfe3] px-3 last:border-r-0 ${column.width}`}>
                      <span className="flex items-center justify-between gap-2 whitespace-nowrap text-[12px] font-semibold text-[#17171a]">{column.label}<SortControl /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] text-[#52525b]">
                {pageRows.map(({ id, name, project, count, run, runStatus, status, noCodeModule, drifted, healthChecksSucceeded, healthChecksPassed, healthChecksFailed, healthChecksErrored, resourcesDrifted, resourcesUndrifted, stateTerraformVersion, currentRumCount, tags, created, updated, metadata }) => {
                  const [currentRunApplied, repository, moduleCount, modules, providerCount, providers, terraformVersion] = metadata;
                  return (
                    <tr key={id} className="h-12 border-t border-[#dedfe3] bg-white">
                      <td className="border-r border-[#dedfe3] px-3 text-center"><input type="checkbox" className="size-4 rounded-[2px] border-[#8c909c] accent-[#0f62fe]" /></td>
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

          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filteredWorkspaceRows.length}
            pageSize={itemsPerPage}
            onPageChange={setPage}
            onPageSizeChange={size => { setItemsPerPage(size); setPage(1); }}
            pageSizeOptions={[20, 50, 100]}
          />
          </>}
        </div>
      </main>
    </div>
  );
}
