import React, { forwardRef } from "react";
import { Input, DateTimePicker } from "react-rainbow-components";

const DateTimePickerComponent = forwardRef((props, ref) => (
  <Input ref={ref} as={DateTimePicker} {...props} />
));

export default DateTimePickerComponent;
