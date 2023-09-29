import './styles.css';
import { Component } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

class Home extends Component {
	state = {
		posts: [],
		allPosts: [],
		page: 0,
		postsPerPage: 8,
		searchValue: '',
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

	handleChange = (e) => {
		const { value } = e.target;
		this.setState({ searchValue: value });
	};

	render() {
		const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
		const noMorePosts = page + postsPerPage >= allPosts.length;
		const filteredPosts = !!searchValue
			? allPosts.filter((post) => {
					return post.title.toLowerCase().includes(searchValue.toLowerCase());
			  })
			: posts;
		return (
			<section className="container">
				{!!searchValue && <h1>Search Input: {searchValue}</h1>}
				<div className="search-container">
					<TextInput
						handleChange={this.handleChange}
						searchValue={searchValue}
					/>
				</div>
				{filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
				{filteredPosts.length === 0 && <p>Não tem posts =(</p>}
				<div className="button-container">
					{!searchValue && (
						<Button
							text="Mais posts"
							loadMorePosts={this.loadMorePosts}
							disabled={noMorePosts}
						/>
					)}
				</div>
			</section>
		);
	}
}

export default Home;
