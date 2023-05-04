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
