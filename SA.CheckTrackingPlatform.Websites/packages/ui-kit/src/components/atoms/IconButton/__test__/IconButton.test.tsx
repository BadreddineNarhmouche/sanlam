import renderer from 'react-test-renderer';
import IconButton from '../IconButton';

it('IconButton render', () => {
  const tree = renderer.create(<IconButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
