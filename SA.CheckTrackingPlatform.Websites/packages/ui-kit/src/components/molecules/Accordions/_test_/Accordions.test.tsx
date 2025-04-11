import renderer from 'react-test-renderer';
import Accordions from '../Accordions';

describe('Accordions', () => {
  it('should render correctly', () => {
    const props = {
      accordions: [
        {
          title: 'fake-title',
          component: <div />,
        },
      ],
    };
    const tree = renderer.create(<Accordions {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
