import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import PhoneNumber from '../PhoneNumber';

describe('PhoneNumber component', () => {
  const props = {
    name: 'phoneNumber',
    value: '',
    setFieldValue: jest.fn(),
    intl: {
      formatMessage: jest.fn(),
    },
  };

  it.skip('should match the snapshot', () => {
    const component = renderer.create(
      <IntlProvider locale="en">
        <PhoneNumber {...props} />
      </IntlProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
