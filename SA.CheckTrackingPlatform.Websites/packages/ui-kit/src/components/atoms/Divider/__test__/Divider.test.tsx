import renderer from 'react-test-renderer';
import Divider from '../Divider';

it('Divider renders', () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});
