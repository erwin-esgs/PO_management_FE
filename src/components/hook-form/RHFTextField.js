import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  customOnChange: PropTypes.func,
};

export default function RHFTextField({ name, customOnChange=null , ...other }) {
  const { control } = useFormContext();

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => (
    //     <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
    //   )}
    // />

    <Controller
      name={name}
      control={control}
      render={({ field: {...field}, fieldState: { error } }) => {
        if(customOnChange)customOnChange(field)
        return (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      ) } }
    />

    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field:{value, onChange, ...field}, fieldState: { error } }) => (
    //     <TextField {...field} fullWidth error={!!error} helperText={error?.message} 
    //     onChange={({ target: { value } }) => {
    //       onChange(value);
    //     }} {...other} />
    //   )}
    // />
  );
}
