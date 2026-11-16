import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/", "Overview"],
  ["/students/me", "My profile"],
  ["/courses", "Course catalogue"],
  ["/registration", "Registration"]
];

export default function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">C</div>
        <div className="brand-copy">
          <strong>CampusDesk</strong>
          <span>Student Services</span>
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="nav-dot" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="avatar">AD</span>
          <div><strong>Ada Daniel</strong><small>Student account</small></div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div><span className="eyebrow">UNIVERSITY PORTAL</span><strong>Academic workspace</strong></div>
          <span className="semester-pill">2026 / 2027 · First Semester</span>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="footer">CSC 841 · Week 2 laboratory prototype · Fictional sample data</footer>
      </main>
    </div>
  );
}
