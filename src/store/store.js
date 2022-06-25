import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../slices/AlbumSlice";
import { applyMiddleware } from 'redux';
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    album:albumReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  
});

