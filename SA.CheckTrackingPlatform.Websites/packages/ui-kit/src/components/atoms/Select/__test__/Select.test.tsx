import renderer from 'react-test-renderer';
import Select from '../Select';

it('Select renders', () => {
  const tree = renderer.create(<Select />).toJSON();
  expect(tree).toMatchSnapshot();
});
