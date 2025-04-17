import renderer from 'react-test-renderer';
import CardActions from '../CardActions';

it('CardActions renders', () => {
  const tree = renderer.create(<CardActions />).toJSON();
  expect(tree).toMatchSnapshot();
});
