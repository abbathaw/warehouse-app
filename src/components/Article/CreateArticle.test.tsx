import CreateArticle from './CreateArticle';
import * as ReactModal from 'react-modal';
import { render, screen, fireEvent, Wrapper } from '../../utils/test-utils';
import { describe, expect, vi } from 'vitest';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
ReactModal.setAppElement(document.createElement('div'));

describe('CreateArticle', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Add new item button', () => {
    render(
      <Wrapper>
        <CreateArticle />
      </Wrapper>,
    );
    const button = screen.getByText('Add new item');
    expect(button).toBeInTheDocument();
  });

  it('opens and closes the modal', () => {
    render(
      <Wrapper>
        <CreateArticle />
      </Wrapper>,
    );
    const button = screen.getByText('Add new item');
    fireEvent.click(button);
    expect(screen.getByText('Add new inventory item')).toBeInTheDocument();

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Add new inventory item')).not.toBeInTheDocument();
  });
});
