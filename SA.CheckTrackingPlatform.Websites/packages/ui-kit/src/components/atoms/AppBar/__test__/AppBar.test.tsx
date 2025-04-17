import renderer from 'react-test-renderer';
import AppBar from '../AppBar';

it('AppBar renders', () => {
  const tree = renderer.create(<AppBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
