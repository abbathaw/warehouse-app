import axiosInstance from '../axiosInstance.ts';
import { IArticle } from '../../types';

export const ARTICLES_QUERY_KEY = 'articles';

export const getArticles = async () => {
  return await axiosInstance.get<IArticle[]>(`/articles`);
};

export const editArticle = async (article: IArticle) => {
  return await axiosInstance.patch<IArticle>(`/articles/${article.id}`, article);
};

export const deleteArticle = async (article: IArticle) => {
  return await axiosInstance.delete<IArticle>(`/articles/${article.id}`);
};
