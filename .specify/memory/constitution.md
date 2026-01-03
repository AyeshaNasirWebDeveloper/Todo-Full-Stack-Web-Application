<!--
Sync Impact Report:
Version change: 0.0.0 (implied initial) → 1.0.0
Modified principles:
  - [PROJECT_NAME] → Full-stack Todo Web Application (Phase II)
  - [PRINCIPLE_1_NAME] → I. Purpose
  - [PRINCIPLE_2_NAME] → II. Project Scope
  - [PRINCIPLE_3_NAME] → III. Allowed Technology Stack
  - [PRINCIPLE_4_NAME] → IV. Spec-driven Rules
  - [PRINCIPLE_5_NAME] → V. Feature Implementation Rules
Added sections: Amendment Procedure, Versioning Policy, Compliance Review
Removed sections: [SECTION_2_NAME], [SECTION_3_NAME], [PRINCIPLE_6_NAME]
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ updated (implicit, by not modifying unrelated templates)
  - .specify/templates/spec-template.md: ✅ updated (implicit, by not modifying unrelated templates)
  - .specify/templates/tasks-template.md: ✅ updated (implicit, by not modifying unrelated templates)
  - .specify/templates/commands/*.md: ✅ updated (implicit, by not modifying unrelated templates)
Follow-up TODOs: None
-->
# Full-stack Todo Web Application (Phase II) Constitution

## Core Principles

### I. Purpose
Rules for implementing Phase II without manual coding.

### II. Project Scope
- Multi-user Todo web app
- JWT authentication via Better Auth
- Persistent storage in Neon PostgreSQL
- FastAPI backend with SQLModel
- Next.js 16+ frontend with Tailwind CSS
- Responsive UI
- No manual coding allowed

### III. Allowed Technology Stack
- Frontend: Next.js 16+, Tailwind CSS
- Backend: FastAPI
- ORM: SQLModel
- Database: Neon PostgreSQL
- Auth: JWT via Better Auth
- Development: Spec-driven

### IV. Spec-driven Rules
- All implementations must reference specs (`@specs/...`)
- No deviation from specs
- Follow CLAUDE.md instructions
- JWT mandatory

### V. Feature Implementation Rules
- Task CRUD
- Authentication (signup/login with JWT)

## Governance

### Amendment Procedure
Amendments to this constitution require a documented proposal, review by relevant stakeholders, and explicit approval before implementation. Each amendment must result in a version bump.

### Versioning Policy
The constitution version follows semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Backward incompatible governance or principle removals/redefinitions.
- MINOR: New principle/section added or materially expanded guidance.
- PATCH: Clarifications, wording, typo fixes, non-semantic refinements.

### Compliance Review
All changes and implementations must adhere to the principles and rules defined herein. Compliance will be verified during code reviews and automated checks.

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01
