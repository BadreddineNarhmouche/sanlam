import renderer from 'react-test-renderer';

import Dropdown from '../Dropdown';

it('Dropdown renders', () => {
  const tree = renderer
    .create(
      <Dropdown
        label="test"
        value="test"
        options={[{ label: 'label1', value: 'value1' }]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
