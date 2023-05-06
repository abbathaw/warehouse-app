import { useNavigate, useParams } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery.tsx';
import { editProduct, getProduct, PRODUCTS_QUERY_KEY } from '../../api/products';
import Loading from '../Loading.tsx';
import CreateEditForm from './CreateEditForm.tsx';
import { IProduct, IProductInput } from '../../types';
import { toast } from 'react-toastify';
import useEditMutation from '../../hooks/useEditMutation.tsx';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetQuery({
    id: id || '',
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getProduct,
  });

  const { editMutation, apiError } = useEditMutation<IProduct>({
    queryKey: PRODUCTS_QUERY_KEY,
    mutationFn: editProduct,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>Failed to load product</div>;
  }

  const handleSubmit = (data: IProductInput | IProduct) => {
    const submitData = data as IProduct;
    editMutation.mutate(submitData, {
      onSuccess: () => {
        toast.success(`${submitData.name} updated`);
        navigate('/products');
      },
      onError: () => {
        toast.error(`Failed to update ${submitData.name}`);
      },
    });
  };

  return (
    <CreateEditForm
      apiError={apiError}
      handleSubmit={handleSubmit}
      isSubmitting={editMutation.isLoading}
      product={data}
    />
  );
};

export default EditProduct;
