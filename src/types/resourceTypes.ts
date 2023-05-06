export interface IArticle {
  id: string;
  name: string;
  amountInStock: number;
}

export type IArticleInput = Omit<IArticle, 'id'>;
export type IProductInput = Omit<IProduct, 'id'>;

export interface IProductArticle {
  id: string;
  amountRequired: number;
}

export interface IProduct {
  id: string;
  name: string;
  articles: IProductArticle[];
}
