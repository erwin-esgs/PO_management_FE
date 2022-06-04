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
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox, RHFSelect, RHFEditor } from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getAll, addData, editData, getDetail } from '../../../../redux/slices/invoice';

// ----------------------------------------------------------------------

PoForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function PoForm({text="" , formData=null}) {

  const dispatch = useDispatch()

  const [numRow , setNumRow] = useState(0)

  const { pos } = useSelector((state) => state.po);
  const { pts } = useSelector((state) => state.pt);
  const { vendors } = useSelector((state) => state.vendor);
  const { projects } = useSelector((state) => state.project);

  const todayDate = new Date().toISOString().split('T')[0]
  
  const LoginSchema = Yup.object().shape({
    inv_number: Yup.string().required('INV number is required'),
    id_po: Yup.number().required('PO is required'),// .email('Email must be a valid email address'),
    id_project: Yup.number().required('Project is required'),
    due_date: Yup.date().required('Date is required'),
    value: Yup.number().min(1, "Must be more than 0").required('Value is required'),
    vat: Yup.number().nullable(true),
    description: Yup.string().nullable(true),
    payment: Yup.array().of(
      Yup.object().shape({
        percentage: Yup.number().min(1, "Must be more than 0").max(100, "Must be lower than 100").required('The value is mendatory'),
        due_date: Yup.date().required('The value is mendatory'),
        description: Yup.string().nullable(true),
      }),
    ),
  });

  const selectionDefaultValue = {
    id_project : projects.length > 0 ? projects[0].id : '',
    id_vendor : vendors.length > 0 ? vendors[0].id : '',
    id_po : pos.length > 0 ? pos[0].id : '',
  }
  
  const defaultValues = {
    inv_number: formData?.inv_number ? formData.inv_number : '',
    id_project: formData?.id_project ? formData.id_project : selectionDefaultValue.id_project,
    // id_vendor: formData?.id_vendor ? formData.id_vendor : selectionDefaultValue.id_vendor,
    id_po: formData?.id_po ? formData.id_po : selectionDefaultValue.id_po,
    value: formData?.value ? formData.value : 0,
    vat: formData?.vat ? formData.vat : 0,
    due_date: formData?.due_date ? formData.due_date : todayDate,
    top: formData?.top ? formData.top : '',
    description: formData?.description ? formData.description : '',
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
      // console.log(formData?.id, data)
      data.due_date = new Date(new Date(data.due_date).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
      // WITH PERCENTAGE
      /* 
      let percent = 0 
      if( data.payment ){
        data.payment.forEach((v,i)=>{
          data.payment[i].due_date = new Date(new Date(v.due_date).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
          percent += data.payment[i].percentage
        })
        data.payment = JSON.stringify(data.payment)
      }
      if (percent === 100){
        Promise.resolve().then( () => {
          if(formData){
            return dispatch(editData(formData.id, data))
          }
          return dispatch(addData(data))
        } )
        .then( () => dispatch(getAll()) )
        
      }else{
        alert("Total percent not 100%")
      }
      */

      Promise.resolve().then( () => {
        if(formData){
          return dispatch(editData(formData.id, data))
        }
        return dispatch(addData(data))
      } )
      .then( () => dispatch(getAll()) )
      
      // console.log(data)
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  const addRow = () => {
    console.log("asd")
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography align="center" variant="h6" sx={{ my: 1 }} >
      {text}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
        <Stack spacing={2} >
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} 
            

            <RHFTextField name="inv_number" type="text" label="Invoice Number" />
            <RHFTextField name="due_date" type="date" label="Due Date" InputLabelProps={{ shrink: true }} />
            <RHFSelect
              name="id_po" label="po"
            ><>
              {pos.map((value)=> <option key={value.id} value={value.id}>{value.po_number}</option> )}
              </>
            </RHFSelect>

            

            {/* <RHFSelect
              name="id_vendor" label="Vendor"
            ><>
              {vendors.map((value)=> <option key={value.id} value={value.id}>{value.vendor_name}</option> )}
              </>
            </RHFSelect> */}
            

            {/* <Box >
            Payment : 
            </Box> */}

          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} justifyContent="center"  alignItems="center"  >
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <RHFSelect
              name="id_project" label="Project"
            ><>
              {projects.map((value)=> <option key={value.id} value={value.id}>{value.project_code}</option> )}
              </>
            </RHFSelect>
            <RHFTextField name="value" type="number" min={0} label="Value" />
            <RHFTextField name="vat" type="number" min={0} label="VAT" />
            

          </Stack>
        </Grid>
        <Grid item xs={12}>
        <RHFTextField name="description" label="Description" multiline />
        {/* {(() => {
          let options = [];
          for (let i = 0; i <= numRow; i++) {
            options.push(
            <Grid key={i} item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField name={`payment[${i}]percentage`} {...register(`payment.${i}.percentage`)} type="number" min={0} label="Payment Percentage"
                    error={ errors.payment ? errors.payment.some(x => x.percentage !== undefined ) : false }
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField name={`payment[${i}]due_date`} {...register(`payment.${i}.due_date`)} type="date" min={0} label="Date"
                     InputLabelProps={{ shrink: true }}
                     error={ errors.payment ? errors.payment.some(x => x.due_date !== undefined ) : false }
                     />
                </Grid>
                <Grid item xs={4}>
                    <TextField name={`payment[${i}]description`} {...register(`payment.${i}.description`)} type="text" min={0} label="Description" />
                </Grid>
              </Grid>
            </Grid>
            );
          }
          return options;
        })()} */}
        </Grid>
        
      </Grid>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
    </FormProvider>
  );
}
