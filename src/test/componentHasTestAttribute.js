/* eslint-disable react/forbid-foreign-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

export default function componentHasTestAttribute(component, testAtrribute) {
  return Object.prototype.hasOwnProperty.call(
    shallow(component).props(),
    testAtrribute
  );
}

export const findByTestAttribute = (wrapped, testAtrribute) =>
  wrapped.find(`[react-data="${testAtrribute}"]`);

export const checkProps = (component, propsToCheck) => {
  const propsError = checkPropTypes(
    component.propTypes,
    propsToCheck,
    'prop',
    component.name
  );
  return expect(propsError).toBeUndefined();
};
