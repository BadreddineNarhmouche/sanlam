import renderer from 'react-test-renderer';
import Stack from '../Stack';

it('Stack renders', () => {
  const tree = renderer.create(<Stack />).toJSON();
  expect(tree).toMatchSnapshot();
});
