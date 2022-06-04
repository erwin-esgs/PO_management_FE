import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Link, Button, Stack, Alert, IconButton, InputAdornment, Typography, FormControl, InputLabel, Select, MenuItem, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import LoadingScreen from '../../../../components/LoadingScreen';
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox, RHFSelect } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getDatas, setStartEndDate } from '../../../../redux/slices/dashboard';

// ----------------------------------------------------------------------

export default function FilterForm() {

  const dispatch = useDispatch()

  // const [isLoading ,setIsLoading ] = useState(false)
  const todayDate = new Date().toISOString().split('T')[0]
  const firstDayYear = new Date( new Date(new Date().getFullYear(), 0, 1).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]

  const { 
    isLoading , 
    startDate = firstDayYear , 
    endDate = todayDate
  } = useSelector((state) =>  state.dashboard );
  
  const Schema = Yup.object().shape({
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required'),
  });

  const defaultValues = {
    startDate ,
    endDate ,
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if(data){
        data.startDate = new Date(new Date(data.startDate).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
        data.endDate = new Date(new Date(data.endDate).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]

        Promise.resolve().then( () => dispatch( setStartEndDate({
          startDate : data.startDate,
          endDate : data.endDate,
        }) ) )
        .then( () => dispatch(getDatas(data)) )
        
      }
      // dispatch(getDatas(data))
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <>
    {isLoading ? <LoadingScreen /> : (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <RHFTextField name="startDate" type="date" label="Start Date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField name="endDate" type="date" label="End Date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={4}>
        <LoadingButton color="inherit" fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Filter
        </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
    )}
    </>
  );
}
