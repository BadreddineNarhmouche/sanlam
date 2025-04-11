import renderer from 'react-test-renderer';
import Container from '../Container';

it('Container renders', () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});
