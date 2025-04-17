import renderer from 'react-test-renderer';
import MenuItem from '../MenuItem';

it('MenuItem renders', () => {
  const tree = renderer.create(<MenuItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
