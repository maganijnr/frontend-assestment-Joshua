/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Button from '@/components/atom/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Button</Button>);
    const buttonElement = screen.getByText(/Button/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
