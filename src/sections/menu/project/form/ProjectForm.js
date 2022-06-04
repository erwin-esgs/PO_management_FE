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
import { getAll, addData, editData } from '../../../../redux/slices/project';


// ----------------------------------------------------------------------

ProjectForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function ProjectForm({text="" , formData=null}) {

  const dispatch = useDispatch()

  const todayDate = new Date().toISOString().split('T')[0]

  const LoginSchema = Yup.object().shape({
    client_name: Yup.string().required('Client Code is required'),// .email('Email must be a valid email address'),
    project_code: Yup.string().required('Project Code is required'),
    start_date: Yup.date().required('Date start is required'),
    end_date: Yup.date().nullable(true),
    contract_value: Yup.string().nullable(true),
    finance: Yup.string().nullable(true),
    project_team: Yup.string().nullable(true),
    // list_item: Yup.string(),
  });

  const defaultValues = {
    client_name: formData ? formData.client_name : '',
    project_code: formData ? formData.project_code : '',
    start_date: formData ? formData.start_date : todayDate,
    end_date: formData ? formData.end_date : todayDate,
    contract_value: formData ? formData.contract_value : '',
    finance: formData ? formData.finance : '',
    project_team: formData ? formData.project_team : '',
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

        <RHFTextField name="client_name" label="Client name" />
        <RHFTextField name="project_code" label="Project Code" />
        <RHFTextField InputLabelProps={{ shrink: true }} type="date" name="start_date" label="Start date" />
        <RHFTextField InputLabelProps={{ shrink: true }} type="date" name="end_date" label="End date" />
        <RHFTextField name="contract_value" label="Contract Value" />
        <RHFTextField name="finance" label="Finance" />
        <RHFTextField name="project_team" label="Proejct Team" />

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submits
      </LoadingButton>
    </FormProvider>
  );
}
