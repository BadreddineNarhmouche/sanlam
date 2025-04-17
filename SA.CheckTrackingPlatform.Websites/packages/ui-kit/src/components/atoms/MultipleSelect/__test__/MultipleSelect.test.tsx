import renderer from 'react-test-renderer';

import MultipleSelect from '../MultipleSelect';

it('MultipleSelect renders', () => {
  const tree = renderer.create(<MultipleSelect />).toJSON();
  expect(tree).toMatchSnapshot();
});
