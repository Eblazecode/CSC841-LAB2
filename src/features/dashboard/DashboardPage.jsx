import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";

const metrics = [
  ["Registered units", "6", "Across 2 courses"],
  ["Current level", "400", "Undergraduate"],
  ["Academic status", "Active", "2026 / 2027"]
];

export default function DashboardPage() {
  return <>
    <PageHeader eyebrow="STUDENT OVERVIEW" title="Good morning, Ada." description="Your academic workspace at a glance." />
    <div className="metric-grid">
      {metrics.map(([label, value, note]) => <Card key={label} className="metric-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></Card>)}
    </div>
    <div className="content-grid">
      <Card>
        <div className="card-heading"><div><span className="eyebrow">QUICK ACCESS</span><h2>Continue your work</h2></div><StatusBadge>Portal ready</StatusBadge></div>
        <div className="quick-links">
          <Link to="/courses"><span className="quick-icon">01</span><span><strong>Explore courses</strong><small>Review the course catalogue</small></span><b>→</b></Link>
          <Link to="/registration"><span className="quick-icon">02</span><span><strong>Course registration</strong><small>Submit your course selection</small></span><b>→</b></Link>
          <Link to="/students/me"><span className="quick-icon">03</span><span><strong>View profile</strong><small>Check your student information</small></span><b>→</b></Link>
        </div>
      </Card>
      <Card className="notice-card">
        <span className="eyebrow">IMPORTANT</span><h2>Registration reminder</h2>
        <p>Review course availability and confirm your selection before submitting. This demonstration uses fictional records.</p>
        <StatusBadge tone="amber">Sample notice</StatusBadge>
      </Card>
    </div>
  </>;
}
