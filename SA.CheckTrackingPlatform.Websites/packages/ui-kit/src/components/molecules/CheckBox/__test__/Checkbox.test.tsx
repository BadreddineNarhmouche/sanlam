import renderer from 'react-test-renderer';

import CheckBox from '../CheckBox';

it('Checkbox renders', () => {
  const tree = renderer
    .create(
      <CheckBox
        options={[{ label: 'label', value: 'value', checked: false }]}
        name="checkbox"
        setFieldValue={() => alert('set field value')}
        value={[]}
        handleChange={() => alert('set selected value')}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
