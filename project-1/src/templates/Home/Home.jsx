import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import loadPosts from '../../utils/loadPosts';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [page, setPage] = useState(0);
	const [postsPerPage] = useState(2);
	const [searchValue, setSearchValue] = useState('');

	const handleLoadPosts = useCallback(async (page, postsPerPage) => {
		const postsAndPhotos = await loadPosts(urlPosts, urlPhotos);
		setPosts(postsAndPhotos.slice(page, postsPerPage));
		setAllPosts(postsAndPhotos);
	}, []);

	useEffect(() => {
		handleLoadPosts(0, postsPerPage);
	}, [handleLoadPosts, postsPerPage]);

	const loadMorePosts = () => {
		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
		posts.push(...nextPosts);

		setPosts(posts);
		setPage(nextPage);
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setSearchValue(value);
	};
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
				<TextInput handleChange={handleChange} searchValue={searchValue} />
			</div>
			{filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
			{filteredPosts.length === 0 && <p>Não tem posts </p>}
			<div className="button-container">
				{!searchValue && (
					<Button
						text="Mais posts"
						loadMorePosts={loadMorePosts}
						disabled={noMorePosts}
					/>
				)}
			</div>
		</section>
	);
};

// class Home2 extends Component {
// 	state = {
// 		posts: [],
// 		allPosts: [],
// 		page: 0,
// 		postsPerPage: 8,
// 		searchValue: '',
// 	};

// 	async componentDidMount() {
// 		await this.myLoadPosts();
// 	}

// 	myLoadPosts = async () => {
// 		const { page, postsPerPage } = this.state;
// 		const postsAndPhotos = await loadPosts(urlPosts, urlPhotos);
// 		this.setState({
// 			posts: postsAndPhotos.slice(page, postsPerPage),
// 			allPosts: postsAndPhotos,
// 		});
// 	};

// 	loadMorePosts = () => {
// 		const { posts, allPosts, page, postsPerPage } = this.state;
// 		const nextPage = page + postsPerPage;
// 		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
// 		posts.push(...nextPosts);

// 		this.setState({ posts, page: nextPage });
// 	};

// 	handleChange = (e) => {
// 		const { value } = e.target;
// 		this.setState({ searchValue: value });
// 	};

// 	render() {
// 		const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
// 		const noMorePosts = page + postsPerPage >= allPosts.length;
// 		const filteredPosts = !!searchValue
// 			? allPosts.filter((post) => {
// 					return post.title.toLowerCase().includes(searchValue.toLowerCase());
// 			  })
// 			: posts;
// 		return (
// 			<section className="container">
// 				{!!searchValue && <h1>Search Input: {searchValue}</h1>}
// 				<div className="search-container">
// 					<TextInput
// 						handleChange={this.handleChange}
// 						searchValue={searchValue}
// 					/>
// 				</div>
// 				{filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
// 				{filteredPosts.length === 0 && <p>Não tem posts =(</p>}
// 				<div className="button-container">
// 					{!searchValue && (
// 						<Button
// 							text="Mais posts"
// 							loadMorePosts={this.loadMorePosts}
// 							disabled={noMorePosts}
// 						/>
// 					)}
// 				</div>
// 			</section>
// 		);
// 	}
// }

export default Home;
