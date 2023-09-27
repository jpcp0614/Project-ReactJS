import './App.css';
import { Component } from 'react';

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.handlePClick = this.handlePClick.bind(this);

	state = {
		counter: 0,
		posts: [
			{
				id: 1,
				title: 'Título 1',
				body: 'Corpo 1',
			},
			{
				id: 2,
				title: 'Título 2',
				body: 'Corpo 2',
			},
			{
				id: 3,
				title: 'Título 3',
				body: 'Corpo 3',
			},
		],
	};
	timeoutUpdate = null;

	handleTimeout = () => {
		const { counter, posts } = this.state;
		posts[0].title = 'O título mudou';
		this.timeoutUpdate = setTimeout(() => {
			this.setState({ counter: counter + 1, posts });
		}, 1000);
	};

	componentDidMount() {
		// quando o componente for montado na tela
		this.handleTimeout();
	}

	componentDidUpdate() {
		this.handleTimeout();
	}

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

	render() {
		const { counter, posts } = this.state;
		return (
			<div className="App">
				<h1>{counter}</h1>
				{posts.map((post) => (
					<div key={post.id}>
						<h2>{post.title}</h2>
						<p>{post.body}</p>
					</div>
				))}
			</div>
		);
	}
}

export default App;
