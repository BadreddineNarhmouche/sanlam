import renderer from 'react-test-renderer';
import Autocomplete from '../Autocomplete';

it('Autocomplete renders', () => {
  const tree = renderer
    .create(
      <Autocomplete
        options={[
          { label: '1', value: 'marrakech' },
          { label: '2', value: 'fes' },
        ]}
        renderInput={(params: any) => <div>test</div>}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
