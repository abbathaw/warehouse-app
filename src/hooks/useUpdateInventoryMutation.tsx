import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { IArticle } from '../types';
import { ARTICLES_QUERY_KEY, bulkEditArticles } from '../api/articles';
import { useState } from 'react';

export const useUpdateInventoryMutation = () => {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState('');
  const updateInventory = useMutation({
    mutationFn: bulkEditArticles,
    retry: (failureCount, error) => {
      // Check if the error is 400, then don't retry, otherwise retry once
      if ((error as AxiosError)?.response?.status === 400 || (error as AxiosError)?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    onSuccess: (res: AxiosResponse<IArticle[]>) => {
      setApiError('');
      queryClient.setQueryData<IArticle[]>([ARTICLES_QUERY_KEY], (oldData: IArticle[] | undefined) => {
        if (!oldData) return res.data;

        return oldData.map((oldArticle) => {
          const newArticle = res.data.find((item) => item.id === oldArticle.id);
          return newArticle ? newArticle : oldArticle;
        });
      });

      // Update individual article caches
      res.data.forEach((updatedArticle) => {
        queryClient.setQueryData<IArticle>([ARTICLES_QUERY_KEY, updatedArticle.id], updatedArticle);
      });
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as { message: string };
      setApiError(`Failed to update inventory. ${data?.message}`);
    },
  });

  return { updateInventory, apiError };
};
