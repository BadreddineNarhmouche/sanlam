import renderer from 'react-test-renderer';

import Grid from '../Grid';

it('Grid renders', () => {
  const tree = renderer
    .create(
      <Grid>
        <p>text</p>
      </Grid>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
