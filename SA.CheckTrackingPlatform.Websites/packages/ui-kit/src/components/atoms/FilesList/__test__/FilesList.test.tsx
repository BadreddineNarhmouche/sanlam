import renderer from 'react-test-renderer';

import FilesList from '../FilesList';

it('FilesList renders', () => {
  const tree = renderer
    .create(
      <FilesList
        values={[]}
        input={<p>input</p>}
        services={{}}
        fileTemplates={[]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
