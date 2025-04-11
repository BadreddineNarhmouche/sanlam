import renderer from 'react-test-renderer';
import Popover from '../Popover';

it('Popover renders', () => {
  const tree = renderer.create(<Popover />).toJSON();
  expect(tree).toMatchSnapshot();
});
