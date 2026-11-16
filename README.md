# CSC 841 — Week 2 Illustrative Laboratory Project
## CampusDesk: University Student Services SPA

A teaching project for **Advanced SPA Architecture and Component-Based Front-End Engineering**. It demonstrates the Week 2 topics using React, React Router and a mock asynchronous service layer.

> This is an instructional front-end prototype. It does not implement production authentication, authorization, secure persistence or a real university backend.

## 1. Learning objectives

By completing this project, students should be able to:

- Explain the SPA shell, route resolution and component tree.
- Build reusable components using composition and explicit props.
- Demonstrate parent-to-child props and child-to-parent callbacks.
- Manage local and feature-level state.
- Use effects and cleanup for asynchronous work.
- Implement nested and parameterized routes.
- Organize code by application, shared components, features and services.
- Build accessible forms with client-side validation.
- Handle loading, empty, success and error states.
- Integrate a front end with an asynchronous API abstraction.

## 2. Requirements

- Node.js 18 or later (Node.js 20 LTS recommended)
- npm 9 or later
- VS Code or another JavaScript IDE
- Modern browser

## 3. Installation and execution

```bash
# 1. Extract the ZIP and open the project folder
cd CSC841_Week2_Student_Services_SPA

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Create a production build
npm run build

# 5. Preview the production build
npm run preview
```

Vite normally serves the application at `http://localhost:5173`.

## 4. Application features

| Route | Purpose | Week 2 concepts |
|---|---|---|
| `/` | Dashboard | SPA shell, composition, shared layout |
| `/students/me` | Student profile | API service, loading/error states |
| `/courses` | Course catalogue | Reusable cards, filtering, state |
| `/registration` | Course registration | Forms, validation, callbacks |
| `/students/:studentId` | Parameterized student detail | Route parameters |
| `*` | Not found | Fallback routing |

The mock data represents a fictional university. The service layer simulates network delay and returns Promises so that loading and error states can be studied.

## 5. Project structure

```text
src/
  app/
    App.jsx
    router.jsx
  components/
    layout/
      AppLayout.jsx
      Sidebar.jsx
    ui/
      Button.jsx
      Card.jsx
      StatusBadge.jsx
      LoadingState.jsx
      ErrorState.jsx
      EmptyState.jsx
  features/
    dashboard/
      DashboardPage.jsx
    students/
      StudentProfilePage.jsx
      StudentDetailPage.jsx
    courses/
      CoursesPage.jsx
      CourseCard.jsx
    registration/
      RegistrationPage.jsx
  services/
    apiClient.js
    mockApi.js
  styles/
    global.css
  main.jsx
```

## 6. Architecture overview

```text
Browser
  |
  v
React SPA
  |-- React Router
  |     |-- Dashboard
  |     |-- Student Profile
  |     |-- Course Catalogue
  |     |-- Registration
  |     `-- Student Detail (:studentId)
  |
  |-- Shared Components
  |     |-- Layout / Sidebar
  |     |-- Card / Button / Badge
  |     `-- Loading / Error / Empty states
  |
  |-- Feature Components + State
  |
  `-- API Client
        |
        v
     Mock asynchronous service
        |
        v
     In-memory sample data
```

## 7. Guided laboratory sequence

### Lab 2.1 — Project setup and architecture skeleton
1. Install dependencies and run the application.
2. Inspect `src/app/router.jsx` and `src/app/App.jsx`.
3. Identify the application shell, router, page components and service boundary.
4. Add a new route called `/announcements`.
5. Create an `AnnouncementsPage.jsx` feature page and link it in the sidebar.

**Evidence:** screenshot of the running app, route table and a short explanation of the folder structure.

### Lab 2.2 — Reusable component construction
1. Inspect `Button`, `Card`, `StatusBadge` and `CourseCard`.
2. Add a reusable `PageHeader` component accepting `title`, `description` and optional `actions`.
3. Use it on at least two pages.
4. Add a `variant` prop to `StatusBadge`.
5. Test keyboard focus and visible button states.

**Evidence:** component usage examples and explanation of each component's props.

### Lab 2.3 — Component communication and lifecycle
1. Inspect `CoursesPage` and `CourseCard`.
2. Trace how a course object is passed to the child through props.
3. Trace how `onSelect` sends a child event to the parent.
4. Inspect the `useEffect` data-loading pattern in `StudentProfilePage`.
5. Add an effect cleanup using `AbortController` or an equivalent cancellation strategy.

**Evidence:** a parent-child data-flow diagram and a brief lifecycle explanation.

### Lab 2.4 — Routing and layout
1. Add a nested route under the application layout.
2. Add a parameterized route `/announcements/:announcementId`.
3. Add a not-found route and test an invalid URL.
4. Test browser Back and Forward.
5. Refresh a nested route and note the server fallback requirement for deployment.

**Evidence:** route table and screenshots of direct navigation and fallback behaviour.

### Lab 2.5 — Forms and error handling
1. Inspect the registration form.
2. Add validation that prevents duplicate course codes.
3. Add a clear form-level error summary.
4. Simulate a rejected API request and display a useful error.
5. Preserve entered selections after a recoverable error.
6. Add a submitting state to prevent repeated submissions.

**Evidence:** screenshots of invalid, submitting, success and error states.

### Lab 2.6 — Backend API integration
1. Inspect `services/apiClient.js` and `services/mockApi.js`.
2. Add a service method to retrieve a course by code.
3. Add a page or panel that calls this method.
4. Handle loading, empty, success and failure states.
5. Document how the mock service could be replaced by a Django REST API.

**Evidence:** service contract, request/response example and integration-state screenshots.

## 8. Assignment

### Build an enhanced Student Services SPA

Extend the project with these requirements:

1. Add an Announcements feature with list and detail routes.
2. Add a reusable search input and filter the course catalogue.
3. Add a profile-edit form with field-level validation.
4. Add at least two new reusable UI components.
5. Add one new API service method and use it in a page.
6. Demonstrate a loading state, empty state and recoverable error state.
7. Add a route-level error boundary or a clear page-level error recovery strategy.
8. Make the application responsive and keyboard accessible.
9. Submit an architecture diagram, component hierarchy and route table.

### Suggested assessment rubric

| Criterion | Weight |
|---|---:|
| Architecture and modularity | 15% |
| Component design and reuse | 20% |
| Routing and navigation | 10% |
| State and lifecycle | 15% |
| Forms and error handling | 15% |
| API integration | 10% |
| Documentation and defence | 10% |
| Usability and code quality | 5% |
| **Total** | **100%** |

## 9. API contract examples

The prototype uses a mock service, but its service boundary is designed around HTTP-style operations:

```text
GET    /api/students/me
GET    /api/students/:studentId
GET    /api/courses
GET    /api/registrations
POST   /api/registrations
```

Example course response:

```json
{
  "code": "CSC 841",
  "title": "Advanced Web Technologies",
  "units": 3,
  "level": "800",
  "semester": "First",
  "available": true
}
```

## 10. Important engineering notes

- Client-side validation is for usability; a real backend must validate again.
- A route guard is not authorization. The server must enforce access control.
- Never put privileged API secrets in a browser bundle.
- A real API may require CORS configuration when front end and backend use different origins.
- Production hosting must route valid SPA paths to `index.html`, while API paths must be handled by the backend.
- Replace the mock service with a real API only after agreeing endpoint contracts, authentication and error semantics.

## 11. Student submission checklist

- [ ] Project runs locally using the README instructions.
- [ ] All required routes work, including direct navigation.
- [ ] Components have clear responsibilities and documented props.
- [ ] State ownership and component communication can be explained.
- [ ] Forms are accessible and validation is demonstrated.
- [ ] Loading, empty, success and error states are handled.
- [ ] API contract and service integration are documented.
- [ ] Architecture diagram, route table and screenshots are included.
- [ ] Known limitations and future improvements are stated.
