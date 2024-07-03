import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import UserLogin from '../components/user-login';

describe('Page', () => {
  it('renders a heading', async () => {
    // ARRANGE
    render(<UserLogin />);

    // ACT
    const input = screen.getByLabelText('email') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '25' } });

    // ASSERT
    expect(input.value).toBe('25');
  });
});
