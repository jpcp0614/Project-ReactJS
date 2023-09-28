import './App.css';
import { Component } from 'react';
import loadPosts from './utils/loadPosts';
import Posts from './components/Posts';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.handlePClick = this.handlePClick.bind(this);
	state = {
		posts: [],
	};

	async componentDidMount() {
		const postsAndPhotos = await loadPosts(urlPosts, urlPhotos);
		this.setState({ posts: postsAndPhotos });
	}

	render() {
		const { posts } = this.state;
		return (
			<section className="container">
				<Posts posts={posts}/>
			</section>
		);
	}
}

export default App;
