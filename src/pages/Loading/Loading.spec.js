/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute } from '../../test/componentHasTestAttribute';

import Loading from './Loading';

const prepareComponent = (customProps = {}) => {
  const defaultProps = {};
  const props = { ...defaultProps, ...customProps };
  const wrapped = shallow(<Loading {...props} />);
  return { props, wrapped };
};

describe('Page <Loading />', () => {
  it('should render correctly', () => {
    const { wrapped } = prepareComponent();
    expect(findByTestAttribute(wrapped, 'loading')).toHaveLength(1);
  });
});
