import renderer from 'react-test-renderer';

import Badge from '../Badge';

it('Badge renders', () => {
  const tree = renderer.create(<Badge />).toJSON();
  expect(tree).toMatchSnapshot();
});
