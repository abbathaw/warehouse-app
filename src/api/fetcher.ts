import { ResponseError } from '../types';

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw { message: response.statusText, status: response.status };
    }
    return await response.json();
  } catch (error: unknown) {
    const { message, status } = error as ResponseError;
    throw { message: message || 'unknown error', status: status || 500 };
  }
};
