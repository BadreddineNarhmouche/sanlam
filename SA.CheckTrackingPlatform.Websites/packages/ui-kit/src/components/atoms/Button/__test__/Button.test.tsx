import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

it('button renders', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
