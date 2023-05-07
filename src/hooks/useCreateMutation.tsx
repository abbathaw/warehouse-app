import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IUseMutation } from '../types';

const useCreateMutation = <T,>({ queryKey, mutationFn }: IUseMutation<T>) => {
  const queryClient = useQueryClient();

  const [apiError, setApiError] = useState('');
  const createMutation = useMutation({
    mutationFn: mutationFn,
    retry: 2,
    onError: () => {
      setApiError('Create failed. Try again.');
    },
    onMutate: () => setApiError(''),
    onSuccess: async (res) => {
      setApiError('');
      queryClient.setQueryData<T[]>([queryKey], (oldData) => {
        if (oldData) {
          return [...oldData, res.data];
        } else {
          return [res.data];
        }
      });
    },
  });

  return { createMutation, apiError };
};

export default useCreateMutation;
