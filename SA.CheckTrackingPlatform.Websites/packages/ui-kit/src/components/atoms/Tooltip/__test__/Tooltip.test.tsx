import renderer from 'react-test-renderer';
import Tooltip from '../Tooltip';
import Button from '../../Button/Button';

it('renders Tooltip correctly', () => {
  const tree = renderer
    .create(
      <Tooltip>
        <Button>test</Button>
      </Tooltip>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
