import { fireEvent, render, screen, Wrapper } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, vi } from 'vitest';

import CreateEditForm from './CreateEditForm';

const testArticles = [
  { id: '1', name: 'Article 1', stock: 10 },
  { id: '2', name: 'Article 2', stock: 20 },
];

vi.mock('../../api/articles', () => ({
  getArticles: () => Promise.resolve({ data: testArticles }),
  ARTICLES_QUERY_KEY: 'articles',
}));

describe('CreateEditForm', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    render(
      <Wrapper>
        <BrowserRouter>
          <CreateEditForm handleSubmit={handleSubmit} apiError="" isSubmitting={false} />
        </BrowserRouter>
      </Wrapper>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /product name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add article/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create product/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('updates the product name input', () => {
    fireEvent.change(screen.getByRole('textbox', { name: /product name/i }), { target: { value: 'New Product' } });
    expect(screen.getByRole('textbox', { name: /product name/i })).toHaveValue('New Product');
  });

  it('shows an error when the product name is empty', () => {
    fireEvent.click(screen.getByRole('button', { name: /create product/i }));
    expect(screen.getByText(/please add a name/i)).toBeInTheDocument();
  });

  it('adds an article when "Add Article" button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /add article/i }));
    expect(screen.getByText(/choose an article/i)).toBeInTheDocument();
    expect(screen.getByText(/amount required/i)).toBeInTheDocument();
  });

  it('deletes an article when the delete icon is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /add article/i }));
    fireEvent.click(screen.getByTitle(/cancel edit/i));
    expect(screen.queryByText(/choose an article/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/amount required/i)).not.toBeInTheDocument();
  });

  it('shows an error when the amount required is empty or zero', () => {
    fireEvent.click(screen.getByRole('button', { name: /add article/i }));
    fireEvent.change(screen.getByRole('textbox', { name: /product name/i }), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /amount required/i }), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /create product/i }));
    expect(screen.getByText(/numeric value not defined/i)).toBeInTheDocument();
  });

  it('shows an error when an article is not selected', () => {
    fireEvent.click(screen.getByRole('button', { name: /add article/i }));
    fireEvent.change(screen.getByRole('textbox', { name: /product name/i }), { target: { value: 'New Product' } });
    fireEvent.click(screen.getByRole('button', { name: /create product/i }));
    expect(screen.getByText(/article selection not added/i)).toBeInTheDocument();
  });
});
