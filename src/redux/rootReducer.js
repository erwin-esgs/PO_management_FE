import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import ptReducer from './slices/pt';
import ptProject from './slices/project';
import vendorReducer from './slices/vendor';
import userReducer from './slices/user';
import poReducer from './slices/po';
import invoiceReducer from './slices/invoice';
import dashboardReducer from './slices/dashboard';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  pt : ptReducer,
  project : ptProject,
  vendor : vendorReducer,
  po : poReducer,
  user : userReducer,
  invoice : invoiceReducer,
  dashboard : dashboardReducer,
});

export { rootPersistConfig, rootReducer };
