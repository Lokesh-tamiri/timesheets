import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

const FormikDatePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (value) => {
    setFieldValue(name, `${value.$y}-${value.$M + 1}-${value.$D}`);
  };

  const configDatePicker = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
    error:true,
    helperText:meta.error
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...configDatePicker}
        renderInput={(props) => <TextField {...props} />}
      />
      {meta.touched && meta.error && (
        <p style={{ color: "red",fontSize:12,fontWeight:"lighter" }}>{meta.error}</p>
      )}
    </LocalizationProvider>
  );
};

export default FormikDatePicker;





