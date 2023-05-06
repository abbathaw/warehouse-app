import axiosInstance from '../axiosInstance.ts';
import { IProduct } from '../../types';
import { AxiosResponse } from 'axios';

export const PRODUCTS_QUERY_KEY = 'products';

export const getProducts = async () => {
  return await axiosInstance.get<IProduct[]>(`/products`);
};

export const getProduct = async (id: string) => {
  return await axiosInstance.get<IProduct>(`/products/${id}`);
};

export const createProduct = async (product: Omit<IProduct, 'id'>): Promise<AxiosResponse<IProduct>> => {
  return await axiosInstance.post(`/products`, product);
};

export const editProduct = async (product: IProduct) => {
  return await axiosInstance.patch<IProduct>(`/products/${product.id}`, product);
};

export const deleteProduct = async (product: IProduct) => {
  return await axiosInstance.delete<IProduct>(`/products/${product.id}`);
};
