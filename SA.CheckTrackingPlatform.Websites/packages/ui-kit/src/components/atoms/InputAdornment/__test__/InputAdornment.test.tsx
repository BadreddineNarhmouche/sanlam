import renderer from 'react-test-renderer';
import InputAdornment from '../InputAdornment';

it('InputAdornment renders', () => {
  const tree = renderer.create(<InputAdornment />).toJSON();
  expect(tree).toMatchSnapshot();
});
