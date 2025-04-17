import renderer from 'react-test-renderer';
import Number from '../Number';

it('Number renders', () => {
  const tree = renderer
    .create(
      <Number
        id={1}
        value={1}
        name={'number-test'}
        onBlur={() => alert('onblur')}
        handleChange={() => alert('set selected value')}
        setFieldValue={() => alert('set field value')}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
