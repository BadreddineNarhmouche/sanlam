import renderer from 'react-test-renderer';

import Avatar from '../Avatar';

it('Avatar renders', () => {
  const tree = renderer.create(<Avatar />).toJSON();
  expect(tree).toMatchSnapshot();
});
