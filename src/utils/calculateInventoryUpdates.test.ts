import { calculateInventoryUpdates } from './calculateInventoryUpdates';
import { IProduct, IArticle, IInventoryUpdate } from '../types';

describe('calculateInventoryUpdates', () => {
  const product: IProduct = {
    id: '1',
    name: 'Product 1',
    articles: [
      { id: 'A1', amountRequired: 2 },
      { id: 'A2', amountRequired: 3 },
    ],
  };

  const articles: IArticle[] = [
    { id: 'A1', name: 'A1', amountInStock: 10 },
    { id: 'A2', name: 'A2', amountInStock: 15 },
  ];

  test('should calculate inventory updates for a new sale', () => {
    const result: IInventoryUpdate[] = calculateInventoryUpdates(product, { new: 2 });
    const expectedResult: IInventoryUpdate[] = [
      { id: 'A1', amountToSubtract: 4 },
      { id: 'A2', amountToSubtract: 6 },
    ];
    expect(result).toEqual(expectedResult);
  });

  test('should calculate inventory updates for an increased sale', () => {
    const result: IInventoryUpdate[] = calculateInventoryUpdates(product, { prev: 1, new: 3 }, articles);
    const expectedResult: IInventoryUpdate[] = [
      { id: 'A1', amountToSubtract: 4 },
      { id: 'A2', amountToSubtract: 6 },
    ];
    expect(result).toEqual(expectedResult);
  });

  test('should calculate inventory updates for a decreased sale', () => {
    const result: IInventoryUpdate[] = calculateInventoryUpdates(product, { prev: 3, new: 1 }, articles);
    const expectedResult: IInventoryUpdate[] = [
      { id: 'A1', amountInStock: 14 },
      { id: 'A2', amountInStock: 21 },
    ];
    expect(result).toEqual(expectedResult);
  });

  test('should calculate inventory updates for a same sale amount', () => {
    const result: IInventoryUpdate[] = calculateInventoryUpdates(product, { prev: 2, new: 2 }, articles);
    const expectedResult: IInventoryUpdate[] = [
      { id: 'A1', amountToSubtract: 0 },
      { id: 'A2', amountToSubtract: 0 },
    ];
    expect(result).toEqual(expectedResult);
  });

  test('should return an empty array for an empty product', () => {
    const emptyProduct: IProduct = { id: '2', name: 'Empty Product', articles: [] };
    const result: IInventoryUpdate[] = calculateInventoryUpdates(emptyProduct, { new: 2 });
    const expectedResult: IInventoryUpdate[] = [];
    expect(result).toEqual(expectedResult);
  });
});
