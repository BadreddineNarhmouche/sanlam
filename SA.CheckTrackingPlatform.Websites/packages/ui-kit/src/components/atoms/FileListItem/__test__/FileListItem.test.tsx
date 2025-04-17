import renderer from 'react-test-renderer';

import FileListItem from '../FileListItem';

it('FileListItem renders', () => {
  const tree = renderer
    .create(
      <FileListItem
        fileName=''
        file={
          new File(['Test content'], 'test-file.txt', { type: 'text/plain' })
        }
        onRemove={jest.fn()}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
