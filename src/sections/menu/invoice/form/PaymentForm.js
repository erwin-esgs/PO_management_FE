import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import { 
  // useState,
  //  useEffect, 
  //  useRef 
  // } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography , Grid ,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { editData, getDetail } from '../../../../redux/slices/invoice';
// import { description } from 'src/_mocks/text';

// ----------------------------------------------------------------------

PaymentForm.propTypes = {
  text: PropTypes.string,
  // formData: PropTypes.object,
  // selectedIndex: PropTypes.number,
};
export default function PaymentForm({text="" }) {

  const dispatch = useDispatch()
  const { invoice } = useSelector((state) =>  state.invoice );
  
  let payment 
  try {
    payment = JSON.parse( invoice.payment )
  } catch (error) {
    payment = []
  }
  

  // const [paymentNumber , setPaymentNumber] = useState(0);

  

  const todayDate = new Date().toISOString().split('T')[0]
  
  const LoginSchema = Yup.object().shape({
    payment_date: Yup.date().required("Date is required"),
    payment_value: Yup.number().typeError('You must specify a number').min(0, 'Not valid').required("Value is required"),
    payment_vat: Yup.number().typeError('You must specify a number').min(0, 'Not valid').required("VAT is required"),
    payment_description: Yup.string(),
  });

  const defaultValues = {
    payment_date: todayDate,
    payment_value: 0,
    payment_vat: 0,
    payment_description: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    getValues,
    // register,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {  
    try {
      data.payment_date = new Date(new Date(data.payment_date).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
      // const payment_date = new Date(new Date(data.payment_date).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
      // payment[selectedIndex].payment_date = payment_date
      let total_payment=0
      if(payment.length > 0){
        payment.forEach((item)=>{
          total_payment += item.payment_value
          total_payment += item.payment_vat
        })
      }
      payment.push(data)
      if( (data.payment_value + data.payment_vat) <= (invoice.value + invoice.vat - total_payment) && (data.payment_value + data.payment_vat > 0) ){
        Promise.resolve().then( () => dispatch(editData(invoice.id, { payment: JSON.stringify(payment) })) )
        .then( () =>  dispatch(getDetail(invoice.id))  )
      }else{
        alert("Total value > Invoice or No payment")
      }

      // Promise.resolve().then( () => dispatch(editData(invoice.id, { payment: JSON.stringify(payment) })) )
      // .then( () =>  dispatch(getDetail(invoice.id))  )
      
      // const obj = {
      //   percentage: data.percentage,
      //   // payment_date: new Date(data.payment_date).toISOString().split('T')[0],
      //   description: data.description ? data.description : ''
      // }
      // payment.push(obj)
      // console.log()
      
      
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
          <RHFTextField name="payment_value" type="number" label="Payment Value" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6} >
          <RHFTextField name="payment_vat" type="number" label="Payment VAT" InputLabelProps={{ shrink: true }} />
          <Button onClick={()=>setValue("payment_vat", (getValues("payment_value") *11/100 ))}>Calculate 11% tax</Button>
        </Grid>
        <Grid item xs={12} md={6} >
          <RHFTextField name="payment_date" type="date" label="Payment Date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6} >
          <RHFTextField name="payment_description" label="Description" InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
