import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const ErrorLoading = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faCircleExclamation} /> Failed to load. Please try again.
    </div>
  );
};

export default ErrorLoading;
