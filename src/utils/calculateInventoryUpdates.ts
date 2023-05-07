import { IArticle, IInventoryUpdate, IProduct } from '../types';

export const calculateInventoryUpdates = (
  product: IProduct,
  amountSold: {
    prev?: number;
    new: number;
  },
  articles?: IArticle[],
): Array<IInventoryUpdate> => {
  const stockAmountMultiplier: number =
    amountSold.prev !== undefined ? amountSold.new - amountSold.prev : amountSold.new;

  return product.articles.map((article) => {
    if (stockAmountMultiplier < 0 && articles) {
      const prevStock = articles.find((a) => a.id === article.id)?.amountInStock;
      const amountToAdd = article.amountRequired * Math.abs(stockAmountMultiplier);
      const newStockAmount = prevStock ? prevStock + amountToAdd : amountToAdd;
      return { id: article.id, amountInStock: newStockAmount };
    } else {
      const amountToUpdate = article.amountRequired * stockAmountMultiplier;
      return { id: article.id, amountToSubtract: amountToUpdate };
    }
  });
};
