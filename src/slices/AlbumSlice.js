import { createSlice } from "@reduxjs/toolkit";

export const AlbumSlice = createSlice({
  name: "album",
  initialState: {
    value: 4,
    album: [],
    artist: "Your Artist Name"
  },
  reducers: {
    IncreaseLimitBy4: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 4;
    },
    albumArray: (state,array) => {
        state.album.push(array)
    },
    searchArtist: (state) => {
        let target = document.getElementById("outlined-basic");
        state.artist = target.value
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  IncreaseLimitBy4,
  albumArray,
  searchArtist
} = AlbumSlice.actions;

export default AlbumSlice.reducer;