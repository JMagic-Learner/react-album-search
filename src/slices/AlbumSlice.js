import { createSlice, MiddlewareArray } from '@reduxjs/toolkit'


let AlbumArray;
let artistSearch;

export const AlbumSlice = createSlice({
  name: "album",
  initialState: {
    value: 3,
    albumResults: "",
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
      artistSearch = target.value
    },
    sendArtistRequest:  (state,action) => {
      state.posts.push(action.payload)
    },
    resetValue: (state) => {
      state.value = 3
    },
    checkInitialState: (state,action) => {
      state.posts.push(action.payload)
      state.albumResults = AlbumArray
      console.log("value", state.value)
      console.log("albumResults", state.albumResults)
      console.log("Artist", state.artist)
    }
    

  }
  }
);


export async function StartProcess() {
  console.log("Albumslice has triggered this function")
  
   const response = await fetch(`https://itunes.apple.com/search?term=${artistSearch}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
   const data = await response.json();
   AlbumArray = data.results
   console.log("StartPRocess has found", AlbumArray)
   console.log("StartPRocess has found", artistSearch)
   return data.results
}

// Action creators are generated for each case reducer function
export const {
  IncreaseLimitBy3,
  sendArtistRequest,
  storeArtist,
  resetValue,
  checkInitialState
} = AlbumSlice.actions;



export default AlbumSlice.reducer;