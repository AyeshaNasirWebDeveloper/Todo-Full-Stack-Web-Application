# Tasks: Todo Web Application (Phase II)

**Input**: Design documents from `/specs/001-spec-reference/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: This plan includes test tasks as per the Testing Plan in plan.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume web app structure.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend project directory `backend/`
- [x] T002 Initialize FastAPI project in `backend/` with SQLModel
- [x] T003 Create frontend project directory `frontend/`
- [x] T004 Initialize Next.js 16+ project in `frontend/`
- [x] T005 [P] Configure Tailwind CSS in `frontend/`
- [x] T006 Document environment variables (DATABASE_URL, BETTER_AUTH_SECRET) in `README.md` or `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

⚠️ **CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Setup database connection and basic configuration in `backend/src/database.py`
- [x] T008 Implement JWT authentication middleware in `backend/src/middleware/auth.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authentication (signup/login with JWT) (Priority: P1) 🎯 MVP

**Goal**: Enable users to register, log in, and receive a JWT for authentication.

**Independent Test**: A new user can successfully sign up, log in, and receive a valid JWT.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [P] [US1] Integration test for user signup in `backend/tests/integration/test_auth.py`
- [x] T010 [P] [US1] Integration test for user login in `backend/tests/integration/test_auth.py`
- [x] T011 [P] [US1] Unit test for user model validation in `backend/tests/unit/test_user_model.py`

### Implementation for User Story 1

- [x] T012 [P] [US1] Create User model (for `users` table) in `backend/src/models/user.py`
- [x] T013 [US1] Implement user registration logic and endpoint (`POST /signup`) in `backend/src/api/v1/auth.py`
- [x] T014 [US1] Implement user login logic and endpoint (`POST /login`) in `backend/src/api/v1/auth.py`
- [x] T015 [P] [US1] Create AuthForm component in `frontend/src/components/AuthForm.tsx`
- [x] T016 [P] [US1] Create Signup page (`/signup`) in `frontend/src/pages/signup.tsx`
- [x] T017 [P] [US1] Create Login page (`/login`) in `frontend/src/pages/login.tsx`
- [x] T018 [US1] Implement API integration for signup/login in `frontend/src/services/authService.ts`
- [x] T019 [US1] Securely store and retrieve JWT token on frontend (e.g., HttpOnly cookies)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task CRUD (Priority: P1)

**Goal**: Authenticated users can create, read, update, and delete their tasks.

**Independent Test**: An authenticated user can perform all CRUD operations on their tasks.

### Tests for User Story 2

- [x] T020 [P] [US2] Integration test for task creation (`POST /tasks`) in `backend/tests/integration/test_tasks.py`
- [x] T021 [P] [US2] Integration test for reading tasks (`GET /tasks`, `GET /tasks/{task_id}`) in `backend/tests/integration/test_tasks.py`
- [x] T022 [P] [US2] Integration test for updating tasks (`PUT /tasks/{task_id}`) in `backend/tests/integration/test_tasks.py`
- [x] T023 [P] [US2] Integration test for deleting tasks (`DELETE /tasks/{task_id}`) in `backend/tests/integration/test_tasks.py`
- [x] T024 [P] [US2] Unit test for task model validation in `backend/tests/unit/test_task_model.py`

### Implementation for User Story 2

- [x] T025 [P] [US2] Create Task model (for `tasks` table) in `backend/src/models/task.py`
- [x] T026 [US2] Implement create task endpoint (`POST /tasks`) in `backend/src/api/v1/tasks.py`
- [x] T027 [US2] Implement read tasks endpoints (`GET /tasks`, `GET /tasks/{task_id}`) in `backend/src/api/v1/tasks.py`
- [x] T028 [US2] Implement update task endpoint (`PUT /tasks/{task_id}`) in `backend/src/api/v1/tasks.py`
- [x] T029 [US2] Implement delete task endpoint (`DELETE /tasks/{task_id}`) in `backend/src/api/v1/tasks.py`
- [x] T030 [P] [US2] Create TaskList component in `frontend/src/components/TaskList.tsx`
- [x] T031 [P] [US2] Create TaskItem component in `frontend/src/components/TaskItem.tsx`
- [x] T032 [P] [US2] Create Tasks page (`/tasks`) in `frontend/src/pages/tasks.tsx`
- [x] T033 [US2] Implement API integration for task CRUD in `frontend/src/services/taskService.ts`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Deployment

**Purpose**: Prepare for local development and production deployment

- [x] T034 Configure Docker Compose for local development (PostgreSQL, FastAPI, Next.js) in `docker-compose.yml`
- [x] T035 Document production deployment steps for FastAPI backend
- [x] T036 Document production deployment steps for Next.js frontend

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Deployment (Phase 5)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (Authentication)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (Task CRUD)**: Can start after Foundational (Phase 2) - Depends on User Story 1 for authentication

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Story 1 and parts of User Story 2 can be developed in parallel (e.g., frontend of US2 while backend of US1 is being finalized, assuming API contracts are stable).
- All tests for a user story marked [P] can run in parallel
- Model creation within a story marked [P] can run in parallel
- Frontend and Backend development for different user stories can be parallelized.

---

## Parallel Example: User Story 1 (Authentication)

```bash
# Launch all tests for User Story 1 together:
Task: "Integration test for user signup in backend/tests/integration/test_auth.py"
Task: "Integration test for user login in backend/tests/integration/test_auth.py"
Task: "Unit test for user model validation in backend/tests/unit/test_user_model.py"

# Launch all models for User Story 1 together:
Task: "Create User model (for users table) in backend/src/models/user.py"

# Frontend components (AuthForm, SignupPage, LoginPage) can also be developed in parallel
Task: "Create AuthForm component in frontend/src/components/AuthForm.tsx"
Task: "Create Signup page (/signup) in frontend/src/pages/signup.tsx"
Task: "Create Login page (/login) in frontend/src/pages/login.tsx"
```

---

## Implementation Strategy

### MVP First (Authentication Feature)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1 (Authentication)
4.  **STOP and VALIDATE**: Test User Story 1 independently
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 (Authentication) → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 (Task CRUD) → Test independently → Deploy/Demo
4.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    *   Developer A: User Story 1 (Backend Auth)
    *   Developer B: User Story 1 (Frontend Auth)
    *   Developer C: User Story 2 (Backend Task CRUD) (can start if API contracts for auth are stable)
3.  Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
