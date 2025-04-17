 import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import Tabs from '../Tabs';

it('Tabs renders', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Tabs tabs={[{ label: 'google', to: 'google.com' }]} />
      </BrowserRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
