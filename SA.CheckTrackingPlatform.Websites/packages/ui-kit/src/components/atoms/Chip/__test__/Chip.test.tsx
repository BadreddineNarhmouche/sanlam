import renderer from 'react-test-renderer';

import Chip from '../Chip';

it('Chip renders', () => {
  const tree = renderer.create(<Chip />).toJSON();
  expect(tree).toMatchSnapshot();
});
