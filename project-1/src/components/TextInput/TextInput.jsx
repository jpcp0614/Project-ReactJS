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

export default TextInput;
