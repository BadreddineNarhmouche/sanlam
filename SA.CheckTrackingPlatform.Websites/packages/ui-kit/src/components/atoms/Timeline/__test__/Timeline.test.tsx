import renderer from 'react-test-renderer';

import Timeline from '../Timeline';

it('Timeline renders', () => {
  const tree = renderer.create(<Timeline />).toJSON();
  expect(tree).toMatchSnapshot();
});
