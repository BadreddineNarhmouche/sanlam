import renderer from 'react-test-renderer';

import Switch from '../Switch';

it('Switch renders', () => {
  const tree = renderer.create(<Switch />).toJSON();
  expect(tree).toMatchSnapshot();
});
