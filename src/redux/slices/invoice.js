import { createSlice } from '@reduxjs/toolkit';
// import sum from 'lodash/sum';
// import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
import { dispatch } from '../store';
import { setSession } from '../../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  invoices: [],
  invoice: null,
};

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getSuccess(state, action) {
      state.isLoading = false;
      state.invoice = action.payload;
    },

    // GET PRODUCT
    getAllSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
// export const {
//   getCart,
//   addCart,
//   resetCart,
//   onGotoStep,
//   onBackStep,
//   onNextStep,
//   deleteCart,
//   createBilling,
//   applyShipping,
//   applyDiscount,
//   increaseQuantity,
//   decreaseQuantity,
//   sortByProducts,
//   filterProducts,
// } = slice.actions;

// ----------------------------------------------------------------------

export function getAll() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/inv');
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(slice.actions.getAllSuccess(response.data.data)) )
        }
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDetail(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/inv/${id}`);
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(slice.actions.getSuccess(response.data.data)) )
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addData(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/inv` , data);
      if(response.data){
        if(response.data.token){
          setSession(response.data.token) 
          // Promise.resolve().then( () => setSession(response.data.token) )
          // .then( () => dispatch(getAll()) )
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function editData(id,data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`/api/inv/${id}` , data);
      if(response.data){
        if(response.data.token){
          setSession(response.data.token)
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteData(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/inv/delete` , {id:data});
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(getAll()) )
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addOneData(data) {
  return async () => {
    dispatch(slice.actions.getSuccess(data));
  };
}