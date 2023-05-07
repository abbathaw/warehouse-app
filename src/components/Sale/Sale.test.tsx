import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, MockedFunction, vi } from 'vitest';
import Sale from './index.tsx';
import { ISale } from '../../types';
import { useNavigate } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery';
import useDeleteMutation from '../../hooks/useDeleteMutation';
import { Wrapper } from '../../utils/test-utils.tsx';
import { calculateInventoryUpdates } from '../../utils/calculateInventoryUpdates.ts';
import { useUpdateInventoryMutation } from '../../hooks/useUpdateInventoryMutation.tsx';

vi.mock('react-router-dom', () => {
  const useNavigate = vi.fn();
  return { ...vi.importActual('react-router-dom'), useNavigate };
});

vi.mock('../../hooks/useGetQuery');
vi.mock('../../hooks/useDeleteMutation');
vi.mock('../../hooks/useUpdateInventoryMutation');
vi.mock('../../utils/calculateInventoryUpdates.ts');

const mockUseNavigate = useNavigate as unknown as MockedFunction<() => MockedFunction<any>>;
const mockNavigate = vi.fn();
const mockUseGetQuery = useGetQuery as MockedFunction<any>;
const mockUseDeleteMutation = useDeleteMutation as MockedFunction<any>;
const mockUseUpdateInventoryMutation = useUpdateInventoryMutation as MockedFunction<any>;
const mockCalculateInventoryUpdates = calculateInventoryUpdates as MockedFunction<any>;

describe('Sale', () => {
  const testSale: ISale = {
    id: '1',
    productId: '1',
    amountSold: 10,
    createdAt: '2023-01-01T18:00:00.000Z',
  };

  beforeEach(() => {
    const deleteMutation = {
      mutate: vi.fn(),
      isLoading: false,
    };

    mockUseGetQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: vi.fn().mockResolvedValue({}),
    });

    const updateInventory = {
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
    };

    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseDeleteMutation.mockReturnValue({ deleteMutation });
    mockUseUpdateInventoryMutation.mockReturnValue({ updateInventory });
    mockCalculateInventoryUpdates.mockReturnValue([{ id: 1, amountToSubtract: 1 }]);

    render(
      <Wrapper>
        <Sale sale={testSale} />
      </Wrapper>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correctly', () => {
    const dateRegex = /1 January 2023/;
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
  });

  it('navigates to edit page when edit icon is clicked', async () => {
    const editIcon = screen.getByTitle('Edit item');
    fireEvent.click(editIcon);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(`/sales/edit/${testSale.id}`);
    });
  });
});
