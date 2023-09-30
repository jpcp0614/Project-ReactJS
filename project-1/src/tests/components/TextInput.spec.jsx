import { fireEvent, render, screen } from '@testing-library/react';
import TextInput from '../../components/TextInput';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/digite aqui/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="um valor qualquer" />);

    const input = screen.getByPlaceholderText(/digite aqui/i);
    const value = 'o valor';

    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe('um valor qualquer');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
