/// <reference types="vitest" />
import React from 'react';
import { render } from '@testing-library/react';
import Home from '../app/page';
import Dashboard from '../app/dashboard/page';
import { vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  default: () => () => null,
}));

vi.mock('@supabase/auth-helpers-react', () => ({
  useSession: () => ({ user: { email: 'test@example.com' } }),
  useSupabaseClient: () => ({
    from: () => ({ upsert: vi.fn() }),
  }),
}));

vi.mock('@supabase/auth-ui-react', () => ({
  Auth: () => null,
}));

describe('Pages', () => {
  it('renders home page', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders dashboard for authenticated user', () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
