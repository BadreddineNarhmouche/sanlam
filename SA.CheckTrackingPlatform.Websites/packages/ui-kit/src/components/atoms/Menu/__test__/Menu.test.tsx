import renderer from 'react-test-renderer';
import Menu from '../Menu';

it('Menu renders', () => {
  const tree = renderer.create(<Menu />).toJSON();
  expect(tree).toMatchSnapshot();
});
