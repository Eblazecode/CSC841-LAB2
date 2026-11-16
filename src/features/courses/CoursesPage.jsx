import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import CourseCard from "./CourseCard";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { getCourses, getRegistrations } from "../../services/apiClient";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const [courseData, registrationData] = await Promise.all([getCourses(), getRegistrations()]);
      setCourses(courseData); setRegistered(registrationData.map(x => x.code));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => courses.filter(course =>
    `${course.code} ${course.title} ${course.lecturer}`.toLowerCase().includes(query.toLowerCase())
  ), [courses, query]);

  function toggleCourse(course) {
    setSelected(current => current.includes(course.code)
      ? current.filter(code => code !== course.code)
      : [...current, course.code]);
  }

  return <>
    <PageHeader eyebrow="ACADEMIC CATALOGUE" title="Course catalogue" description="Browse available courses and select items for registration." />
    <div className="toolbar"><label className="search-label" htmlFor="course-search">Search courses</label><input id="course-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by code, title or lecturer…" /><span className="selection-count">{selected.length} selected</span></div>
    {loading && <LoadingState label="Loading course catalogue…" />}
    {error && <ErrorState message={error} onRetry={load} />}
    {!loading && !error && filtered.length === 0 && <EmptyState title="No matching courses" message="Try another course code, title or lecturer." />}
    {!loading && !error && <div className="course-grid">{filtered.map(course =>
      <CourseCard key={course.code} course={course} selected={selected.includes(course.code)} alreadyRegistered={registered.includes(course.code)} onSelect={toggleCourse} />
    )}</div>}
    {selected.length > 0 && <div className="selection-note">Selected: {selected.join(", ")}. Continue to Registration to submit your choices.</div>}
  </>;
}
