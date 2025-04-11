import renderer from 'react-test-renderer';
import CardContent from '../CardContent';

it('CardContent renders', () => {
  const tree = renderer.create(<CardContent />).toJSON();
  expect(tree).toMatchSnapshot();
});
