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
  isLoadingRow: false,
  startDate:undefined,
  endDate:undefined,
  error: null,
  totalPo: 0,
  totalPayment: 0,
  totalOutstanding: 0,
  totalVat: 0,
  listPt: [],
  listPo : []
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingRow(state) {
      state.isLoadingRow = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    setDatas(state, action) {
      state.isLoading = false;
      state.totalPo = action.payload.total_po;
      state.totalPayment = action.payload.total_payment;
      state.totalOutstanding = action.payload.total_outstanding;
      state.totalVat = action.payload.total_vat;
      state.listPt = action.payload.pt;
    },

    // SET DATE
    setStartEndDate(state, action) {
      state.startDate = action.payload.startDate ;
      state.endDate = action.payload.endDate ;
      state.isLoadingRow = false;
    },


  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setStartEndDate
} = slice.actions;

// ----------------------------------------------------------------------

export function getDatas(data=null) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/dashboard' , data);
      if(response.data){
        if(response.data.token){
          Promise.resolve().then( () => setSession(response.data.token) )
          .then( () => dispatch(slice.actions.setDatas(response.data.data)) )
        }
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
