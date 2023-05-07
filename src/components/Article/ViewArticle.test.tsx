import { fireEvent, render, screen, Wrapper } from '../../utils/test-utils';
import ViewArticle from './ViewArticle';
import { IArticle } from '../../types';
import { describe, expect, vi } from 'vitest';

const mockArticle: IArticle = {
  id: '1',
  name: 'Test Item',
  amountInStock: 10,
};

const mockHandleEdit = vi.fn();
const mockHandleDelete = vi.fn();

describe('ViewArticle', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <ViewArticle
          article={mockArticle}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
          isDeleting={false}
        />
      </Wrapper>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the article data', () => {
    const itemName = screen.getByText(mockArticle.name);
    const itemAmount = screen.getByText(mockArticle.amountInStock.toString());

    expect(itemName).toBeInTheDocument();
    expect(itemAmount).toBeInTheDocument();
  });

  it('calls handleEdit when edit button is clicked', () => {
    const editButton = screen.getByTitle('Edit item');
    fireEvent.click(editButton);

    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls handleDelete when delete button is clicked', () => {
    const deleteButton = screen.getByTitle('Delete item');
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
