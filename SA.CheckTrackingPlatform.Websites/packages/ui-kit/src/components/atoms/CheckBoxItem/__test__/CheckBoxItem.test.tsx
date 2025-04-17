import renderer from 'react-test-renderer';

import CheckBoxItem from '../CheckBoxItem';

it('CheckBoxItem renders', () => {
  const tree = renderer.create(<CheckBoxItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
