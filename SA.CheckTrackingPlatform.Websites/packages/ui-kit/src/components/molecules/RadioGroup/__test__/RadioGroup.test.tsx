import renderer from 'react-test-renderer';

import RadioGroup from '../RadioGroup';

it('RadioGroup renders', () => {
  const tree = renderer
    .create(
      <RadioGroup
        name="fakeName"
        options={[{ label: 'label', value: 'value' }]}
        value={1}
        handleChange={() => alert('set selected value')}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
