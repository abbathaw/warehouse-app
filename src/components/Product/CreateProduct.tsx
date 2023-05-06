import CreateEditForm from './CreateEditForm.tsx';
import useCreateMutation from '../../hooks/useCreateMutation.tsx';
import { IProduct, IProductInput } from '../../types';
import { createProduct, PRODUCTS_QUERY_KEY } from '../../api/products';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { createMutation, apiError } = useCreateMutation<Omit<IProduct, 'id'>>({
    queryKey: PRODUCTS_QUERY_KEY,
    mutationFn: createProduct,
  });

  const handleSubmit = (data: IProductInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('New product added');
        navigate('/products');
      },
      onError: () => {
        toast.error('Failed to create new product');
      },
    });
  };

  return <CreateEditForm apiError={apiError} handleSubmit={handleSubmit} isSubmitting={createMutation.isLoading} />;
};

export default CreateProduct;
