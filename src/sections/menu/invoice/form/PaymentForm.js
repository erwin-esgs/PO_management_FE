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
import { Stack, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { editData, getDetail } from '../../../../redux/slices/po';
// import { description } from 'src/_mocks/text';

// ----------------------------------------------------------------------

PaymentForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
  selectedIndex: PropTypes.number,
};
export default function PaymentForm({text="" ,  selectedIndex=null}) {

  const dispatch = useDispatch()
  const { po } = useSelector((state) =>  state.po );
  
  let payment = JSON.parse( po.payment )

  // const [paymentNumber , setPaymentNumber] = useState(0);

  

  const todayDate = new Date().toISOString().split('T')[0]
  
  const LoginSchema = Yup.object().shape({
    payment_date: Yup.date().required("Date is required"),
  });

  const defaultValues = {
    payment_date: todayDate,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    // setError,
    handleSubmit,
    // register,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {  
    try {
      const payment_date = new Date(new Date(data.payment_date).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
      payment[selectedIndex].payment_date = payment_date

      Promise.resolve().then( () => dispatch(editData(po.id, { payment: JSON.stringify(payment) })) )
      .then( () =>  dispatch(getDetail(po.id))  )
      
      // const obj = {
      //   percentage: data.percentage,
      //   // payment_date: new Date(data.payment_date).toISOString().split('T')[0],
      //   description: data.description ? data.description : ''
      // }
      // payment.push(obj)
      // console.log()
      // Promise.resolve().then( () => dispatch(editData(po.id, { payment: JSON.stringify(payment) })) )
      // .then( () =>  dispatch(getDetail(po.id))  )
      
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  // const handleCustomOnChange = (data)=>{
  //   if(po){
  //     // setPaymentNumber( data.target.value * po.value / 100)
  //     setPaymentNumber( data.value * po.value / 100)
  //   }
  // }

  // const percentage = register('percentage')

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography align="center" variant="h6" sx={{ my: 1 }} >
      {text}
      </Typography>
      <Stack spacing={3}>
        <RHFTextField name="payment_date" type="date" label="Payment Date" InputLabelProps={{ shrink: true }} />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
