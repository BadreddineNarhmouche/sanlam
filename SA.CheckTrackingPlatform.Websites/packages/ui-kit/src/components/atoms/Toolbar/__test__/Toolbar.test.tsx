import renderer from 'react-test-renderer';
import Toolbar from '../Toolbar';

it('Toolbar renders', () => {
  const tree = renderer.create(<Toolbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
