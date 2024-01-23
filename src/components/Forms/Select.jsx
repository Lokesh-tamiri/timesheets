import React from "react";
import { useField } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";

const SelectField = ({ name, label, options, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event) => {
    helpers.setValue(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel labelId={name}>{label}</InputLabel>
        <Select
          id={name}
          name={name}
          value={field.value}
          onChange={handleChange}
          label={label}
          onBlur={() => helpers.setTouched(true)}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {meta.touched && meta.error && (
        <p style={{ color: "red",fontSize:12,fontWeight:"lighter" }}>{meta.error}</p>
      )}
    </div>
  );
};

export default SelectField;
