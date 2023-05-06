import { AxiosResponse } from 'axios';

export interface HasId {
  id: string;
}

export interface IUseMutation<T> {
  queryKey: string;
  mutationFn: (data: T) => Promise<AxiosResponse<T, unknown>>;
  onSuccessCallback?: () => void;
  onErrorCallback?: () => void;
}

export interface IUseQuery<T> {
  id: string;
  queryKey: string;
  queryFn: (id: string) => Promise<AxiosResponse<T, unknown>>;
}
