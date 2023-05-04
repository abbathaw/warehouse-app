import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { IArticle } from '../../types';

interface IViewArticle {
  article: IArticle;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ViewArticle = ({ article, handleDelete, handleEdit }: IViewArticle) => {
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
        <FontAwesomeIcon className="action-icon" icon={faTrashCan} onClick={handleDelete} title="Delete item" />
      </div>
      <div className="extra-info-row"></div>
    </div>
  );
};

export default ViewArticle;
