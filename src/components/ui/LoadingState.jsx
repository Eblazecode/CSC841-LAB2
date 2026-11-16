export default function LoadingState({ label = "Loading information…" }) {
  return <div className="state-panel" role="status"><span className="spinner" />{label}</div>;
}
