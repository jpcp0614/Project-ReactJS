import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../components/Button';

describe('<Button />', () => {
  it('should render the button with the text "Mais posts"', () => {
    const fn = jest.fn();
    render(<Button text="Mais posts" loadMorePosts={fn} disabled={false} />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Mais posts" loadMorePosts={fn} disabled={false} />);

    const button = screen.getByRole('button', { name: /mais posts/i });
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Mais posts" loadMorePosts={fn} disabled={true} />);

    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeDisabled();
  });
});
