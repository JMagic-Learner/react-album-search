import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../slices/AlbumSlice";


export default configureStore({
  reducer: {
    album:albumReducer
  }
});