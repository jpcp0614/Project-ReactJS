import './styles.css';
import { Component } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts';
import Button from '../../components/Button';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

class Home extends Component {
	state = {
		posts: [],
		allPosts: [],
		page: 0,
		postsPerPage: 10,
	};

	async componentDidMount() {
		await this.myLoadPosts();
	}

	myLoadPosts = async () => {
		const { page, postsPerPage } = this.state;
		const postsAndPhotos = await loadPosts(urlPosts, urlPhotos);
		this.setState({
			posts: postsAndPhotos.slice(page, postsPerPage),
			allPosts: postsAndPhotos,
		});
	};

	loadMorePosts = () => {
		const { posts, allPosts, page, postsPerPage } = this.state;
		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
		posts.push(...nextPosts);

		this.setState({ posts, page: nextPage });
	};

	render() {
		const { posts, page, postsPerPage, allPosts } = this.state;
		const noMorePosts = page + postsPerPage >= allPosts.length;
		return (
			<section className="container">
				<Posts posts={posts} />
				<div className="button-container">
					<Button
						text="Mais posts"
						loadMorePosts={this.loadMorePosts}
						disabled={noMorePosts}
					/>
				</div>
			</section>
		);
	}
}

export default Home;
