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
import { getAll, addData, editData } from '../../../../redux/slices/vendor';

// ----------------------------------------------------------------------

VendorForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function VendorForm({text="" , formData=null}) {

  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    vendor_name: Yup.string().required('Client Code is required'),// .email('Email must be a valid email address'),
    email: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    contact: Yup.string().nullable(),
    // manager: Yup.string().nullable(),
    bank_acc: Yup.string().nullable(),
    description: Yup.string().nullable(),
  });

  let defaultValues;
  if(formData){
    defaultValues = {
      vendor_name: formData.vendor_name ? formData.vendor_name : '',
      email: formData.email ? formData.email : '',
      phone: formData.phone ? formData.phone : '',
      contact: formData.contact ? formData.contact : '',
      // manager: formData.manager ? formData.manager : '',
      bank_acc: formData.bank_acc ? formData.bank_acc : '',
      description: formData.description ? formData.description : '',
    };
  }else{
    defaultValues = {
      vendor_name:  '',
      email: '',
      phone: '',
      contact: '',
      // manager: '',
      bank_acc: '',
      description: '',
    };
  }

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

        <RHFTextField name="vendor_name" label="Vendor Name" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="phone" label="Phone" />
        <RHFTextField name="contact" label="Contact" />
        {/* <RHFTextField name="manager" label="Manager" /> */}
        <RHFTextField name="bank_acc" label="Bank ACC" />
        <RHFTextField name="description" label="Description" />

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
