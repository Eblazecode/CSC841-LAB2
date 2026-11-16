export default function EmptyState({ title = "Nothing to display", message = "There are no records to show yet." }) {
  return <div className="state-panel"><strong>{title}</strong><span>{message}</span></div>;
}
