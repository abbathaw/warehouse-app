import { render } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';

describe('NavBar', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    expect(getByText('The Warehouse')).toBeInTheDocument();
  });
});
