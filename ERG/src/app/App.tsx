import { useState, useEffect } from "react";
import { TFCWorkspaceView } from "./components/TFCWorkspaceView";
import { ControlCenter } from "./components/ControlCenter";
import { Workbench } from "./components/Workbench";

/* MARKER-MAKE-KIT-INVOKED */

export type PageContext = "overview" | "runs" | "runDetail";
export type DockMode = "bottom" | "right";
const SIDE_PANEL_W = 420;

export default function App() {
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [workbenchVisible, setWorkbenchVisible] = useState(false);
  const [workbenchQuery, setWorkbenchQuery] = useState<string | undefined>(undefined);
  const [pendingQuery, setPendingQuery] = useState<string | undefined>(undefined);
  const [pendingOpTriage, setPendingOpTriage] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<PageContext>("overview");
  const [dockMode, setDockMode] = useState<DockMode>("bottom");
  const [stepActive, setStepActive] = useState(false); // mirrors whether a step is open in ControlCenter

  function openWorkbench(query?: string) {
    setWorkbenchQuery(query);
    setWorkbenchOpen(true);
    // Defer to next frame so the initial translateY renders before we animate in
    requestAnimationFrame(() => requestAnimationFrame(() => setWorkbenchVisible(true)));
  }

  function closeWorkbench() {
    setWorkbenchVisible(false);
    // Wait for slide-out to finish before unmounting
    setTimeout(() => {
      setWorkbenchOpen(false);
      setWorkbenchQuery(undefined);
    }, 760);
  }

  const sideOpen = dockMode === "right" && stepActive && !workbenchOpen;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        className="flex-1 min-h-0"
        style={{
          paddingBottom: dockMode === "bottom" ? "72px" : 0,
          transition: "padding-bottom 0.4s cubic-bezier(0.25,0.8,0.25,1)",
        }}
      >
        <TFCWorkspaceView
          page={page}
          onPageChange={setPage}
          onControlCenterTrigger={(q) => setPendingQuery(q)}
          onOpenOpTriage={(opId) => setPendingOpTriage(opId)}
          rightInset={sideOpen ? SIDE_PANEL_W : 0}
        />
      </div>

      {/* Always mounted so activeOp/activeStep survive workbench open/close */}
      <div style={{ display: workbenchOpen ? "none" : "block" }}>
        <ControlCenter
          initialQuery={pendingQuery}
          onQueryHandled={() => setPendingQuery(undefined)}
          openOpTriage={pendingOpTriage}
          onOpenOpTriageHandled={() => setPendingOpTriage(undefined)}
          onOpenWorkbench={openWorkbench}
          pageContext={page}
          dockMode={dockMode}
          onDockChange={setDockMode}
          onStepActiveChange={setStepActive}
        />
      </div>

      {workbenchOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            transform: workbenchVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.75s cubic-bezier(0.22, 0.9, 0.36, 1)",
            willChange: "transform",
          }}
        >
          <Workbench
            onClose={closeWorkbench}
            initialQuery={workbenchQuery}
            pageContext={page}
          />
        </div>
      )}
    </div>
  );
}
