import React from 'react';
import renderer from 'react-test-renderer';

import Tab from '../Tab';

it('tab renders', () => {
  const tree = renderer.create(<Tab />).toJSON();
  expect(tree).toMatchSnapshot();
});
