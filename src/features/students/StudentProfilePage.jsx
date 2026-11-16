import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { getCurrentStudent } from "../../services/apiClient";

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (signal) => {
    setLoading(true); setError("");
    try { setStudent(await getCurrentStudent({ signal })); }
    catch (err) { if (err.name !== "AbortError") setError(err.message); }
    finally { if (!signal?.aborted) setLoading(false); }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return <>
    <PageHeader eyebrow="STUDENT RECORD" title="My profile" description="Profile information retrieved through the service layer." />
    {loading && <LoadingState label="Retrieving student profile…" />}
    {error && <ErrorState message={error} onRetry={() => load()} />}
    {student && !loading && <Card className="profile-card">
      <div className="profile-top"><div className="profile-avatar">AD</div><div><h2>{student.fullName}</h2><p>{student.id}</p></div><StatusBadge>{student.status}</StatusBadge></div>
      <div className="detail-grid">
        <div><small>Email address</small><strong>{student.email}</strong></div>
        <div><small>Programme</small><strong>{student.programme}</strong></div>
        <div><small>Level</small><strong>{student.level}</strong></div>
        <div><small>Faculty</small><strong>{student.faculty}</strong></div>
      </div>
    </Card>}
  </>;
}
