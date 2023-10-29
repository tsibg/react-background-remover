import './StartButton.css';
import { ReactComponent as IconStart } from '../../assets/IconStart.svg';
function StartButton({ onClick, disabled, seconds }) {
  return (
    <button
      className="start-button"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="button-icon">
        <IconStart />
      </span>
      <span className="button-text">Start</span>
      <span className="button-caption">{seconds}s</span>
    </button>
  );
}
export default StartButton;
