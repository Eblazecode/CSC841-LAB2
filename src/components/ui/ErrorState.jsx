export default function ErrorState({ message, onRetry }) {
  return <div className="state-panel error-panel" role="alert"><strong>We could not complete that request.</strong><span>{message}</span>{onRetry && <button className="text-button" onClick={onRetry}>Try again</button>}</div>;
}
