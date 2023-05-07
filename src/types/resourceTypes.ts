export interface IArticle {
  id: string;
  name: string;
  amountInStock: number;
}

export interface IProductArticle {
  id: string;
  amountRequired: number;
}

export interface IProduct {
  id: string;
  name: string;
  articles: IProductArticle[];
}

export interface ISale {
  id: string;
  createdAt: string;
  productId: string;
  amountSold: number;
}

export type IArticleInput = Omit<IArticle, 'id'>;
export type IProductInput = Omit<IProduct, 'id'>;
export type ISaleInput = {
  productId: string;
  amountSold: number;
};

export type ISaleEditInput = {
  id: string;
  amountSold: number;
};
