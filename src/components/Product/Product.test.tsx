import { fireEvent, render, screen } from '../../utils/test-utils';
import { IProduct } from '../../types';
import { useNavigate } from 'react-router-dom';
import useDeleteMutation from '../../hooks/useDeleteMutation';
import Product from './index.tsx';
import { describe, expect, MockedFunction, MockedObject, vi } from 'vitest';
import useGetQuery from '../../hooks/useGetQuery.tsx';
import { waitFor } from '@testing-library/react';

vi.mock('react-router-dom', () => {
  const mockNavigate = vi.fn();
  return { ...vi.importActual('react-router-dom'), useNavigate: mockNavigate };
});

vi.mock('../../hooks/useDeleteMutation');
vi.mock('../../hooks/useGetQuery');

const mockedUseNavigate = useNavigate as unknown as MockedFunction<() => MockedFunction<any>>;
const mockNavigate = vi.fn();
const mockUseDeleteMutation = useDeleteMutation as MockedFunction<any>;

describe('Product', () => {
  const testProduct: IProduct = {
    id: '1',
    name: 'Test Product',
    articles: [
      { id: '1', amountRequired: 2 },
      { id: '2', amountRequired: 3 },
    ],
  };

  beforeEach(() => {
    const deleteMutation = {
      mutate: vi.fn(),
      isLoading: false,
    };

    (useGetQuery as MockedObject<any>).mockReturnValue({
      isLoading: false,
      isError: false,
      data: vi.fn().mockResolvedValue(testProduct),
    });

    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockUseDeleteMutation.mockReturnValue({ deleteMutation });

    render(<Product product={testProduct} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correctly', () => {
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getAllByTestId('product-article-detail').length).toBe(testProduct.articles.length);
  });

  it('navigates to edit page when edit icon is clicked', async () => {
    const editIcon = screen.getByTitle('Edit item');
    fireEvent.click(editIcon);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(`/products/edit/${testProduct.id}`);
    });
  });

  it('calls deleteMutation with correct arguments when delete icon is clicked', () => {
    const deleteIcon = screen.getByTitle('Delete item');
    fireEvent.click(deleteIcon);

    const deleteMutation = mockUseDeleteMutation().deleteMutation;
    expect(deleteMutation.mutate).toHaveBeenCalledTimes(1);
    expect(deleteMutation.mutate).toHaveBeenCalledWith(testProduct);
  });
});
