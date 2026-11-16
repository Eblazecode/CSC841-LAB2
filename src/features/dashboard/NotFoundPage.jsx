import { Link } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
export default function NotFoundPage() {
  return <><PageHeader eyebrow="404 · NOT FOUND" title="This page is unavailable" description="The route may have changed or the address may be incorrect." /><Card><Link className="inline-link" to="/">Return to dashboard →</Link></Card></>;
}
