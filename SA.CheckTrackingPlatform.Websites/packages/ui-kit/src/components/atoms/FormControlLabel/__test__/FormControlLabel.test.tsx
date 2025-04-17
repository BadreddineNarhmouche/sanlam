import renderer from 'react-test-renderer';
import FormControlLabel from '../FormControlLabel';

it('FormControlLabel renders', () => {
  const tree = renderer.create(<FormControlLabel />).toJSON();
  expect(tree).toMatchSnapshot();
});
