import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { getCourses, getRegistrations, submitRegistration } from "../../services/apiClient";

export default function RegistrationPage() {
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function refresh() {
    setLoading(true); setError("");
    try {
      const [courseData, registrationData] = await Promise.all([getCourses(), getRegistrations()]);
      setCourses(courseData); setRegistrations(registrationData);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  const already = registrations.map(item => item.code);
  const selectable = courses.filter(course => course.available && !already.includes(course.code));
  const totalUnits = courses.filter(course => chosen.includes(course.code)).reduce((sum, course) => sum + course.units, 0);

  function toggle(code) {
    setChosen(current => current.includes(code) ? current.filter(x => x !== code) : [...current, code]);
    setError(""); setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); setSuccess("");
    if (!chosen.length) { setError("Select at least one available course before submitting."); return; }
    setSubmitting(true);
    try {
      const created = await submitRegistration(chosen);
      setRegistrations(current => [...current, ...created]);
      setSuccess(`${created.length} course registration(s) submitted successfully.`);
      setChosen([]);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  return <>
    <PageHeader eyebrow="REGISTRATION WORKFLOW" title="Course registration" description="Select available courses, review unit totals and submit your request." />
    {loading && <LoadingState label="Preparing registration data…" />}
    {error && <ErrorState message={error} />}
    {!loading && <>
      <div className="registration-layout">
        <Card>
          <div className="card-heading"><div><span className="eyebrow">STEP 1</span><h2>Available courses</h2></div><StatusBadge>{selectable.length} open</StatusBadge></div>
          {selectable.length === 0 ? <EmptyState title="No courses available" /> :
            <form onSubmit={handleSubmit}>
              <div className="choice-list">
                {selectable.map(course => <label className="choice-row" key={course.code}>
                  <input type="checkbox" checked={chosen.includes(course.code)} onChange={() => toggle(course.code)} />
                  <span><strong>{course.code} · {course.title}</strong><small>{course.units} units · {course.lecturer}</small></span>
                </label>)}
              </div>
              <div className="submit-row"><span>{chosen.length} courses · {totalUnits} units</span><Button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit registration"}</Button></div>
            </form>}
          {success && <p className="success-message" role="status">{success}</p>}
          {error && <p className="field-error" role="alert">{error}</p>}
        </Card>
        <Card>
          <span className="eyebrow">STEP 2</span><h2>Current registrations</h2>
          {registrations.length === 0 ? <EmptyState title="No registrations yet" /> :
            <div className="registered-list">{registrations.map(item => <div className="registered-row" key={item.id}><div><strong>{item.code}</strong><small>{item.title}</small></div><StatusBadge>{item.status}</StatusBadge></div>)}</div>}
          <p className="muted-note">This lab uses temporary in-memory sample data. Refreshing the browser resets submitted changes.</p>
        </Card>
      </div>
      <p className="form-footnote">Need to browse course details? <Link className="inline-link" to="/courses">Open the course catalogue →</Link></p>
    </>}
  </>;
}
