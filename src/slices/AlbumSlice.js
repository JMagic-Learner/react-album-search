import { createSlice } from '@reduxjs/toolkit'



export const AlbumSlice = createSlice({
  name: "album",
  initialState: {
    value: 3,
    albumResults: [],
    artist: "",
    totalResults:0,
    posts: []
  },
  reducers: {
    IncreaseLimitBy3: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 3;
    },
    storeArtist:  (state,action) => {
      state.posts.push(action.payload)
      let target = document.getElementById("outlined-basic");
      state.artist = target.value
    },
    sendArtistRequest: (state,action) => {
      state.posts.push(action.payload)
    },
    resetValue: (state) => {
      state.value = 3
    }

  }
  }
);


// Action creators are generated for each case reducer function
export const {
  IncreaseLimitBy3,
  sendArtistRequest,
  storeArtist,
  resetValue
} = AlbumSlice.actions;



export default AlbumSlice.reducer;