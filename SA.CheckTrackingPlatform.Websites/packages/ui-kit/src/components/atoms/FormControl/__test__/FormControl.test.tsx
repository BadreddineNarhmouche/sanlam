import renderer from 'react-test-renderer';
import FormControl from '../FormControl';

it('FormControl renders', () => {
  const tree = renderer.create(<FormControl />).toJSON();
  expect(tree).toMatchSnapshot();
});
