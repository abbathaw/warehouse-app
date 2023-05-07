import { fireEvent, render, screen, Wrapper } from '../../utils/test-utils';
import { waitFor } from '@testing-library/react';

import Article from './index.tsx';
import { IArticle } from '../../types';
import { describe, expect, MockedObject, vi } from 'vitest';
import useDeleteMutation from '../../hooks/useDeleteMutation.tsx';
import useEditMutation from '../../hooks/useEditMutation.tsx';
import { ARTICLES_QUERY_KEY } from '../../api/articles';

const mockArticle: IArticle = {
  id: '1',
  name: 'Test Item',
  amountInStock: 10,
};

vi.mock('../../hooks/useDeleteMutation.tsx');
vi.mock('../../hooks/useEditMutation.tsx');

describe('Article', () => {
  beforeEach(() => {
    (useDeleteMutation as MockedObject<any>).mockReturnValue({
      deleteMutation: {
        isLoading: false,
        mutate: vi.fn().mockResolvedValue({}),
      },
      apiError: '',
    });

    (useEditMutation as MockedObject<any>).mockReturnValue({
      editMutation: {
        isLoading: false,
        mutate: vi.fn().mockResolvedValue({ data: mockArticle }),
      },
      apiError: '',
    });

    render(
      <Wrapper>
        <Article article={mockArticle} />
      </Wrapper>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders ViewArticle by default', () => {
    const itemName = screen.getByText(mockArticle.name);
    expect(itemName).toBeInTheDocument();
  });

  it('switches to EditArticleForm when edit button is clicked', async () => {
    const editButton = screen.getByTitle('Edit item');
    fireEvent.click(editButton);

    await waitFor(() => {
      const inputElement = screen.getByDisplayValue(mockArticle.name);
      expect(inputElement).toBeInTheDocument();
    });
  });

  it('deletes an article when delete button is clicked', async () => {
    const deleteButton = screen.getByTitle('Delete item');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const deleteArticle = vi.fn();
      const mockedDeleteMutation = useDeleteMutation({ queryKey: ARTICLES_QUERY_KEY, mutationFn: deleteArticle });
      expect(mockedDeleteMutation.deleteMutation.mutate).toHaveBeenCalledWith(mockArticle);
    });
  });

  it('updates an article when edit is submitted', async () => {
    const editButton = screen.getByTitle('Edit item');
    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue(mockArticle.name);
    fireEvent.change(inputElement, { target: { value: 'Updated Item' } });

    const submitButton = screen.getByTitle('Submit Edit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const editArticle = vi.fn();
      const mockedEditMutation = useEditMutation({ queryKey: ARTICLES_QUERY_KEY, mutationFn: editArticle });
      expect(mockedEditMutation.editMutation.mutate).toHaveBeenCalledWith({
        ...mockArticle,
        name: 'Updated Item',
      });
    });
  });
});
