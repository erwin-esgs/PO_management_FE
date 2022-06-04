import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getAll, addData, editData } from '../../../../redux/slices/pt';


// ----------------------------------------------------------------------

PtForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function PtForm({text="" , formData=null}) {

  const dispatch = useDispatch()
  
  const LoginSchema = Yup.object().shape({
    pt_name: Yup.string().required('PT Short Name is required'),// .email('Email must be a valid email address'),
    full_name: Yup.string().required('PT Full Name is required'),
    npwp: Yup.string().nullable(),
    siup: Yup.string().nullable(),
    address: Yup.string().nullable(),
    // logo: Yup.string(),
  });

  const defaultValues = {
    pt_name: formData ? formData.pt_name : '',
    full_name: formData ? formData.full_name : '',
    npwp: formData ? formData.npwp : '',
    siup: formData ? formData.siup : '',
    address: formData ? formData.address : '',
    // logo: formData ? formData.logo : '',
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

        <RHFTextField name="pt_name" label="PT Short Name" />
        <RHFTextField name="full_name" label="PT Full Name" />
        <RHFTextField name="npwp" label="NPWP" />
        <RHFTextField name="siup" label="SIUP" />
        <RHFTextField name="address" label="Alamat" />
        {/* <RHFTextField name="logo" label="Logo" /> */}

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
