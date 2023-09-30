import { render, screen } from '@testing-library/react';
import Posts from '../../components/Posts';
import mockPosts from '../mock/mockPosts';

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...mockPosts} />);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render posts', () => {
    render(<Posts />);

    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0);
  });
});
