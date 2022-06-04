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
  pos: [],
  po: null,
  sortBy: null,
};

const slice = createSlice({
  name: 'po',
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
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.pos = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.po = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
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
      const response = await axios.get('/api/po');
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(slice.actions.getProductsSuccess(response.data.data)) )
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
      const response = await axios.get(`/api/po/${id}`);
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(slice.actions.getProductSuccess(response.data.data)) )
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
      const response = await axios.post(`/api/po` , data);
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
      const response = await axios.patch(`/api/po/${id}` , data);
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
      const response = await axios.post(`/api/po/delete` , {id:data});
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
    dispatch(slice.actions.getProductSuccess(data));
  };
}