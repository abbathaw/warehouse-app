import { useQuery } from '@tanstack/react-query';
import { IArticle } from '../types';
import { ARTICLES_QUERY_KEY, getArticle } from '../api/articles';
import { AxiosError } from 'axios';

const useGetArticle = (articleId: string) => {
  const { data, isLoading, isError } = useQuery<IArticle>({
    queryKey: [ARTICLES_QUERY_KEY, articleId],
    queryFn: async () => {
      const axiosResponse = await getArticle(articleId);
      return axiosResponse.data;
    },
    retry: (failureCount, error) => {
      // Check if the error is 404, then don't retry
      if ((error as AxiosError)?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: Infinity, // This makes sure the query doesn't refetch if it exists in the cache
  });
  return { data, isLoading, isError };
};

export default useGetArticle;
