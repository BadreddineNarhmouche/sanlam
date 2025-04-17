import renderer from 'react-test-renderer';

import Box from '../Box';

it('Box renders', () => {
  const tree = renderer.create(<Box />).toJSON();
  expect(tree).toMatchSnapshot();
});
