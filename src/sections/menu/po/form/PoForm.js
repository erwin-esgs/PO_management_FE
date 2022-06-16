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
import { getAll, addData, editData, getDetail } from '../../../../redux/slices/po';

// ----------------------------------------------------------------------

PoForm.propTypes = {
  text: PropTypes.string,
  formData: PropTypes.object,
};
export default function PoForm({text="" , formData=null}) {

  const dispatch = useDispatch()

  const [numRow , setNumRow] = useState(0)

  const { pts } = useSelector((state) => state.pt);
  const { vendors } = useSelector((state) => state.vendor);
  const { projects } = useSelector((state) => state.project);

  const todayDate = new Date().toISOString().split('T')[0]
  
  const LoginSchema = Yup.object().shape({
    po_number: Yup.string().required('PO Number is required'),// .email('Email must be a valid email address'),
    id_pt: Yup.number().required('PT is required'),
    id_project: Yup.number().required('Project is required'),
    id_vendor: Yup.number().required('Vendor is required'),
    value: Yup.number().min(1, "Must be more than 0").required('Value is required'),
    vat: Yup.number().nullable(true),
    tod: Yup.date().required('Term payment is required'),
    top: Yup.string().nullable(true),
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
    id_pt : pts.length > 0 ? pts[0].id : '',
    id_project : projects.length > 0 ? projects[0].id : '',
    id_vendor : vendors.length > 0 ? vendors[0].id : '',
  }
  
  const defaultValues = {
    po_number: formData?.po_number ? formData.po_number : '',
    id_pt: formData?.id_pt ? formData.id_pt : selectionDefaultValue.id_pt,
    id_project: formData?.id_project ? formData.id_project : selectionDefaultValue.id_project,
    id_vendor: formData?.id_vendor ? formData.id_vendor : selectionDefaultValue.id_vendor,
    value: formData?.value ? formData.value : 0,
    vat: formData?.vat ? formData.vat : 0,
    tod: formData?.tod ? formData.tod : todayDate,
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
      data.tod = new Date(new Date(data.tod).getTime() + 60 * 60 * 7 * 1000).toISOString().split('T')[0]
      
      // console.log(formData?.id , data)
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
            

            <RHFTextField name="po_number" type="text" label="PO Number" />
            
            <RHFSelect
              name="id_pt" label="PT"
            ><>
              {pts.map((value)=> <option key={value.id} value={value.id}>{value.pt_name}</option> )}
              </>
            </RHFSelect>
            <RHFSelect
              name="id_project" label="Project"
            ><>
              {projects.map((value)=> <option key={value.id} value={value.id}>{value.project_code}</option> )}
              </>
            </RHFSelect>

            <RHFSelect
              name="id_vendor" label="Vendor"
            ><>
              {vendors.map((value)=> <option key={value.id} value={value.id}>{value.vendor_name}</option> )}
              </>
            </RHFSelect>
            

            {/* <Box >
            Payment : 
            </Box> */}

          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} justifyContent="center"  alignItems="center"  >
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <RHFTextField name="tod" type="date" label="PO Date" InputLabelProps={{ shrink: true }} />
            <RHFTextField name="top"  label="Payment term" multiline />
            <RHFTextField name="value" type="number" min={0} label="Value" />
            <RHFTextField name="vat" type="number" min={0} label="VAT" />
            {/* <RHFTextField name="description" label="Description (Multiline)" multiline /> */}

          </Stack>
        </Grid>
        <Grid item xs={12}>
        <RHFTextField name="description" label="Description (Multiline)" multiline />
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
