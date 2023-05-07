import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { HasId, IUseMutation } from '../types/mutations.ts';

const useEditMutation = <T extends HasId>({
  queryKey,
  mutationFn,
  onSuccessCallback,
  onErrorCallback,
}: IUseMutation<T>) => {
  const queryClient = useQueryClient();

  const [apiError, setApiError] = useState('');
  const editMutation = useMutation({
    mutationFn: mutationFn,
    retry: 1,
    onError: () => {
      setApiError('Update failed. Try again.');
      if (onErrorCallback) {
        onErrorCallback();
      }
    },
    onMutate: () => setApiError(''),
    onSuccess: async (res) => {
      setApiError('');
      queryClient.setQueryData<T[]>([queryKey], (oldData) => {
        if (oldData) {
          return oldData.map((item) => (item.id === res.data.id ? res.data : item));
        }
        return undefined;
      });
      queryClient.setQueryData<T>([queryKey, res.data.id], res.data);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return { editMutation, apiError };
};

export default useEditMutation;
