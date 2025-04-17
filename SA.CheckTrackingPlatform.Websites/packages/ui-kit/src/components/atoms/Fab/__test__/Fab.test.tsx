import renderer from 'react-test-renderer';
import Fab from '../Fab';

it('Fab renders', () => {
  const tree = renderer.create(<Fab />).toJSON();
  expect(tree).toMatchSnapshot();
});
