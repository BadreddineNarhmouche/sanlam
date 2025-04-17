import renderer from 'react-test-renderer';
import Skeleton from '../Skeleton';

it('Skeleton renders', () => {
  const tree = renderer.create(<Skeleton />).toJSON();
  expect(tree).toMatchSnapshot();
});
