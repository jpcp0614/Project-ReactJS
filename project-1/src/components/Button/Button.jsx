import './styles.css';

const Button = ({ text, loadMorePosts, disabled }) => {
	return (
		<button className="button" disabled={disabled} onClick={loadMorePosts}>
			{text}
		</button>
	);
};

export default Button;
