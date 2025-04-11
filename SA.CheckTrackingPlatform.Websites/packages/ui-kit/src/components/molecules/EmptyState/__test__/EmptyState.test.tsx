import renderer from 'react-test-renderer';

import { Add } from '@mui/icons-material';
import EmptyState from '../EmptyState';
import { assets } from '../../../../assets';

it.skip('EmptyState renders', () => {
  const tree = renderer
    .create(
      <EmptyState
        image={assets.empty_state_desk}
        title="title"
        subTitle="description"
        action={{
          label: 'add',
          onClick: () => alert('click on add'),
          startIcon: <Add />,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
