import renderer from 'react-test-renderer';

import CardContainer from '../CardContainer';

it('CardContainer renders', () => {
  const tree = renderer
    .create(
      <CardContainer backgroundColor="'#fff">
        <p>text</p>
      </CardContainer>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
