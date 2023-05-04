import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { HasId, IUseMutation } from '../types/mutations.ts';

const useDeleteMutation = <T extends HasId>({
  queryKey,
  mutationFn,
  onSuccessCallback,
  onErrorCallback,
}: IUseMutation<T>) => {
  const queryClient = useQueryClient();

  const [apiError, setApiError] = useState('');
  const deleteMutation = useMutation({
    mutationFn: mutationFn,
    retry: 1,
    onError: (error) => {
      console.log('API ERROR', error);
      setApiError('Delete failed. Try again.');
      if (onErrorCallback) {
        onErrorCallback();
      }
    },
    onMutate: () => setApiError(''),
    onSuccess: async (_, context) => {
      queryClient.setQueryData<T[]>([queryKey], (oldData) => {
        if (oldData) {
          return oldData.filter((item) => item.id !== context.id);
        }
        return undefined;
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return { deleteMutation, apiError };
};

export default useDeleteMutation;
