import renderer from 'react-test-renderer';

import ToggleButton from '../ToggleButton';

it('ToggleButton renders', () => {
  const tree = renderer.create(<ToggleButton value="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});
