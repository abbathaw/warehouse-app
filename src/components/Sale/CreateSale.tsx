import { useNavigate } from 'react-router-dom';
import useCreateMutation from '../../hooks/useCreateMutation.tsx';
import { IProduct, ISaleEditInput, ISaleInput } from '../../types';
import { toast } from 'react-toastify';
import CreateEditForm from './CreateEditForm.tsx';
import { createSale, SALES_QUERY_KEY } from '../../api/sales';
import { useUpdateInventoryMutation } from '../../hooks/useUpdateInventoryMutation.tsx';
import { calculateInventoryUpdates } from '../../utils/calculateInventoryUpdates.ts';
import { AxiosError } from 'axios';

const CreateSale = () => {
  const navigate = useNavigate();

  const { updateInventory } = useUpdateInventoryMutation();

  const { createMutation, apiError } = useCreateMutation<ISaleInput>({
    queryKey: SALES_QUERY_KEY,
    mutationFn: createSale,
  });

  const handleSubmit = ({
    data,
    productList,
  }: {
    data: ISaleInput | ISaleEditInput;
    productList: IProduct[] | undefined;
  }) => {
    const dataInput = data as ISaleInput;
    const product = productList?.find((item) => item.id === dataInput.productId);
    if (product) {
      const inventoryUpdate = calculateInventoryUpdates(product, { new: data.amountSold });
      updateInventory.mutate(inventoryUpdate, {
        onSuccess: () => {
          createMutation.mutate(dataInput, {
            onSuccess: () => {
              toast.success('New sale added');
              navigate('/sales');
            },
            onError: () => {
              // IF WE REACH HERE..this is a transaction rollback that should be done on the backend
              toast.error('Inventory has been updated but failed to create new sale. Rollback required');
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

  return <CreateEditForm apiError={apiError} handleSubmit={handleSubmit} isSubmitting={createMutation.isLoading} />;
};

export default CreateSale;
