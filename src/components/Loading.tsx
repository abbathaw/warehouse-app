import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Loading = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} className="spinner" /> Loading
    </div>
  );
};

export default Loading;
