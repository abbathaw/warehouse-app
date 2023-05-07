import { fireEvent, render, screen, Wrapper } from '../../utils/test-utils';
import NewArticleForm from './NewArticleForm';
import { describe, expect, vi } from 'vitest';

const mockHandleSubmit = vi.fn();
const mockHandleCancel = vi.fn();

describe('NewArticleForm', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <NewArticleForm
          handleSubmit={mockHandleSubmit}
          handleCancel={mockHandleCancel}
          isSubmitting={false}
          errorMsg=""
        />
      </Wrapper>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders input fields and buttons', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    const addButton = screen.getByRole('button', { name: 'Add item' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(nameInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'New Item' } });

    expect(nameInput).toHaveValue('New Item');
  });

  it('submits the new data', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    const addButton = screen.getByRole('button', { name: 'Add item' });

    fireEvent.change(nameInput, { target: { value: 'New Item' } });
    fireEvent.click(addButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith({ name: 'New Item', amountInStock: 1 });
  });

  it('calls handleCancel when cancel button is clicked', () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
});
