import svgPaths from "@/imports/WorkspaceRunsDetails-1/svg-u5huszq65m";
import badgeSvgPaths from "@/imports/Badge/svg-2sn4n8iz26";
import imgUser from "@/imports/WorkspaceRunsDetails-1/9ebc1ce39d50aa79cb3431fd2f56d7e4c9c0ad57.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface RunDetailsViewProps {
  onBack: () => void;
  runId: string;
  onOpenOpTriage?: (opId: string) => void;
}

// ── Shared icon helpers ───────────────────────────────────────────────────────

function TerraformIcon({ fill = "#656A76" }: { fill?: string }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d={svgPaths.p3d990f40} fill={fill} />
      <path d={svgPaths.p7e6e000} fill={fill} />
      <path d={svgPaths.p24a11800} fill={fill} />
      <path d={svgPaths.p9584200} fill={fill} />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="11.25" height="12" viewBox="0 0 11.25 12" fill="none">
      <path clipRule="evenodd" d={svgPaths.p124e3d80} fill="#1060FF" fillRule="evenodd" />
      <path d={svgPaths.p32b92600} fill="#1060FF" />
      <path d={svgPaths.p2dfdca0} fill="#1060FF" />
      <path d={svgPaths.p3dff8200} fill="#1060FF" />
      <path d={svgPaths.p164e0b00} fill="#1060FF" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="5.99896" height="9.99728" viewBox="0 0 5.99896 9.99728" fill="none">
      <path d={svgPaths.p35cd0d80} fill="#656A76" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="#3B3D45" fillRule="evenodd" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path clipRule="evenodd" d={svgPaths.p16aa5200} fill="#3B3D45" fillRule="evenodd" />
    </svg>
  );
}

function PlusGreen() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d={svgPaths.p387d2d00} fill="#00781E" />
    </svg>
  );
}

function PlusRed() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d={svgPaths.p387d2d00} fill="#C00005" />
    </svg>
  );
}

function CheckCircleGreen() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p3af3500} fill="#00781E" />
    </svg>
  );
}

function XCircleRed() {
  return (
    <svg width="15.5" height="15.5" viewBox="0 0 15.5 15.5" fill="none">
      <path d={svgPaths.p1ec78100} fill="#DA1E28" />
    </svg>
  );
}

function XCircleRedSmall() {
  return (
    <svg width="15.5" height="15.5" viewBox="0 0 15.5 15.5" fill="none">
      <path d={svgPaths.p201b5300} fill="#C00005" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="10.5" height="12" viewBox="0 0 10.5 12" fill="none">
      <path d={svgPaths.p259c76c0} fill="#3B3D45" />
    </svg>
  );
}

function DownloadSentinelIcon() {
  return (
    <svg width="10.5" height="10.5" viewBox="0 0 10.5 10.5" fill="none">
      <path d={svgPaths.p27de900} fill="#3B3D45" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="9.5" viewBox="0 0 14 9.5" fill="none">
      <path d={svgPaths.p16e94100} fill="#3B3D45" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14.0625" height="14.0625" viewBox="0 0 14.0625 14.0625" fill="none">
      <path clipRule="evenodd" d={svgPaths.p2af5a200} fill="#656A76" fillRule="evenodd" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p343b6400} fill="#656A76" />
    </svg>
  );
}

function AdvisoryIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path d={svgPaths.p448f5f0} fill="#0046D1" />
    </svg>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

function Breadcrumb({ runId, onBack }: { runId: string; onBack: () => void }) {
  const crumbs = ["CoolCorp", "Workspaces", "my-workspace", "Runs"];
  return (
    <div className="flex items-center gap-1" style={{ fontSize: "13px" }}>
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1">
          <span
            onClick={i === crumbs.length - 1 ? onBack : undefined}
            style={{ color: "#1060ff", textDecoration: "underline", cursor: "pointer" }}
          >
            {crumb}
          </span>
          <span style={{ color: "#656a76" }}>/</span>
        </span>
      ))}
      <span style={{ color: "#0c0c0e", fontWeight: 500 }}>{runId}</span>
    </div>
  );
}

// ── Workspace Header ──────────────────────────────────────────────────────────

function WorkspaceHeader() {
  return (
    <div className="flex items-start justify-between gap-4 w-full">
      <div className="flex flex-1 min-w-0 flex-col gap-2">
        <h1 style={{ color: "#0c0c0e", fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0, lineHeight: "38px" }}>my-workspace</h1>
        <div style={{ color: "#3b3d45", fontSize: "13px", fontFamily: "monospace", lineHeight: "16px" }}>ID: ws-1HkX32P8UKEJ3Lmo</div>
        <span style={{ color: "#3b3d45", fontSize: "14px", textDecoration: "underline", cursor: "pointer", fontWeight: 510 }}>Add workspace description</span>
        <div className="flex items-center gap-6 flex-wrap" style={{ fontSize: "14px" }}>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none"><path d={svgPaths.p37a3cc00} fill="#656A76" /></svg>
            <span style={{ color: "#656a76" }}>Locked by </span><span style={{ color: "#0c0c0e" }}>johndoe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d={svgPaths.pf42b00} fill="#656A76" /></svg>
            <span style={{ color: "#656a76" }}>Resources </span><span style={{ color: "#0c0c0e" }}>211</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14.1286" height="14.1286" viewBox="0 0 14.1286 14.1286" fill="none"><path d={svgPaths.p1641bd80} fill="#656A76" /></svg>
            <span style={{ color: "#656a76" }}>Tags </span><span style={{ color: "#0c0c0e" }}>3</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TerraformIcon />
            <span style={{ color: "#656a76" }}>Terraform </span><span style={{ color: "#3b3d45", textDecoration: "underline", cursor: "pointer" }}>v0.12.4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14.5" viewBox="0 0 14 14.5" fill="none"><path d={svgPaths.p15442080} fill="#656A76" /></svg>
            <span style={{ color: "#656a76" }}>Updated </span><span style={{ color: "#0c0c0e" }}>today at 10:12 AM</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa", color: "#3b3d45", fontSize: "14px", fontWeight: 510, boxShadow: "0px 1px 0.5px rgba(101,106,118,0.05),0px 2px 1px rgba(101,106,118,0.05)" }}>
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none"><path d={svgPaths.p37a3cc00} fill="#3B3D45" /></svg>
          Lock
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-[5px]" style={{ backgroundColor: "#1060ff", color: "white", fontSize: "14px", fontWeight: 510, border: "1px solid #0c56e9", boxShadow: "0px 1px 0.5px rgba(101,106,118,0.05),0px 2px 1px rgba(101,106,118,0.05)" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={svgPaths.p1a8e2700} fill="white" /></svg>
          New Run
        </button>
      </div>
    </div>
  );
}

// ── Run Title + Badges ────────────────────────────────────────────────────────

function RunTitleRow() {
  return (
    <div className="flex items-center justify-between w-full">
      <p style={{ fontSize: "24px", fontWeight: 600, color: "#0c0c0e", margin: 0, lineHeight: "32px" }}>Triggered via CLI</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 px-2 py-1 rounded-[5px]" style={{ backgroundColor: "#dedfe3" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d={svgPaths.pf6d7a00} fill="#3B3D45" /></svg>
          <span style={{ fontSize: "13px", fontWeight: 510, color: "#3b3d45" }}>Current</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-[5px]" style={{ backgroundColor: "#fbd4d4" }}>
          <div className="relative shrink-0 size-[16px]">
            <div className="absolute inset-[18.75%_18.76%_18.76%_18.75%]">
              <svg className="absolute block inset-0 size-full" fill="none" height="9.99855" viewBox="0 0 9.99855 9.99855" width="9.99855">
                <path d={badgeSvgPaths.p21c83c0} fill="#940004" />
              </svg>
            </div>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 510, color: "#940004" }}>Failed</span>
        </div>
      </div>
    </div>
  );
}

// ── Run Summary ───────────────────────────────────────────────────────────────

function RunSummary() {
  return (
    <div className="flex gap-12 items-start">
      <div className="flex flex-col gap-1.5">
        <span style={{ fontSize: "13px", color: "#656a76", lineHeight: "18px" }}>Plan Duration</span>
        <span style={{ fontSize: "13px", color: "#3b3d45", lineHeight: "18px" }}>Less than a minute</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span style={{ fontSize: "13px", color: "#656a76", lineHeight: "18px" }}>Resources to be changed</span>
        <span style={{ fontSize: "13px", lineHeight: "18px" }}>
          <span style={{ color: "#008a22" }}>+2</span>{"  "}
          <span style={{ color: "#1060ff" }}>~0</span>{"  "}
          <span style={{ color: "#e52228" }}>-0</span>
        </span>
      </div>
    </div>
  );
}

// ── Shared: Plan content (search + resource list + footer) ────────────────────

function PlanContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Metadata row */}
      <div className="flex items-center h-[33px] bg-white w-full px-3">
        <span style={{ fontSize: "13px", color: "#656a76" }}>
          <span style={{ fontWeight: 600 }}>Started</span>{" 30 minutes ago  >  "}
          <span style={{ fontWeight: 600 }}>Finished</span>{" 30 minutes ago "}
        </span>
      </div>
      {/* Change bar */}
      <div className="flex items-center h-[66px] bg-white w-full">
        <div className="flex-1 px-4 py-4">
          <div className="rounded-[4px] px-2 py-2 flex items-center gap-2" style={{ backgroundColor: "#00781e" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={svgPaths.p387d2d00} fill="white" /></svg>
            <span style={{ fontSize: "13px", fontWeight: 590, color: "white" }}>2 to create</span>
          </div>
        </div>
      </div>
      {/* Search and actions */}
      <div className="flex items-center gap-4 w-full" style={{ height: "52px", borderTop: "1px solid rgba(101,106,118,0.1)", borderBottom: "1px solid rgba(101,106,118,0.1)" }}>
        <div className="flex items-center gap-2 px-2 mx-4 rounded-[5px]" style={{ width: "320px", border: "1px solid #8c909c", backgroundColor: "white", height: "36px", boxShadow: "inset 0px 1px 2px 1px rgba(101,106,118,0.1)" }}>
          <SearchIcon />
          <span style={{ fontSize: "14px", color: "#656a76" }}>Filter by address...</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa", width: "173px" }}>
          <div className="flex items-center gap-1.5"><FilterIcon /><span style={{ fontSize: "14px", fontWeight: 510, color: "#3b3d45" }}>Filter by action</span></div>
          <ChevronDown />
        </div>
        <div className="flex items-center justify-end gap-6 flex-1 px-4">
          <span style={{ fontSize: "13px", color: "#656a76" }}>terraform 1.8</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa", color: "#3b3d45", fontSize: "13px", fontWeight: 510 }}>
            <DownloadIcon />Download raw log
          </button>
        </div>
      </div>
      {/* Resource 1 */}
      <div className="flex items-center h-[44px] w-full" style={{ borderBottom: "1px solid rgba(101,106,118,0.1)" }}>
        <div className="flex items-center gap-2 px-4 flex-1">
          <ChevronRight /><PlusGreen /><TerraformIcon />
          <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>module.datadog_integration_aws.aws_iam_role_policy.dd_integration</span>
          <button className="flex items-center justify-center p-2 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa" }}><CopyIcon /></button>
        </div>
      </div>
      {/* Resource 2 */}
      <div className="flex items-center h-[44px] w-full" style={{ borderBottom: "1px solid rgba(101,106,118,0.1)" }}>
        <div className="flex items-center gap-2 px-4 flex-1">
          <ChevronRight /><PlusGreen /><TerraformIcon />
          <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>module.consul.integration</span>
          <button className="flex items-center justify-center p-2 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa" }}><CopyIcon /></button>
        </div>
      </div>
      {/* Outputs */}
      <div className="flex items-center w-full" style={{ height: "36px", backgroundColor: "#fafafa", borderBottom: "1px solid rgba(101,106,118,0.1)" }}>
        <div className="flex items-center gap-2 px-4">
          <ChevronRight />
          <span style={{ fontSize: "14px", fontWeight: 590, color: "#656a76" }}>Outputs</span>
          <span style={{ fontSize: "14px", color: "#8c909c" }}>1 planned to change</span>
        </div>
      </div>
      {/* Plan footer */}
      <div className="flex items-center justify-between w-full px-4" style={{ height: "60px", borderBottom: "1px solid rgba(101,106,118,0.1)" }}>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa", color: "#3b3d45", fontSize: "13px", fontWeight: 510 }}>
          <DownloadSentinelIcon />Download Sentinel mocks
        </button>
        <div className="flex items-center gap-2">
          <InfoIcon />
          <span style={{ fontSize: "13px", color: "#656a76" }}>
            {"Sentinel mocks can be used for "}
            <span style={{ color: "#1060ff" }}>testing your Sentinel policies</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Phase card wrapper ────────────────────────────────────────────────────────

function PhaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] overflow-hidden w-full bg-white" style={{ boxShadow: "0px 0px 0px 1px rgba(101,106,118,0.15),0px 2px 3px 0px rgba(101,106,118,0.1),0px 8px 16px -10px rgba(101,106,118,0.2)" }}>
      {children}
    </div>
  );
}

// ── Run Details (collapsed) ───────────────────────────────────────────────────

function RunDetailsCard() {
  return (
    <PhaseCard>
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0"><ChevronDown /></div>
        <div className="flex items-center justify-between flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d={svgPaths.p47bde00} fill="#656A76" /></svg>
            <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>Run Details</span>
          </div>
          <div className="flex items-center gap-3">
            <ImageWithFallback src={imgUser} alt="devSecOpsGuru" style={{ width: 20, height: 20, borderRadius: "2px", objectFit: "cover", flexShrink: 0 }} />
            <span style={{ fontSize: "14px", color: "#3b3d45" }}>
              <span style={{ fontWeight: 600 }}>devSecOpsGuru</span>{" triggered a run from GitHub"}
            </span>
          </div>
        </div>
      </div>
    </PhaseCard>
  );
}

// ── Plan Finished (expanded) ──────────────────────────────────────────────────

function PlanFinishedCard() {
  return (
    <PhaseCard>
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0"><ChevronUp /></div>
        <div className="flex items-center justify-between flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <CheckCircleGreen />
            <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>Plan finished</span>
          </div>
          <span style={{ fontSize: "14px", color: "#3b3d45" }}>
            <span style={{ fontWeight: 590 }}>Resources: 2</span>{" to add, "}
            <span style={{ fontWeight: 590 }}>0</span>{" to change, "}
            <span style={{ fontWeight: 590, color: "#c00005" }}>1</span>
            <span style={{ color: "#c00005" }}>{" to destroy"}</span>
          </span>
        </div>
      </div>
      <div className="px-3 pb-3">
        <PlanContent />
      </div>
    </PhaseCard>
  );
}

// ── Cost guardrail table rows ─────────────────────────────────────────────────

function GuardrailTableHeader() {
  return (
    <div className="flex items-center w-full" style={{ height: "48px", backgroundColor: "#f1f2f3", borderTop: "1px solid rgba(101,106,118,0.2)", borderBottom: "1px solid rgba(101,106,118,0.2)" }}>
      <div className="flex-1 px-4"><span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Cost guardrail name</span></div>
      <div className="flex-1 flex justify-end px-4"><span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Max allowed limit</span></div>
      <div className="flex-1 flex justify-end px-4"><span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Status</span></div>
      <div className="flex-1 flex justify-end px-4"><span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Enforcement</span></div>
    </div>
  );
}

function GuardrailRow({ name, limit, status, enforcement }: { name: string; limit: string; status: "passed" | "failed"; enforcement: "advisory" | "gated" }) {
  return (
    <div className="flex items-center w-full bg-white" style={{ height: "48px", borderBottom: "1px solid rgba(101,106,118,0.2)" }}>
      <div className="flex-1 px-4"><span style={{ fontSize: "14px", color: "#3b3d45" }}>{name}</span></div>
      <div className="flex-1 flex justify-end px-4"><span style={{ fontSize: "14px", color: "#3b3d45" }}>{limit}</span></div>
      <div className="flex-1 flex justify-end px-4">
        <span className="px-1.5 py-0.5 rounded-[5px] text-xs font-medium" style={{ backgroundColor: status === "passed" ? "#cceeda" : "#fbd4d4", color: status === "passed" ? "#006619" : "#940004", fontSize: "13px" }}>
          {status === "passed" ? "Passed" : "Failed"}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-end gap-2 px-4">
        {enforcement === "advisory" ? <AdvisoryIcon /> : <XCircleRedSmall />}
        <span style={{ fontSize: "14px", color: "#3b3d45" }}>{enforcement === "advisory" ? "Advisory" : "Gated"}</span>
      </div>
    </div>
  );
}

// ── Cost Estimation table ─────────────────────────────────────────────────────

function CostTableHeader() {
  return (
    <div className="flex items-center w-full" style={{ height: "48px", backgroundColor: "#f1f2f3", borderTop: "1px solid rgba(101,106,118,0.2)", borderBottom: "1px solid rgba(101,106,118,0.2)" }}>
      <div style={{ width: "520px" }} className="px-4 flex items-center gap-2">
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Resource path</span>
        <svg width="13.4977" height="16" viewBox="0 0 13.4977 16" fill="none"><path d={svgPaths.p3621d400} fill="#656A76" /></svg>
      </div>
      <div className="flex-1 flex items-center justify-end px-4 gap-2">
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Final cost</span>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d={svgPaths.p21137000} fill="#1060FF" /></svg>
      </div>
      <div className="flex-1 flex items-center justify-end px-4 gap-2">
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#0c0c0e" }}>Cost impact</span>
        <svg width="13.5" height="16" viewBox="0 0 13.5 16" fill="none">
          <path d={svgPaths.p30fef300} fill="#656A76" />
          <path d={svgPaths.p27f1de00} fill="#656A76" />
        </svg>
      </div>
    </div>
  );
}

function CostRow({ path, finalCost, impact, isChild = false, bg = "white" }: { path: string; finalCost: string; impact: string; isChild?: boolean; bg?: string }) {
  return (
    <div className="flex items-center w-full" style={{ height: "48px", backgroundColor: bg, borderBottom: "1px solid rgba(101,106,118,0.2)" }}>
      <div className="flex items-center gap-2 px-4" style={{ width: "520px", paddingLeft: isChild ? "48px" : "16px" }}>
        {!isChild && (
          <button className="w-6 h-6 flex items-center justify-center rounded-[5px]">
            <svg width="9.99819" height="5.9989" viewBox="0 0 9.99819 5.9989" fill="none"><path d={svgPaths.pc74f780} fill="#656A76" /></svg>
          </button>
        )}
        <span style={{ fontSize: isChild ? "14px" : "13px", fontFamily: isChild ? "inherit" : "monospace", color: "#3b3d45" }}>{path}</span>
      </div>
      <div className="flex-1 flex justify-end px-4"><span style={{ fontSize: "14px", color: "#3b3d45" }}>{finalCost}</span></div>
      <div className="flex-1 flex items-center justify-end gap-2 px-4">
        <PlusRed />
        <span style={{ fontSize: "14px", color: "#3b3d45" }}>{impact}</span>
      </div>
    </div>
  );
}

// ── Explore in Signal button ──────────────────────────────────────────────────

function ExploreInOperatorButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 flex-shrink-0"
      style={{
        backgroundImage: "linear-gradient(-68deg, rgb(253,223,247) 0%, rgb(255,255,255) 20%, rgb(255,255,255) 70%, rgb(192,182,255) 120%)",
        border: "1px solid #6060ff",
        borderRadius: "6px",
        padding: "3px 7px",
        height: "22px",
        cursor: "pointer",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2.83333 12.0417L7.08333 7.79167L2.83333 3.54167" stroke="#8D4EFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        <path d="M8.5 13.4583H14.1667" stroke="#8D4EFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      </svg>
      <span style={{ fontSize: "13px", fontWeight: 500, color: "#8d4eff", whiteSpace: "nowrap", lineHeight: "16px" }}>Explore in Signal</span>
    </button>
  );
}

// ── IBM Cloudability Failed (expanded) ────────────────────────────────────────

function IBMCloudabilityCard({ onOpenOpTriage }: { onOpenOpTriage?: (opId: string) => void }) {
  return (
    <PhaseCard>
      {/* Header toggle */}
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0"><ChevronUp /></div>
        <div className="flex items-center justify-between flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <XCircleRed />
            <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>IBM Cloudability failed</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "14px", color: "#3b3d45" }}>
              Monthly cost will change to <span style={{ fontWeight: 600 }}>$171.53</span>/month
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d={svgPaths.p30748100} fill="#00781E" /></svg>
            <ChevronUp />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {/* Governance note */}
        <p style={{ fontSize: "13px", color: "#3b3d45" }}>
          <span style={{ fontWeight: 500 }}>IBM Cloudability Governance: Running </span>
          <span style={{ color: "#656a76" }}>3 days ago  {">"}</span>
          <span style={{ fontWeight: 500 }}> Passed </span>
          <span style={{ color: "#656a76" }}>3 days ago</span>
        </p>

        {/* Tabs */}
        <div className="flex items-end" style={{ borderBottom: "1px solid rgba(101,106,118,0.2)" }}>
          <div className="flex flex-col items-center">
            <div className="px-3 pt-1.5 pb-1"><span style={{ fontSize: "14px", color: "#1060ff", fontWeight: 500 }}>Cost estimation</span></div>
            <div style={{ height: "3px", backgroundColor: "#1060ff", borderRadius: "3px", width: "100%" }} />
          </div>
          <div className="px-3 py-1.5 flex items-center gap-1.5">
            <span style={{ fontSize: "14px", color: "#3b3d45" }}>Policy failures</span>
            <span className="px-2 py-px rounded-[10px]" style={{ border: "1px solid #656a76", fontSize: "13px", color: "#3b3d45" }}>3</span>
          </div>
          <div className="px-3 py-1.5"><span style={{ fontSize: "14px", color: "#3b3d45" }}>Resource recommendation</span></div>
        </div>

        {/* Cost guardrail accordion */}
        <div className="rounded-[6px] overflow-hidden" style={{ boxShadow: "0px 0px 0px 1px rgba(101,106,118,0.15),0px 2px 3px 0px rgba(101,106,118,0.1),0px 8px 16px -10px rgba(101,106,118,0.2)" }}>
          {/* Guardrail toggle */}
          <div className="flex items-center gap-2 px-2 py-2" style={{ backgroundColor: "white" }}>
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="7.5" height="4.5" viewBox="0 0 7.5 4.5" fill="none"><path clipRule="evenodd" d={svgPaths.p6eabd00} fill="#3B3D45" fillRule="evenodd" /></svg>
            </div>
            <div className="flex items-center justify-between flex-1">
              <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>Cost guardrail</span>
              <div className="flex items-center gap-2">
                <ExploreInOperatorButton onClick={() => onOpenOpTriage?.("ibm-cloudability-failed")} />
                <span className="px-1.5 py-0.5 rounded-[5px] text-xs" style={{ backgroundColor: "#fbd4d4", color: "#940004", fontSize: "13px", fontWeight: 500 }}>Failed</span>
              </div>
            </div>
          </div>
          {/* Guardrail table */}
          <GuardrailTableHeader />
          <GuardrailRow name="Cost guardrail 1" limit="$200" status="passed" enforcement="advisory" />
          <GuardrailRow name="Cost guardrail 2" limit="$588" status="failed" enforcement="gated" />
        </div>

        {/* Filters + search bar */}
        <div className="rounded-tl-[6px] rounded-tr-[6px] w-full" style={{ backgroundColor: "#fafafa", border: "1px solid rgba(101,106,118,0.2)" }}>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center p-2 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa" }}>
                <svg width="10.3148" height="10.5" viewBox="0 0 10.3148 10.5" fill="none">
                  <path d={svgPaths.p1d53a900} fill="#3B3D45" />
                  <path d={svgPaths.p19558400} fill="#3B3D45" />
                  <path d={svgPaths.p1dd72b00} fill="#3B3D45" />
                  <path d={svgPaths.p376bf000} fill="#3B3D45" />
                  <path d={svgPaths.p3ec41420} fill="#3B3D45" />
                  <path d={svgPaths.p3a539d00} fill="#3B3D45" />
                  <path d={svgPaths.pe0cb100} fill="#3B3D45" />
                </svg>
              </button>
              <button className="flex items-center justify-between px-3 py-2 rounded-[5px]" style={{ border: "1px solid rgba(59,61,69,0.4)", backgroundColor: "#fafafa", width: "97px" }}>
                <div className="flex items-center gap-1">
                  <svg width="10.5" height="7.125" viewBox="0 0 10.5 7.125" fill="none"><path d={svgPaths.p95eda80} fill="#3B3D45" /></svg>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#3b3d45" }}>Filters</span>
                </div>
                <svg width="7.49835" height="4.4988" viewBox="0 0 7.49835 4.4988" fill="none"><path d={svgPaths.p3c798b00} fill="#3B3D45" /></svg>
              </button>
              <div className="flex items-center gap-2 px-2 rounded-[5px]" style={{ width: "320px", height: "28px", border: "1px solid #8c909c", backgroundColor: "white", boxShadow: "inset 0px 1px 2px 1px rgba(101,106,118,0.1)" }}>
                <svg width="14.0624" height="14.0624" viewBox="0 0 14.0624 14.0624" fill="none"><path d={svgPaths.p7c7e900} fill="#656A76" /></svg>
                <span style={{ fontSize: "14px", color: "#656a76" }}>Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost estimation table */}
        <div className="w-full overflow-x-auto">
          <CostTableHeader />
          <CostRow path="module.rds.aws_db_instance.main[0]" finalCost="$943.5" impact="$43.51" />
          <CostRow path="Some other description" finalCost="$943.5" impact="$43.51" isChild bg="#fafafa" />
          <CostRow path="gp2_description" finalCost="$3.5" impact="$12.51" isChild bg="#fafafa" />
          <CostRow path="module.rds.aws_db_instance.main[4]" finalCost="$943.5" impact="$43.51" />
          <CostRow path="Some other description" finalCost="$43.5" impact="$43.51" isChild bg="#fafafa" />
          <CostRow path="module.rds.aws_db_instance.main[3]" finalCost="$943.5" impact="$43.51" />
        </div>

        {/* Footer */}
        <p style={{ fontSize: "13px", color: "#3b3d45" }}>Total resources: 25; Supported: 11, Unsupported: 3, No cost: 11</p>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={svgPaths.pefdc600} fill="#00781E" />
            <path clipRule="evenodd" d={svgPaths.p39bccd80} fill="#00781E" fillRule="evenodd" />
          </svg>
          <p style={{ fontSize: "13px", color: "#3b3d45" }}>
            {"Custom pricing used. "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Learn more</span>
          </p>
        </div>
      </div>
    </PhaseCard>
  );
}

// ── Apply Will Not Run ────────────────────────────────────────────────────────

function ApplyWillNotRunCard() {
  return (
    <PhaseCard>
      <div className="flex items-center gap-3 px-3 py-3" style={{ paddingLeft: "33px" }}>
        <div className="flex items-center gap-3">
          <svg width="9" height="1.5" viewBox="0 0 9 1.5" fill="none">
            <path d="M8.25 0C8.66421 0 9 0.335786 9 0.75C9 1.16421 8.66421 1.5 8.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.25Z" fill="#8D8D8D" />
          </svg>
          <span style={{ fontSize: "14px", fontWeight: 590, color: "#3b3d45" }}>Apply will not run</span>
        </div>
      </div>
    </PhaseCard>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function RunDetailsView({ onBack, runId, onOpenOpTriage }: RunDetailsViewProps) {
  return (
    <div className="flex-1 min-w-0 overflow-y-auto px-8 py-5 flex flex-col gap-5" style={{ backgroundColor: "#ffffff" }}>
      <Breadcrumb runId={runId} onBack={onBack} />
      <WorkspaceHeader />
      <RunTitleRow />
      <RunSummary />
      <div className="flex flex-col gap-4 w-full">
        <RunDetailsCard />
        <PlanFinishedCard />
        <IBMCloudabilityCard onOpenOpTriage={onOpenOpTriage} />
        <ApplyWillNotRunCard />
      </div>
    </div>
  );
}
