import renderer from 'react-test-renderer';

import Alert from '../Alert';

it('Alert renders', () => {
  const tree = renderer.create(<Alert />).toJSON();
  expect(tree).toMatchSnapshot();
});
