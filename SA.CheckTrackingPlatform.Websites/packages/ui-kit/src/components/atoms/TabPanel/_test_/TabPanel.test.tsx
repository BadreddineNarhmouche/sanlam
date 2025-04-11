import renderer from 'react-test-renderer';
import TabPanel from '../TabPanel';

describe('TabPanel', () => {
  it('should render correctly when value === index', () => {
    const props = {
      index: 1,
      value: 1,
    };
    const tree = renderer.create(<TabPanel {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly when value !== index', () => {
    const props = {
      index: 0,
      value: 1,
    };
    const tree = renderer.create(<TabPanel {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
