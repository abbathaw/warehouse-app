import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './index.tsx';
import { getNavLinks } from '../config/navLinks';

describe('Layout', () => {
  it('renders Layout component correctly', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders Sidebar and Footer component correctly', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    expect(screen.getByText('Warehouse')).toBeInTheDocument();
    getNavLinks().forEach((navLink) => {
      const links = screen.getAllByRole('link', { name: navLink.label });
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', navLink.link);
      });
    });
  });
});
