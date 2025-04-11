import renderer from 'react-test-renderer';

import DateRange from '../DateRange';

it('DateRange renders', () => {
  const tree = renderer.create(<DateRange />).toJSON();
  expect(tree).toMatchSnapshot();
});
