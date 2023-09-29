import { render, screen } from '@testing-library/react';
import PostCard from '../../components/PostCard';
import { mockPostCard } from '../mock/mockPostCard';

describe('<PostCard />', () => {
	it('should render PostCard correctly', () => {
		render(<PostCard {...mockPostCard} />);
		expect.assertions(3);

		expect(screen.getByRole('img')).toHaveAttribute('src', mockPostCard.cover);
		expect(
			screen.getByRole('heading', { name: 'title 1 - 1' })
		).toBeInTheDocument();
		expect(screen.getByText(mockPostCard.body)).toBeInTheDocument();
	});

	// it('should match snapshot', () => {
	// 	const { container } = render(<PostCard {...mockPostCard} />);
  //   expect(container.firstChild).toMatchSnapshot();
	// });
});
