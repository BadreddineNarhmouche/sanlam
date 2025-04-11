import renderer from 'react-test-renderer';

import Radio from '../Radio';

it('Radio renders', () => {
  const tree = renderer.create(<Radio />).toJSON();
  expect(tree).toMatchSnapshot();
});
