import axiosInstance from '../axiosInstance.ts';
import { IArticle, IArticleInput, IInventoryUpdate } from '../../types';
import { AxiosResponse } from 'axios';

export const ARTICLES_QUERY_KEY = 'articles';

export const getArticles = async () => {
  return await axiosInstance.get<IArticle[]>(`/articles`);
};

export const getArticle = async (id: string) => {
  return await axiosInstance.get<IArticle>(`/articles/${id}`);
};

export const createArticle = async (article: IArticleInput): Promise<AxiosResponse<IArticle>> => {
  return await axiosInstance.post(`/articles`, article);
};

export const editArticle = async (article: IArticle) => {
  return await axiosInstance.patch<IArticle>(`/articles/${article.id}`, article);
};

export const deleteArticle = async (article: IArticle) => {
  return await axiosInstance.delete<IArticle>(`/articles/${article.id}`);
};

export const bulkEditArticles = async (inventoryUpdates: IInventoryUpdate[]): Promise<AxiosResponse<IArticle[]>> => {
  return await axiosInstance.patch(`/articles`, inventoryUpdates);
};
