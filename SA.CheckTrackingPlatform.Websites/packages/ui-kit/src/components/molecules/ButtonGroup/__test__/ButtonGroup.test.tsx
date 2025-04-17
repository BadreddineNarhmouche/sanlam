import renderer from 'react-test-renderer';

import ButtonGroup from '../ButtonGroup';

it('ButtonGroup render', () => {
  const tree = renderer.create(<ButtonGroup />).toJSON();
  expect(tree).toMatchSnapshot();
});
