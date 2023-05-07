import axiosInstance from '../axiosInstance.ts';
import { ISale, ISaleEditInput, ISaleInput } from '../../types';
import { AxiosResponse } from 'axios';

export const SALES_QUERY_KEY = 'sales';

export const getSales = async () => {
  return await axiosInstance.get<ISale[]>(`/sales`);
};

export const getSale = async (id: string) => {
  return await axiosInstance.get<ISale>(`/sales/${id}`);
};

export const createSale = async (sale: ISaleInput): Promise<AxiosResponse<ISale>> => {
  return await axiosInstance.post(`/sales`, sale);
};

export const editSale = async (sale: ISaleEditInput) => {
  return await axiosInstance.patch<ISale>(`/sales/${sale.id}`, sale);
};

export const deleteSale = async (sale: ISale) => {
  return await axiosInstance.delete<ISale>(`/sales/${sale.id}`);
};
