import renderer from 'react-test-renderer';
import SwipeableDrawer from '../SwipeableDrawer';

it.skip('SwipeableDrawer renders', () => {
  const tree = renderer
    .create(
      <SwipeableDrawer onOpen={jest.fn()} onClose={jest.fn()}>
        <div>SwipeableDrawer</div>
      </SwipeableDrawer>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
