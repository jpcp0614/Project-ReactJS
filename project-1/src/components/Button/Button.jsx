import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ text, loadMorePosts, disabled = false }) => {
  return (
    <button className="button" disabled={disabled} onClick={loadMorePosts}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  loadMorePosts: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
