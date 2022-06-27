import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../slices/AlbumSlice";
import { StartAPISearch } from '../api/index'
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    album:albumReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    thunk: {
      extraArgument: StartAPISearch
    },
    serializableCheck: false,
  }).concat(logger),
  
});

