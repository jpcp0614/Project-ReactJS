import PropTypes from 'prop-types';
import './styles.css';

const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      type="search"
      className="input-search"
      placeholder="Digite aqui"
      onChange={handleChange}
      value={searchValue}
    />
  );
};

TextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default TextInput;
