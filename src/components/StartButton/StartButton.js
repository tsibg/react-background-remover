import './StartButton.css';

function StartButton({ onClick, disabled, seconds }) {
  return (
    <button
      className="start-button"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="button-icon">
        <svg
          width="48"
          height="24"
          viewBox="0 0 24 24"
          fill="#ffffff"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-play"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </span>
      <span className="button-text">Start</span>
      <span className="button-caption">{seconds}s</span>
    </button>
  );
}
export default StartButton;
