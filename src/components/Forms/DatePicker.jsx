// CustomDatePicker.js
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const CustomDatePicker = ({ name, label, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (date) => {
    setFieldValue(name, date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...field}
        {...rest}
        label={label}
        format="MM/dd/yyyy"
        onChange={handleChange}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
