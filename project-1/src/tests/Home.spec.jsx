import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from '../templates/Home';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const handlers = [
  rest.get(urlPosts, async (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
        },
      ]),
    );
  }),
  rest.get(urlPhotos, async (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.jpg',
        },
        {
          url: 'img2.jpg',
        },
        {
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não tem posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/digite aqui/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não tem posts');

    expect.assertions(11);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/digite aqui/i);
    expect(screen.getByRole('heading', { name: 'title1 - 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 - 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 - 3' })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'title1' } });
    expect(screen.getByRole('heading', { name: 'title1 - 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Input: title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 - 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 - 3' })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: '' } });
    expect(screen.getByRole('heading', { name: 'title1 - 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 - 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 - 3' })).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'post does not exist' } });
    expect(screen.getByText('Não tem posts')).toBeInTheDocument();

    screen.debug();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não tem posts');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 - 3' })).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title3 - 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
