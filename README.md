# OAuth Launchpad
## 🚀 Live Demo

**Try OAuth Launchpad:** https://oauthreadyguide26.ai.studio

> Generate an OAuth setup guide for any provider, review evidence and approval requirements, and share the generated guide using a persistent URL.

OAuth Launchpad is an **Integration Readiness & Setup Intelligence** experience built for the Composio Associate Product Manager take-home assignment.

It helps developers understand what is required to configure OAuth integrations before they start implementation — including setup steps, developer effort, approval requirements, potential blockers, and the work that can be handled by an agent versus a human.

## Problem

OAuth setup varies significantly between providers. Developers often need to navigate scattered documentation, developer consoles, approval processes, scopes, redirect URI requirements, and security reviews before an integration can be launched.

OAuth Launchpad turns this fragmented process into a structured, actionable setup guide.

## What the Product Does

The experience provides:

- Ready-to-use OAuth guides for selected providers such as Gmail, Slack, and Notion.
- Live guide generation for providers outside the curated library.
- Step-by-step OAuth setup checklists.
- Estimated developer effort and approval waiting time.
- Common blockers and setup considerations.
- Developer vs. Agent responsibility guidance.
- Evidence and confidence indicators for generated claims.
- Shareable URLs for generated OAuth guides.
- Markdown/JIRA export support.

## Live Research Flow

A developer can enter an application or provider name such as HubSpot, Zoom, Trello, or another OAuth provider.

OAuth Launchpad generates a structured integration guide and presents:

1. OAuth setup requirements.
2. Authentication flow guidance.
3. Estimated hands-on development effort.
4. Approval and marketplace considerations.
5. Common implementation blockers.
6. Human vs. agent responsibilities.
7. Evidence and source information.

Generated guides are persisted server-side so their shareable guide URLs can be reopened in a fresh browser session.

## Evidence Model

To avoid presenting uncertain information as fact, OAuth Launchpad uses four evidence states:

- **VERIFIED** — directly supported by authoritative documentation.
- **ESTIMATE** — planning guidance, not a provider guarantee.
- **CONDITIONAL** — depends on scopes, app type, user type, distribution model, or provider policy.
- **UNVERIFIED** — could not be confidently confirmed from an authoritative source.

Provider requirements can change, so estimates should be treated as planning guidance rather than provider guarantees.

## Curated Examples

The prototype includes curated guides for integrations including:

- Gmail / Google Workspace
- Slack
- Notion

The experience also demonstrates generation of guides for additional providers such as HubSpot, Trello, and Zoom.

## Shareable Guides

Generated guides use stable URLs such as:

`#/guide/hubspot`

The generated guide is persisted by the server and can be retrieved when the URL is opened in a fresh browser session.

## Architecture

The prototype uses:

- React + TypeScript
- Vite
- Node.js server
- Gemini-powered guide generation
- Local client caching
- Server-side persistence for generated guides

The frontend renders curated and generated OAuth guides, while the backend handles research requests and persistence.

## What Was Tested

The prototype was tested for:

- Curated guide navigation.
- Live generation for providers outside the initial curated library.
- Evidence and confidence presentation.
- Opening generated guides through shareable URLs in a fresh browser tab.
- Server retrieval of persisted generated guides.
- Production build and TypeScript compilation.

Example generated providers tested include **HubSpot** and **Zoom**.

## Limitations

- Provider requirements and approval processes can change over time.
- Generated information should be validated against current official provider documentation before production implementation.
- Development hours and approval timelines are estimates rather than provider guarantees.
- This prototype demonstrates a small set of integrations rather than the complete proposed 100-provider guide library.
- No real OAuth credentials or secrets are stored in the repository.

## Run Locally

### Prerequisites

- Node.js
- npm
- Gemini API key

### Installation

Install dependencies:

`npm install`

Configure the required environment variable using `.env.local`.

Then start the application:

`npm run dev`

## Product Vision

The long-term vision is a searchable library of 100+ OAuth providers combined with an AI research agent capable of investigating unfamiliar integrations and turning provider documentation into actionable implementation guidance.

Instead of developers manually figuring out OAuth setup from scattered documentation, OAuth Launchpad provides a clear route from:

**Provider → Requirements → Setup → Approval → Launch Readiness**

---

Built as part of the **Composio Associate Product Manager — Integrations Take-Home Assignment**.
