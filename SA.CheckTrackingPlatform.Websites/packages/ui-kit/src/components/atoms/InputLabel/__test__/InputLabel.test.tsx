import renderer from 'react-test-renderer';
import InputLabel from '../InputLabel';

it('InputLabel renders', () => {
  const tree = renderer.create(<InputLabel />).toJSON();
  expect(tree).toMatchSnapshot();
});
