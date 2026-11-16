import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { getStudentById } from "../../services/apiClient";

export default function StudentDetailPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true); setError(""); setStudent(null);
    getStudentById(studentId)
      .then(data => { if (active) setStudent(data); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [studentId]);

  return <>
    <PageHeader eyebrow="STUDENT DIRECTORY" title="Student record" description={`Parameterized route: /students/${studentId}`} />
    {loading && <LoadingState />}
    {error && <ErrorState message={error} />}
    {student && <Card><h2>{student.fullName}</h2><p>{student.programme} · Level {student.level}</p><p>{student.email}</p></Card>}
    <p><Link className="inline-link" to="/students/me">Return to my profile →</Link></p>
  </>;
}
