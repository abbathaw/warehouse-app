import { ISale } from '../../types';
import { useNavigate } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery.tsx';
import { getProduct, PRODUCTS_QUERY_KEY } from '../../api/products';
import useDeleteMutation from '../../hooks/useDeleteMutation.tsx';
import { toast } from 'react-toastify';
import { deleteSale, SALES_QUERY_KEY } from '../../api/sales';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/formats.ts';

interface ISaleComponent {
  sale: ISale;
}

const Sale = ({ sale }: ISaleComponent) => {
  const navigate = useNavigate();
  const { data: productData } = useGetQuery({ id: sale.productId, queryKey: PRODUCTS_QUERY_KEY, queryFn: getProduct });

  const { deleteMutation } = useDeleteMutation({
    queryKey: SALES_QUERY_KEY,
    mutationFn: deleteSale,
    onErrorCallback: () => {
      toast.error(`Sale could not be deleted`);
    },
    onSuccessCallback: () => {
      toast.success(`Sale Deleted`);
    },
  });

  const handleEdit = () => {
    navigate(`/sales/edit/${sale.id}`);
  };
  const handleDelete = () => {
    deleteMutation.mutate(sale);
  };
  const isDeleting = deleteMutation.isLoading;

  return (
    <div className="table-row">
      <div className="row-name-icon">
        <img
          alt="icon"
          src={`https://api.dicebear.com/6.x/icons/svg?size=32&radius=50&chars=1&backgroundColor=0051ba&icon=coin`}
        />
        <div>{formatDate(sale.createdAt)}</div>
      </div>
      <div>
        <div className="container">
          <div> {productData?.name}</div>
          <div className="label">
            <span>Amount sold: {sale.amountSold} </span>{' '}
          </div>
        </div>
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

export default Sale;
