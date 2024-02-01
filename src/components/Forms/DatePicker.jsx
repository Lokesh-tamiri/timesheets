import React, { useCallback } from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

const FormikDatePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based, add 1 to get 1-based, and pad with zero if needed
    const day = ("0" + date.getDate()).slice(-2); // Pad the day with zero if needed

    return `${year}-${month}-${day}`;
  }, []);
  const handleChange = (value) => {
    const date = formatDate(value);
    console.log(date)
    setFieldValue(name, date);
  };

  const configDatePicker = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
    error: true,
    helperText: meta.error,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...configDatePicker}
        renderInput={(props) => <TextField {...props} />}
      />
      {meta.touched && meta.error && (
        <p style={{ color: "red", fontSize: 12, fontWeight: "lighter" }}>
          {meta.error}
        </p>
      )}
    </LocalizationProvider>
  );
};

export default FormikDatePicker;
