import { fireEvent, render, screen, Wrapper } from '../../utils/test-utils';
import EditArticleForm from './EditArticleForm';
import { IArticle } from '../../types';
import { describe, expect, vi } from 'vitest';

const mockHandleSubmit = vi.fn();
const mockHandleCancel = vi.fn();

const testArticle: IArticle = {
  id: '1',
  name: 'Test Item',
  amountInStock: 10,
};

describe('EditArticleForm', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <EditArticleForm
          article={testArticle}
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

  it('renders the input field with initial value', () => {
    const input = screen.getByDisplayValue(testArticle.name);
    expect(input).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const input = screen.getByDisplayValue(testArticle.name);
    fireEvent.change(input, { target: { value: 'Updated Item' } });
    expect(input).toHaveValue('Updated Item');
  });

  it('submits the edited data', () => {
    const newName = 'Updated Item';
    const input = screen.getByDisplayValue(testArticle.name);
    fireEvent.change(input, { target: { value: newName } });

    const submitIcon = screen.getByTitle('Submit Edit');
    fireEvent.click(submitIcon);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith({ ...testArticle, name: newName });
  });

  it('calls handleCancel when cancel icon is clicked', () => {
    const cancelIcon = screen.getByTitle('Cancel Edit');
    fireEvent.click(cancelIcon);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls handleCancel when nothing is updated and submit icon is clicked', () => {
    const submitIcon = screen.getByTitle('Submit Edit');
    fireEvent.click(submitIcon);

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
  });

  it('sets error when input value is an empty string', () => {
    const input = screen.getByDisplayValue(testArticle.name);
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('Name cannot be blank')).toBeInTheDocument();
  });
});
