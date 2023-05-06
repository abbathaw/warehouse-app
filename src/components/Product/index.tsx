import { IProduct } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProductArticleDetail from './ProductArticleDetail.tsx';
import { useNavigate } from 'react-router-dom';
import useDeleteMutation from '../../hooks/useDeleteMutation.tsx';
import { toast } from 'react-toastify';
import { deleteProduct, PRODUCTS_QUERY_KEY } from '../../api/products';

interface IProductComponent {
  product: IProduct;
}
const Product = ({ product }: IProductComponent) => {
  const navigate = useNavigate();

  const { deleteMutation } = useDeleteMutation({
    queryKey: PRODUCTS_QUERY_KEY,
    mutationFn: deleteProduct,
    onErrorCallback: () => {
      toast.error(`${product.name} could not be deleted`);
    },
    onSuccessCallback: () => {
      toast.success(`${product.name} Deleted`);
    },
  });

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };
  const handleDelete = () => {
    deleteMutation.mutate(product);
  };
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
