import { IProduct } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProductArticleDetail from './ProductArticleDetail.tsx';

interface IProductComponent {
  product: IProduct;
}
const Product = ({ product }: IProductComponent) => {
  const handleEdit = () => {};
  const handleDelete = () => {};
  const isDeleting = false;
  return (
    <div className="table-row">
      <div className="row-name-icon">
        <img
          alt="icon"
          src={`https://api.dicebear.com/6.x/initials/svg?size=32&radius=50&chars=1&backgroundColor=0051ba&seed=${product.name}`}
        />
        <div>{product.name}</div>
      </div>
      <div>
        {product.articles.map((article) => (
          <ProductArticleDetail key={article.id} amount={article.amountRequired} articleId={article.id} />
        ))}
      </div>
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

export default Product;
