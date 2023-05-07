import CreateEditForm from './CreateEditForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery.tsx';
import { editSale, getSale, SALES_QUERY_KEY } from '../../api/sales';
import useEditMutation from '../../hooks/useEditMutation.tsx';
import { ISaleEditInput, ISaleInput } from '../../types';
import Loading from '../Loading.tsx';
import { toast } from 'react-toastify';

const EditSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetQuery({
    id: id || '',
    queryKey: SALES_QUERY_KEY,
    queryFn: getSale,
  });

  const { editMutation, apiError } = useEditMutation<ISaleEditInput>({
    queryKey: SALES_QUERY_KEY,
    mutationFn: editSale,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>Failed to load sale</div>;
  }

  const handleSubmit = (data: ISaleInput | ISaleEditInput) => {
    const submitData = data as ISaleEditInput;
    editMutation.mutate(submitData, {
      onSuccess: () => {
        toast.success(`Sale updated`);
        navigate('/sales');
      },
      onError: () => {
        toast.error(`Failed to update Sale`);
      },
    });
  };

  return (
    <CreateEditForm apiError={apiError} handleSubmit={handleSubmit} isSubmitting={editMutation.isLoading} sale={data} />
  );
};

export default EditSale;
