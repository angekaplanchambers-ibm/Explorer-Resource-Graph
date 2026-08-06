Terraform Control Center MVP
## Author: Gabrielle Azurdia
## A Practical Agentic Foundation for Terraform Cloud
## Purpose
This document defines the MVP for Terraform Control Center: a simple, attainable first release that makes Terraform Cloud feel more intelligent, contextual, and action-oriented.
The goal is not to define the full future of agentic Terraform. The goal is to establish a clear pattern teams can understand, build toward, and extend over time:
Control Bar → Default / Macro View → Fully-Expanded View / Workbench
The control bar is the persistent entry point. When opened, it expands into the default / macro view: a fixed-height panel above the current Terraform Cloud page that keeps the underlying UI visible. From there, users can move into the fully-expanded view / workbench when they need more space and focus for deeper investigation or workflow preparation.
Each state maps to a familiar product pattern, but the UX makes it Terraform-native: structured, contextual, and grounded in user control.
## MVP Mechanism
The MVP can be understood as three simple moves:
Entry → Visibility → Depth
(Help users see what matters, understand what’s happening, and move deeper when needed.)
The control bar provides entry from anywhere in Terraform Cloud.
The default / macro view provides visibility into what matters.
The fully-expanded workbench provides depth when users need to investigate, refine, verify, or prepare work.
This is the core pattern teams should build toward. The MVP does not need to solve every agentic workflow. It needs to establish the right foundation for how users begin, orient, and move deeper.
## Product Thesis
Terraform Control Center MVP is an intelligent control surface for Terraform Cloud.
It should make Terraform feel more aware of the user’s environment without implying that Terraform is independently making infrastructure decisions. The system should help users search, inspect, summarize, compare, prepare, and move toward action while earning trust through clarity rather than personality.
The experience should not present itself as an AI assistant, chatbot, or autonomous infrastructure operator. It should feel like a Terraform-native control surface: useful, technical, and safe by default.
A successful MVP should feel modest in capability but strong in interaction quality.
# 1. Control Bar
## Role
The control bar is the lowest-friction entry point into Terraform Control Center. It should be anchored to the bottom of the Terraform Cloud UI: subtle enough to avoid competing with the main product experience, but visible and engageable enough that users can access it whenever they need to search, inspect, or prepare work.
At its simplest, this is a chat-like entry point. But the presentation should not feel like chat. It should feel like a precise technical control that belongs inside Terraform.
## MVP Behavior
The control bar should support lightweight intent entry, search across relevant Terraform Cloud objects, opening the default / macro view, and resuming recent work. Users should be able to use natural language, but the experience should translate that intent into structured Terraform results, actions, and pathways.
A strong placeholder might be:
Search, inspect, or prepare infrastructure changes.
The system should use operational language such as “Checking latest run state,” “Reviewing policy results,” or “Inspecting drift.” It should avoid human-like language such as “How can I help?” or “I found this for you.”
The control bar should be the first signal that this experience is not a generic chatbot. It is a Terraform control.
# 2. Default / Macro View
## Role
The default / macro view is the first expanded state of Terraform Control Center. When a user opens or engages with the control bar, this is the surface they see by default.
It should open as a fixed-height panel above the current Terraform Cloud page, giving users more room to inspect signals and action pathways while keeping the underlying UI visible. It is not a full-screen takeover. It is a compact workspace for visibility, orientation, and guided progression.
This view should help users understand what is happening across their Terraform estate and identify what may deserve attention. The goal is not to consolidate every capability into one surface, but to create a more coherent entry point for visibility and action.
In plain terms:
The default / macro view is the opened Control Center experience for seeing what matters while staying grounded in the current Terraform Cloud UI.
## MVP Behavior
For MVP, the default / macro view should surface a focused set of estate-level signals, such as failed runs, policy failures, drift, pending approvals, high-risk plans, provider upgrade opportunities, or incomplete configuration. The first release should start with a smaller set of high-confidence signals, then expand as the experience matures.
Where feasible, the view could also reflect the user’s current product context. If opened from a workspace, run, project, or organization view, it could use that starting point to make the experience feel more immediately relevant.
The view should be valuable at both levels:
General estate visibility when broader orientation is needed.
Current-context awareness when the product has enough signal to provide it.
## Action Pathways
The default / macro view should connect visible signals to practical next moves. These action pathways should be specific, operational, and grounded in the Terraform environment.
Examples could include:
- Inspect failed runs
- Review policy failures
- Investigate drift
- Surface pending approvals
- Open workbench
- Resume recent work
- Compare current and proposed state
This is where the experience can feel meaningfully intelligent without requiring advanced autonomy. A well-timed, relevant pathway can do more for user trust than a broad conversational agent that claims it can do anything.
## Who It Serves
The default / macro view should support users with different levels of Terraform and AI maturity. Some users may use it to orient, search, and navigate. Others may use it to understand estate health and prioritize issues. More advanced users may use it as a launch point into the workbench.
# 3. Fully-Expanded View / Workbench
## Role
The fully-expanded view is the deeper MVP surface for users who need more control, space, and focus than the default / macro view can provide.
Users can move into this level from the default / macro view when a signal, action pathway, or workflow requires deeper investigation. Unlike the default / macro view, this mode is a full-screen takeover intended for more immersive working.
In plain terms:
The workbench is a full-screen structured space for going deep on Terraform workflows.
It is not yet a full orchestration engine, a replacement for Terraform Cloud, or a fully autonomous operator. For MVP, it should provide a deeper workspace where users can inspect, refine, compare, verify, and prepare with more context and space.
## MVP Behavior
The workbench should target a small number of key workflows where users need more structure than the default / macro view can provide. These workflows should be selected based on customer pain points, technical feasibility, and the value of a more immersive surface.
Examples could include failed run investigation, policy failure review, drift inspection, or provider upgrade assessment. In each case, the workbench should help users understand relevant Terraform objects, inspect supporting details, compare information where needed, and prepare a path forward.
The MVP workbench should prioritize depth over breadth. It should establish the pattern for focused, Terraform-native workflows before expanding into a wider set of scenarios.
## Workbench Shape
The workbench should be structured around Terraform objects, task context, and user intent. Rather than presenting a static page or generic chat thread, the space should adapt based on what the user is trying to understand or accomplish.
A user should be able to articulate what they want — through natural language, filtering, selection, or refinement — and the workbench should shift the view to support that need. The goal is not to send users through disconnected product pages, but to assemble the right working view for the task.
Verification should be central to the experience. As results, summaries, or recommendations are generated, users should be able to inspect the source data, understand which Terraform objects are involved, and confirm that outputs are grounded in real product state.
The input area should remain available for refinement, but it should not dominate the experience. The main value should come from the adaptive work surface: a structured, inspectable view that changes based on user intent while preserving control, context, and confidence.
## Who It Serves
The workbench should support users who need more depth than the default / macro view can provide.
Some users may use it for guided investigation, such as understanding a failed run or reviewing a policy failure. More advanced users may use it as a focused environment for deeper workflows: searching across objects, comparing results, reviewing logs, preparing next steps, or packaging findings.
# MVP Summary
Terraform Control Center MVP is a simple, shippable agentic foundation for Terraform Cloud.
It has three parts:
- Control bar: a subtle, bottom-anchored, intelligent entry point across Terraform Cloud.
- Default / macro view: a fixed-height visibility layer that opens above the current Terraform Cloud page, surfaces what matters, and guides users toward deeper action while keeping the underlying UI visible.
- Fully-expanded view / workbench: a full-screen structured space for investigation, search, verification, and workflow preparation.
Together, these create the first credible version of Terraform Control Center:
A practical agentic UX foundation that helps users see, understand, and act — without pretending the product is more autonomous than it is.
The point is to release a simple, strong, repeatable pattern that teams can build, users can understand, and the product can grow from.
Appendix
# MVP Interaction Principles
## Use System-State Language
The system should communicate state, not personality.
Prefer:
3 failed runs detected
Avoid:
I found 3 failed runs for you
The experience should build trust by sounding like Terraform, not like a person pretending to operate Terraform.
## Keep Users Oriented
Users should always understand where they started, what context is being used, what object they are looking at, and what action is being suggested.
This is especially important as users move from the control bar into the default / macro view and then into the fully-expanded workbench.
## Show Structure Before Prose
The MVP should not rely too heavily on generated paragraphs. Structured results should do most of the work: cards, tables, logs, diffs, object references, and action pathways.
Prose can clarify, but it should not become the main interface.
## Keep Actions Bounded
For MVP, the clearest actions are inspect, search, summarize, compare, prepare, resume, export, and route.
Execution, autonomy, and complex multi-step automation should be treated carefully.
## Make Intelligence Practical
The system does not need to feel magical. It needs to be useful.
A relevant signal, a clear explanation, or a well-placed next move is enough to make the experience feel meaningfully more intelligent.
# What the MVP Should Prove
The MVP should prove that Terraform Cloud can support a practical agentic foundation without requiring a full product transformation on day one.
It should show that users understand the control bar as a Terraform-native entry point, that the default / macro view helps them see what matters, and that the workbench gives users somewhere useful to go deeper.
Most importantly, it should prove that the three-level model is understandable across teams:
Control bar for entry.
Default / macro view for visibility.
Workbench for depth.
The MVP should also prove that teams can extend the pattern without inventing new agentic UI each time.
