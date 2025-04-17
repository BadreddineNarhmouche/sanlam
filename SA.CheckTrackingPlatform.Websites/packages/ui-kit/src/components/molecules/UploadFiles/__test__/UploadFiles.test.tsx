import renderer from 'react-test-renderer';
import UploadFiles from '../UploadFiles';

it('UploadFiles render', () => {
  const tree = renderer
    .create(
      <UploadFiles
        values={null}
        name={'number-test'}
        setFieldValue={() => alert('set field value')}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
