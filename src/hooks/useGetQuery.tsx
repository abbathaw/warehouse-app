import { useQuery } from '@tanstack/react-query';
import { IUseQuery } from '../types';
import { AxiosError } from 'axios';

const useGetQuery = <T,>({ id, queryFn, queryKey }: IUseQuery<T>) => {
  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const axiosResponse = await queryFn(id);
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

export default useGetQuery;
