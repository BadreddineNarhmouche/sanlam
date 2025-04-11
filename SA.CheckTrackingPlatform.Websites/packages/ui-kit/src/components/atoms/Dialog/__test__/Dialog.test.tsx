import renderer from 'react-test-renderer';
import Dialog from '../Dialog';

it.skip('Dialog renders', () => {
  const tree = renderer
    .create(<Dialog open={true} content={<div>Test content</div>} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
