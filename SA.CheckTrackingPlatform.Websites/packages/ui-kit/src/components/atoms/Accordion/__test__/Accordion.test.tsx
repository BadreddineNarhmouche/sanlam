import renderer from 'react-test-renderer';
import Accordion from '../Accordion';

describe('Accordion', () => {
  it('should render correctly', () => {
    const props = {
      title: 'fake-title',
      expandedValue: 1,
    };
    const tree = renderer.create(<Accordion {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
