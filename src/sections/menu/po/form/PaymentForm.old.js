import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox, RHFSelect } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { editData, getDetail } from '../../../../redux/slices/po';
// import { description } from 'src/_mocks/text';

// ----------------------------------------------------------------------

PaymentForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function PaymentForm({text="" , formData=null}) {

  const dispatch = useDispatch()
  const { po } = useSelector((state) =>  state.po );
  
  let payment = JSON.parse( po.payment )

  const [paymentNumber , setPaymentNumber] = useState(0);

  

  const todayDate = new Date().toISOString().split('T')[0]
  
  const LoginSchema = Yup.object().shape({
    percentage: Yup.number().required("Percentage is required").min(1, "Must be 1-100").max(100, "Must be 1-100"),// .email('Email must be a valid email address'),
    payment_date: Yup.date().required("Date is required"),
    description: Yup.string().nullable(true),
  });

  const defaultValues = {
    percentage: formData ? formData.percentage : 0,
    payment_date: formData ? formData.payment_date : todayDate,
    description: formData ? formData.description : '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
      const obj = {
        percentage: data.percentage,
        // payment_date: new Date(data.payment_date).toISOString().split('T')[0],
        description: data.description ? data.description : ''
      }
      payment.push(obj)
      console.log()
      Promise.resolve().then( () => dispatch(editData(po.id, { payment: JSON.stringify(payment) })) )
      .then( () =>  dispatch(getDetail(po.id))  )
      
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  const handleCustomOnChange = (data)=>{
    if(po){
      // setPaymentNumber( data.target.value * po.value / 100)
      setPaymentNumber( data.value * po.value / 100)
    }
  }

  // const percentage = register('percentage')

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography align="center" variant="h6" sx={{ my: 1 }} >
      {text}
      </Typography>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="percentage" type="number" label="Percentage" customOnChange={(e)=>{handleCustomOnChange(e)}} InputLabelProps={{ shrink: true }} />
        {/* <TextField {...percentage} onChange={(e)=>{ 
          percentage.onChange(e)
          handleCustomOnChange(e)
          }} type="number" label="Percentage" InputLabelProps={{ shrink: true }} /> */}
        <TextField value={paymentNumber}  label="In Number" InputLabelProps={{ shrink: true }} disabled />
        <RHFTextField name="payment_date" type="date" label="Payment Date" InputLabelProps={{ shrink: true }} />
        <RHFTextField name="description" label="Description" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
