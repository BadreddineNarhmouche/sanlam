import renderer from 'react-test-renderer';

import Typography from '../Typography';

it('Typography renders', () => {
  const tree = renderer.create(<Typography />).toJSON();
  expect(tree).toMatchSnapshot();
});
