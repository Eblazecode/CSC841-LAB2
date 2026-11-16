// A small service boundary. Replace mockApi imports with fetch-based HTTP calls
// when a real backend is available. UI components should not know transport details.
export {
  getCurrentStudent,
  getStudentById,
  getCourses,
  getRegistrations,
  submitRegistration
} from "./mockApi";
