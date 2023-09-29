import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../components/Button';

describe('<Button />', () => {
	it('should render the button with the text "Mais posts"', () => {
		render(<Button text="Mais posts" />);
		expect.assertions(1);

		const button = screen.getByRole('button', { name: /mais posts/i });
		expect(button).toBeInTheDocument();
	});

	it('should call function on button click', () => {
		const fn = jest.fn();
		render(<Button text="Mais posts" loadMorePosts={fn} />);

		const button = screen.getByRole('button', { name: /mais posts/i });
		fireEvent.click(button);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should be disabled when disabled is true', () => {
		render(<Button text="Mais posts" disabled={true} />);

		const button = screen.getByRole('button', { name: /mais posts/i });
		expect(button).toBeDisabled();
	});
});