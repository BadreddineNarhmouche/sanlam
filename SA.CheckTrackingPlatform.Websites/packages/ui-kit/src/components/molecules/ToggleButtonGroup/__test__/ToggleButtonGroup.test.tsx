import renderer from 'react-test-renderer';

import ToggleButtonGroup from '../ToggleButtonGroup';

it('Badge renders', () => {
  const tree = renderer.create(<ToggleButtonGroup />).toJSON();
  expect(tree).toMatchSnapshot();
});
