import renderer from 'react-test-renderer';
import Card from '../Card';

it('Card renders', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});
