import './App.css';
import { Component } from 'react';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.handlePClick = this.handlePClick.bind(this);
	state = {
		posts: [],
	};

	loadPosts = async () => {
		const postsResponse = fetch(urlPosts);
    const photosResponse = fetch(urlPhotos);

		const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

		const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    })

		this.setState({ posts: postsAndPhotos });
	};

	componentDidMount() {
		this.loadPosts();
	}

	render() {
		const { posts } = this.state;
		return (
			<section className="container">
				<div className="posts">
					{posts.map((post) => (
						<div key={post.id} className="post">
              <img src={post.cover} alt={post.title} />
							<div className="post-content">
								<h2>{post.title}</h2>
								<p>{post.body}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}
}

export default App;
