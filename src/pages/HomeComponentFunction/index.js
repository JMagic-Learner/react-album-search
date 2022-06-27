import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import ResultsBar from '../../components/ResultsCount';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// MUI IMPORTS
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// COMPONENT IMPORTS
import MediaCard from "../../components/MediaCard";
import LoadOptionsMenu from '../../components/LoadOptionsMenu'
// THUNK IMPORT
import {  
  IncreaseLimitBy3,
  sendArtistRequest,
  storeArtist,
  resetValue,
  checkInitialState,
  StartProcess } from "../../slices/AlbumSlice"
import { StartAPISearch } from "../../api";



// Using function REACT 
const HomeComponentFunction = () => {
  const searchLimit = useSelector((state) => state.album.value);
  const artistInput = useSelector((state) => state.album.artist);
  // const globalAlbums = useSelector((state) => state.album.albumResults);
  const dispatch = useDispatch();


  const [renderResult, setRenderResult] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [renderLimit, setRenderLimit] = useState(searchLimit)
 
  
  const startAPISearch = async () => {
    dispatch(resetValue({type:"album/reset"}))
    setRenderLimit(3)
    // let returnedFromAPI = StartAPISearch(artistInput)
    // setResultCount(returnedFromAPI.length)
    // setRenderResult(returnedFromAPI)
    console.log("We are starting the API search function")
    console.log("We are going to catalogue all prior values before this search");
    console.log("This is the state value of artist: ", artistInput)
    console.log("This is the state value of your searchLimit: ", searchLimit)
    const response = await fetch(`https://itunes.apple.com/search?term=${artistInput}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    // const response = await fetch(`https://itunes.apple.com/search?term=${artistInput}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    const totalResults =  data.results;
   setResultCount(totalResults.length); // set resultCount to the length of the totalResults array
   setRenderResult(totalResults);
  }


    const loadAllResults = () => {
        setRenderLimit(resultCount)
    }

    const loadMore = () => {
      dispatch(IncreaseLimitBy3({type:"album/loadMore"}))
      setRenderLimit(searchLimit + 3 )
    }

    const BeginSearchProcess = () => {
      dispatch(sendArtistRequest({ type: "album/search" }))
      dispatch(checkInitialState({ type: "album/statusReport" }))
      startAPISearch()
      
    }


  return (
  <div>
    <div className="banner">
    <Box className="search-bar-container">
      <Typography variant="h2" className="main-title"> Album Search </Typography>
 
      
      
          
          <TextField 
          className="search-artist" 
          id="outlined-basic" 
          placeholder="Type in Artist name" 
          onChange={() => dispatch(storeArtist({ type: "album/store" }))}
          />
         
          

          <ResultsBar number={resultCount} artist={artistInput} limit={renderLimit}  />
      
        <Button 
          id="submit-button" 
          onClick={
            () => BeginSearchProcess()
            }> 
          Search for your Artist
          </Button>
          </Box>  
    </div>



    <div id="content-body">
    <Grid container spacing={2} > 
        {renderResult.map((element,index)=> { if (index< renderLimit ) {
          return(
            <Grid item sx={2} md={2} lg={2} >
            <MediaCard  
            title={element.artistName}
            description={element.collectionName}
            imageSource={element.artworkUrl100}
            />
            </Grid>
          )}
      })}
       {/* </>
      )} */}
       
      
    
     
   </Grid>
    </div>

    {resultCount > 0? (
      <>
      <LoadOptionsMenu loadAll={loadAllResults} loadmore={loadMore}/>
  
    </>
    ) : (
      
      <Typography> Search for your artists</Typography>
    )}
   </div>
  )
}




export default HomeComponentFunction;