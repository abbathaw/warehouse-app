import CreateEditForm from './CreateEditForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery.tsx';
import { editSale, getSale, SALES_QUERY_KEY } from '../../api/sales';
import useEditMutation from '../../hooks/useEditMutation.tsx';
import { IArticle, IProduct, ISaleEditInput, ISaleInput } from '../../types';
import Loading from '../Loading.tsx';
import { toast } from 'react-toastify';
import { useUpdateInventoryMutation } from '../../hooks/useUpdateInventoryMutation.tsx';
import { calculateInventoryUpdates } from '../../utils/calculateInventoryUpdates.ts';
import { useQuery } from '@tanstack/react-query';
import { ARTICLES_QUERY_KEY, getArticles } from '../../api/articles';
import { AxiosError } from 'axios';

const EditSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: articlesList } = useQuery<IArticle[]>({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: async () => {
      const axiosResponse = await getArticles();
      return axiosResponse.data;
    },
  });
  const { updateInventory } = useUpdateInventoryMutation();
  const {
    data: originalSale,
    isLoading,
    isError,
  } = useGetQuery({
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

  const handleSubmit = ({
    data,
    productList,
  }: {
    data: ISaleInput | ISaleEditInput;
    productList: IProduct[] | undefined;
  }) => {
    const submitData = data as ISaleEditInput;
    const product = productList?.find((item) => item.id === submitData.productId);
    if (product) {
      const prevAmountSold = originalSale?.amountSold || 0;
      const newAmountSold = submitData.amountSold;
      const inventoryUpdates = calculateInventoryUpdates(
        product,
        { prev: prevAmountSold, new: newAmountSold },
        articlesList,
      );

      updateInventory.mutate(inventoryUpdates, {
        onSuccess: () => {
          editMutation.mutate(submitData, {
            onSuccess: () => {
              toast.success(`Sale updated`);
              navigate('/sales');
            },
            onError: () => {
              toast.error(`Inventory has been updated but failed to update Sale. Rollback required`);
            },
          });
        },
        onError: (error: AxiosError) => {
          const data = error.response?.data as { message: string };
          toast.error(data ? data?.message : 'Failed to update inventory. Please try again');
        },
      });
    }
  };

  return (
    <CreateEditForm
      apiError={apiError}
      handleSubmit={handleSubmit}
      isSubmitting={editMutation.isLoading}
      sale={originalSale}
    />
  );
};

export default EditSale;
