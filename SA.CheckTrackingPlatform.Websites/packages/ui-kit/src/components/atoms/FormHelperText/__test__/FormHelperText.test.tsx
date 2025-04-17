import renderer from 'react-test-renderer';
import FormHelperText from '../FormHelperText';

it('FormHelperText renders', () => {
  const tree = renderer.create(<FormHelperText />).toJSON();
  expect(tree).toMatchSnapshot();
});
