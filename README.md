Preview in browser:
https://angekaplanchambers-ibm.github.io/Explorer-Resource-Graph/

Design Vision: Keep Explorer View's proven metadata-table foundation, then layer on conversational querying, AI-generated queries, and AI-driven relationship visualization that helps users understand dependencies, blast radius, and resource context. 

Summary 

Terraform Explorer Resource Graph is a strategic extension of Explorer that provides organization-wide infrastructure visibility through graph-based resource, dependency, provider, module and workspace relationships as well as conversation AI using natural language queries. The capability enables platform teams, cloud operators, security teams, and engineering organizations to answer infrastructure questions that are difficult or impossible to solve today without custom tooling or manual analysis. The goal is not to replace Explorer, but to extend Explorer from metadata visibility into infrastructure relationship visibility.   

 

Explorer Resource Graph focuses on delivering read-only infrastructure intelligence built on a scalable graph ingestion architecture, PostgreSQL-backed persistence model, dependency graph analysis engine, and conversational discovery experience. The initiative establishes the technical and operational foundations required for future graph visualization, governance insights, AI-assisted exploration, and infrastructure intelligence capabilities while remaining aligned with HCP Terraform and Terraform Enterprise deployment requirements.   

  

Explorer represents the system of record analytic cache for Terraform containing the necessary data to support a queryable semantic map of the infrastructure to be able to answer questions and the what if questions for humans and agents. The key is to have the full set Terraform state data, including the dependencies to enable this capability. 

 Product Vision 

Explorer answers: 

What Terraform assets exist? 

Explorer Resource Graph answers: 

How is my infrastructure connected? 

The long-term vision is to provide a unified infrastructure knowledge layer for Terraform that enables customers to explore resources, dependencies, providers, modules, workspaces, projects, and future governance constructs through both traditional UI experiences, Graph and natural-language interfaces. 

Explorer is the authoritative infrastructure relationship system for both HCP Terraform and Terraform Enterprise. Everything starts with high-quality actionable data organized in a way that enables powerful querying through both humans and agents.  

Explorer should operate as: 

"A structured operational data platform providing both tabular and graph intelligence across all Terraform-managed infrastructure." 

The platform must support: 

Human exploration 

API consumption 

Agentic experiences 

Analytics workloads 

Future platform intelligence services 

 

Background 

Terraform customers consistently ask operational questions that cannot be easily answered today: 

How many EC2 instances of a particular type exist across all workspaces? 

Which provider versions are currently deployed? 

What resources are dependent on a specific workspace? 

What is the blast radius of a planned change? 

Which resources and workspaces consume specific modules or providers? 

What depends on this resource?  

What depends on this module?  

What workloads reach this database?  

What breaks if I destroy this VPC?  

How are workspaces connected?  

Show the full transitive closure of this resource.  

Which teams are impacted?  

 

While Explorer provides visibility into Terraform metadata such as workspaces, projects, modules, and providers, customers increasingly require resource-level and relationship-level visibility across their Terraform estate. The Graph Catalog proof of concept demonstrated that Terraform state, plan, dependency, and provider data can be transformed into a centralized queryable graph capable of answering these questions while supporting future conversational experiences. 

Problem 

Platform operators lack a centralized mechanism for understanding infrastructure relationships and dependencies across large Terraform estates. 

As infrastructure scales, customers increasingly need: 

Cross-workspace inventory visibility 

Resource relationship mapping 

Dependency analysis 

Blast radius assessment 

Provider governance insights 

Conversational infrastructure discovery 

 

Today, customers rely on custom tooling, manual analysis, or ad hoc state processing to answer these questions. This creates operational overhead, inconsistent results, and limits Terraform's ability to serve as the authoritative source of infrastructure intelligence. 

 

 

Why Now? 

Several organizational and architectural developments make this possible now: 

Explorer already operates a PostgreSQL-based analytics datastore that both HCP Terraform and TFE customers understand and for TFE customers are willing to or have deployed to their TFE environments. 

Enhanced infrastructure visibility remains one of the most common Explorer enhancement requests. 

The Graph Catalog PoC validated graph ingestion and dependency modeling. 

Explorer requires a new high volume ETL data ingestion foundation to support Resource Visibility, Policy and future data sets to continuing adding significant value for our customers. Current limitations of the existing process include: 

Slow ingestion performance 

Workspace resource batching bottlenecks 

Out-of-memory risks during large updates 

Excessive asynchronous processing hops 

Limited contextual data availability 

Inability to support graph relationships 

Difficulty supporting future data domains 

Complexity scaling to enterprise deployments 

Graph based queries enable customers to answer operational and governance questions about their infrastructure. The graph becomes a way to understand dependencies, risk, ownership, and change impact across thousands of resources.  

Conversational AI is an enhancement to the overall data foundation to enable customers to have a natural language interface to query Explorer and display the results in either a tabular or graph way. This represents a vertical discovery process enabling the customer to initiate a horizontal process to solve the issue once discovered.  

Multiple teams are available to accelerate delivery.  

The Actions Team is now available to focus on the Graph UX and support building out the new data ingestion pipeline.  

The Terraform Partner Integration Team is now available to focus on developing natural language and advanced conversational query capabilities. 

 

These factors create an opportunity to deliver a foundational graph and conversational capability while minimizing infrastructure complexity and organizational duplication.   

 

 

 

Strategic Goals 

Goal 1: Infrastructure Discovery 

Allow customers to understand all infrastructure deployed across their Terraform estate. 

Capabilities: 

Resource inventory 

Provider inventory 

Module inventory 

Cross-workspace discovery 

Infrastructure ownership visibility 

Goal 2: Dependency Intelligence 

Provide visibility into infrastructure dependencies and downstream impacts before changes are introduced. 

Capabilities: 

Workspace dependencies 

Resource dependencies 

Module relationships 

Provider relationships 

Blast-radius analysis 

Goal 3: Conversational Infrastructure Exploration 

Allow infrastructure operators to ask natural-language questions and receive tabular and graph-backed answers. 

Capabilities: 

Discovery questions 

Inventory questions 

Dependency questions 

Governance questions 

Risk-analysis questions  

 

  

Personas 

Platform Administrator 

Responsible for managing Terraform infrastructure across the organization and understanding inventory, dependencies, and operational risk. 

Cloud Operations Team 

Needs visibility into infrastructure topology, consumption, and standards adoption. 

Security & Compliance Operator 

Requires infrastructure relationship visibility, provider governance insights, and policy impact assessment. 

FinOps Operator 

Needs infrastructure inventory and ownership visibility for reporting and cost attribution. 

Engineering Teams 

Need dependency visibility and blast radius analysis before introducing changes.  

Jobs To Be Done 

When I need to understand my Terraform estate, I want to query resources and relationships across all workspaces so that I can understand what infrastructure exists and where. 

When I plan a change, I want to understand downstream dependencies and blast radius so that I can assess risk before deployment. 

When I investigate provider adoption, I want to understand provider utilization across all workspaces so that I can manage upgrades and governance. 

When I need infrastructure insights, I want to ask conversational questions using natural language so that I can quickly find answers without creating custom reports and save those resulting queries for review or periodic API downloads. 

Measure of Success (Objective | Metric)

Infrastructure visibility adoption: 50%+ eligible organizations 

Conversational query adoption: 25%+ beta organizations 

Dependency discovery adoption: 40%+ active organizations 

Enterprise scale validation: Successful operation at target scale 

Backfill success rate: (more than)99% successful completion 

Authorization correctness: Zero known permission leakage incidents 

 
Phases and Requirements 

Explorer Resource Graph: Infrastructure Visibility Foundations 

Goal 

Establish a scalable graph ingestion and persistence architecture that enables infrastructure visibility, dependency analysis, blast radius assessment, and conversational discovery while leveraging existing Explorer infrastructure.  

Requirement 1: Dedicated ETL Pipeline Migration 

Description 

Migrate graph ingestion and resource processing from Rails-centric workflows into dedicated services optimized for high-volume Terraform artifact processing and Explorer persistence. 

Acceptance Criteria 

Dedicated ingestion services process Terraform state and plan data 

Enterprise-scale synchronization is supported 

Sensitive values are obfuscated before persistence, using the redactor routine.  

Large workspace ingestion strategies support staged processing. 

High-throughput ingestion 

Enterprise-scale workloads 

Near real-time updates 

Future extensibility for additional data sets (e.g. Policy data) 

Optimized for 

PostgreSQL-based storage 

Tabular query experiences 

Graph query experiences 

Atlas remains responsible for authentication and authorization 

 

 

Requirement 2: Shared Data Ingestion Foundation 

Description 

TF Visibility and TF Actions teams establish a common transport mechanism between terraform-state-parser and Explorer storage systems. 

Acceptance Criteria 

Shared ingestion contracts are defined. 

Graph-compatible resource data is published. 

Plan-derived dependency data is available. 

Single-source resource schemas exist where practical. 

Requirement 3: Graph Persistence, Queries & Explorer Architecture 

Description 

TF Actions team owns graph persistence schema definition, relationship modeling, and graph-query efficiency while leveraging PostgreSQL and existing Explorer data and database. 

Acceptance Criteria 

Resource relationships persisted. 

Workspace dependency edges are modeled. 

Dependency traversal meets defined performance targets. 

Blast-radius analysis is supported. 

What Terraform State Is Not  

State files themselves are not actually graph structures. Simply storing state is insufficient for producing rich cloud relationship maps. 

What Terraform Graphs Require  

To construct meaningful relationship graphs, systems must combine:  

State data  

Configuration relationships  

Dependency information Terraform generates during planning  

 

Explorer Resource Graph Considerations 

Explorer must become the authoritative query layer for Terraform operational intelligence while maintaining PostgreSQL as the underlying persistence model and avoiding introduction of specialized graph databases for the following reasons: 

It must work on premise 

It must be supportable by our on premise customers without increasing overhead, costs or requiring specialized skills.  

It must be the authoritative layer that integrates well with the existing Explorer database architecture.  

Based on the Proof of Concept from Chris Arcand, Postgres (plus graph capabilities) appears to meet these requirements. The team should confirm the overall performance capabilities of Postgres before considering the use of a specialized Graph database.
 
 

Requirement 4: Conversational Query Experience 

Description 

TF Partner Integrations team owns natural-language graph exploration capabilities delivered as a reusable service independent of any specific UI surface. For more detailed information on this topic, please refer to the following PRD: [PRD] [TF-2048]: Context-Aware Conversational Experience (Foundational Capabilities).  

Acceptance Criteria 

Natural-language infrastructure discovery is supported. 

Responses leverage graph and tabular data views. 

Inventory, dependency, and blast radius queries are supported. 

Failed-run awareness is incorporated. 

Capability remains UI-agnostic. 

 

Initial Questions Supported Examples 

How many EC2 instances exist across my organization? 

Which workspaces use AWS provider version 5.x? 

What resources depend on workspace X? 

What is the blast radius of workspace Y? 

Show resources using module Z. 

 

Approach 

Conversational AI represents a natural language query interface on top of Explorer to allow the user’s ability to find a particular issue. 

Once the user has found the issue, this query result can now be saved and run again from the saved queries page and/or through the API. It also represents the starting point for a horizontal process to fix the issue across the set of types like workspaces where that issue is found. 

 

Considerations 

Explorer is available in all the tiers so we will need a cost-effective approach and commercial model. This could be a Granite LLM and/or allowing the customer to use their tokens as a pass-through.  

We should consider whether a SLM domain specific could work to provide what is needed at much lower cost. 

Do we allow bi-directional processing that a saved query, could begin the AI conversation?  