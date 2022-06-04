import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton, DatePicker } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getAll, addData, editData } from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

VendorForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function VendorForm({text="" , formData=null}) {

  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),// .email('Email must be a valid email address'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string(),
    role: Yup.string(),
  });

  const defaultValues = {
    name: formData ? formData.name : '',
    email: formData ? formData.email : '',
    password: formData ? formData.password : '',
    role: formData ? formData.role : '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if(formData){
        dispatch(editData(formData.id, data))
      }else{
        dispatch(addData(data))
      }
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography align="center" variant="h6" sx={{ my: 1 }} >
      {text}
      </Typography>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="name" label="Name" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField type="password" name="password" label="Password" />
        <RHFTextField name="role" label="Role" />

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
