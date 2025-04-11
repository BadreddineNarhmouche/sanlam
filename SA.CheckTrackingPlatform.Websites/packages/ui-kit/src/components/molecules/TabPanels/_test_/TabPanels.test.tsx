import renderer from 'react-test-renderer';

import TabPanels from '../TabPanels';

describe('TabPanels', () => {
  it('should render correctly', () => {
    const props = {
      value: 1,

      panels: [
        {
          title: 'fake-title',
          component: <div />,
        },
      ],
    };
    const tree = renderer.create(<TabPanels {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
