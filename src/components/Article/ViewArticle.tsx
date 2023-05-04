import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IArticle } from '../../types';

interface IViewArticle {
  article: IArticle;
  handleEdit: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

const ViewArticle = ({ article, handleDelete, handleEdit, isDeleting }: IViewArticle) => {
  return (
    <div className="table-row">
      <div className="row-name-icon">
        <img
          alt="icon"
          src={`https://api.dicebear.com/6.x/initials/svg?size=32&radius=50&chars=1&backgroundColor=0051ba&seed=${article.name}`}
        />
        <div>{article.name}</div>
      </div>
      <div>{article.amountInStock}</div>
      <div className="action-icons">
        <FontAwesomeIcon className="action-icon" icon={faEdit} onClick={handleEdit} title="Edit item" />
        <FontAwesomeIcon
          className={`action-icon ${isDeleting && 'spinner'}`}
          icon={isDeleting ? faSpinner : faTrashCan}
          onClick={handleDelete}
          style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
          title="Delete item"
        />
      </div>
      <div className="extra-info-row"></div>
    </div>
  );
};

export default ViewArticle;
