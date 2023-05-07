import { render as rtlRender } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const render = (ui: React.ReactElement, options?: any) => {
  const container = document.createElement('div');
  container.setAttribute('id', 'root');
  document.body.appendChild(container);

  return rtlRender(ui, { container, wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { render };
