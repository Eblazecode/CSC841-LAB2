const students = [
  { id: "STU-2026-0142", fullName: "Ada Daniel", email: "ada.daniel@example.edu", programme: "B.Sc. Computer Science", level: "400", faculty: "Computing and Applied Sciences", status: "Active" },
  { id: "STU-2026-0143", fullName: "Tunde Okafor", email: "tunde.okafor@example.edu", programme: "B.Sc. Information Systems", level: "300", faculty: "Computing and Applied Sciences", status: "Active" }
];

const courses = [
  { code: "CSC 841", title: "Advanced Web Technologies", units: 3, level: "800", semester: "First", available: true, lecturer: "Dr. M. Ibrahim" },
  { code: "CSC 842", title: "Distributed Systems Engineering", units: 3, level: "800", semester: "First", available: true, lecturer: "Prof. A. Okeke" },
  { code: "CSC 843", title: "Advanced Database Systems", units: 2, level: "800", semester: "First", available: true, lecturer: "Dr. R. Bello" },
  { code: "CSC 844", title: "Cloud-Native Application Design", units: 3, level: "800", semester: "First", available: false, lecturer: "Dr. E. James" },
  { code: "CSC 845", title: "Research Methods in Computing", units: 2, level: "800", semester: "First", available: true, lecturer: "Dr. S. Yusuf" }
];

let registrations = [
  { id: "REG-001", code: "CSC 841", title: "Advanced Web Technologies", units: 3, status: "Submitted" },
  { id: "REG-002", code: "CSC 842", title: "Distributed Systems Engineering", units: 3, status: "Submitted" }
];

const wait = (ms = 450) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCurrentStudent({ signal } = {}) {
  await wait();
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  return students[0];
}

export async function getStudentById(id) {
  await wait();
  const student = students.find(item => item.id === id);
  if (!student) {
    const error = new Error("No student record matches that identifier.");
    error.status = 404;
    throw error;
  }
  return student;
}

export async function getCourses() {
  await wait();
  return [...courses];
}

export async function getRegistrations() {
  await wait(350);
  return [...registrations];
}

export async function submitRegistration(courseCodes) {
  await wait(650);
  const selected = courses.filter(course => courseCodes.includes(course.code));
  if (selected.length !== courseCodes.length) throw new Error("One or more selected courses are unavailable.");
  const duplicates = selected.filter(course => registrations.some(reg => reg.code === course.code));
  if (duplicates.length) throw new Error(`Already registered: ${duplicates.map(x => x.code).join(", ")}`);
  const created = selected.map((course, index) => ({
    id: `REG-${Date.now()}-${index}`,
    code: course.code,
    title: course.title,
    units: course.units,
    status: "Submitted"
  }));
  registrations = [...registrations, ...created];
  return created;
}
