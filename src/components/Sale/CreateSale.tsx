import { useNavigate } from 'react-router-dom';
import useCreateMutation from '../../hooks/useCreateMutation.tsx';
import { ISaleEditInput, ISaleInput } from '../../types';
import { toast } from 'react-toastify';
import CreateEditForm from './CreateEditForm.tsx';
import { createSale, SALES_QUERY_KEY } from '../../api/sales';

const CreateSale = () => {
  const navigate = useNavigate();
  const { createMutation, apiError } = useCreateMutation<ISaleInput>({
    queryKey: SALES_QUERY_KEY,
    mutationFn: createSale,
  });

  const handleSubmit = (data: ISaleInput | ISaleEditInput) => {
    const dataInput = data as ISaleInput;
    createMutation.mutate(dataInput, {
      onSuccess: () => {
        toast.success('New Sale added');
        navigate('/sales');
      },
      onError: () => {
        toast.error('Failed to create new sale');
      },
    });
  };

  return <CreateEditForm apiError={apiError} handleSubmit={handleSubmit} isSubmitting={createMutation.isLoading} />;
};

export default CreateSale;
