import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../Navbar';

const navItems = {
  links: [{ label: 'google', to: 'google.com' }],
  button: {
    label: 'Logout',
    onClick: () => alert('logout'),
  },
  username: 'name',
};

it('Navbar renders', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Navbar navItems={navItems} />
      </BrowserRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
