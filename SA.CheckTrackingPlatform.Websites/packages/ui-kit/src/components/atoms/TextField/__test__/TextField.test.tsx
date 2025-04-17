import renderer from 'react-test-renderer';

import TextField from '../TextField';

it('TextField renders', () => {
  const tree = renderer.create(<TextField />).toJSON();
  expect(tree).toMatchSnapshot();
});
