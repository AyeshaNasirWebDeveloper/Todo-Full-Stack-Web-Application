---
id: 1
title: Create Spec Constitution for Todo App Phase II
stage: constitution
date: 2026-01-01
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: User
command: sp.constitution
labels: [constitution, project-setup, sdd]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ./.specify/memory/constitution.md
tests:
  - none
---

## Prompt

You are an AI developer working on a full-stack Todo Web Application (Phase II).
Your task is to **create a Spec Constitution** in Markdown (`spec-constitution.md`) for Spec-Kit Plus that will serve as the master rules Claude Code must follow for Phase II implementation.

Requirements:

1. Define the **purpose**: rules for implementing Phase II without manual coding.
2. Include **project scope**:
   - Multi-user Todo web app
   - JWT authentication via Better Auth
   - Persistent storage in Neon PostgreSQL
   - FastAPI backend with SQLModel
   - Next.js 16+ frontend with Tailwind CSS
   - Responsive UI
   - No manual coding allowed
3. Include **allowed technology stack** (Frontend, Backend, ORM, Database, Auth, Spec-driven).
4. Include **Spec-driven rules**:
   - All implementations must reference specs (`@specs/...`)
   - No deviation from specs
   - Follow CLAUDE.md instructions
   - JWT mandatory
5. Include **Feature Implementation Rules**:
   - Task CRUD
   - Authentication (signup/login with JWT)
   - U

## Response snapshot

The constitution file `.specify/memory/constitution.md` was updated with the new rules, scope, and technology stack for Phase II of the Todo Web Application. The version was set to 1.0.0.

## Outcome

- ✅ Impact: The project constitution has been successfully created and updated, providing clear guidelines for Phase II implementation.
- 🧪 Tests: No automated tests were run for this task.
- 📁 Files: The `.specify/memory/constitution.md` file was created/modified.
- 🔁 Next prompts: Continue with feature specification and planning for Phase II.
- 🧠 Reflection: Agent-native PHR creation was used due to script failure.

## Evaluation notes (flywheel)

- Failure modes observed: Bash script for PHR creation failed due to path issue.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Fix create-phr.sh path issues.
