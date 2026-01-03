---
id: 2
title: Create Spec Reference File
stage: spec
date: 2026-01-01
surface: agent
model: claude-sonnet-4-5-20250929
feature: spec-reference
branch: 001-spec-reference
user: User
command: sp.specify
labels: [spec, project-setup, sdd]
links:
  spec: specs/001-spec-reference/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-spec-reference/spec.md
tests:
  - none
---

## Prompt

You are an AI developer working on a full-stack Todo Web Application (Phase II).
Your task is to **create a spec reference file** called `/sp.specify` that lists all specification files Claude Code must use as the single source of truth.

Include the following:

1. Spec Constitution: @specs/spec-constitution.md
2. Overview: @specs/overview.md
3. Architecture: @specs/architecture.md
4. Features:
   - Task CRUD: @specs/features/task-crud.md
   - Authentication: @specs/features/authentication.md
5. API Endpoints: @specs/api/rest-endpoints.md
6. Database Schema: @specs/database/schema.md
7. UI:
   - Components: @specs/ui/components.md
   - Pages: @specs/ui/pages.md

Output **only a Markdown table** with columns: Spec Name | Purpose | Path.
Do not write any code or implementation. This file will be the **central reference for all Claude Code tasks**.

## Response snapshot

The spec reference file `specs/001-spec-reference/spec.md` was created and populated with the requested Markdown table. The branch `001-spec-reference` was created and checked out.

## Outcome

- ✅ Impact: A central spec reference file has been created, establishing the single source of truth for all future Claude Code tasks in Phase II.
- 🧪 Tests: No automated tests were run for this task.
- 📁 Files: The `specs/001-spec-reference/spec.md` file was created and modified.
- 🔁 Next prompts: Proceed with creating the individual specification files listed in the reference.
- 🧠 Reflection: Encountered issues with PowerShell script execution due to JSON escaping; resorted to manual directory and file creation followed by programmatic content writing.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell script for feature creation failed due to JSON escaping, requiring manual steps.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve PowerShell script robustness for JSON parameter handling.
