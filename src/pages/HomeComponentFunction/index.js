import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { IncreaseLimitBy4, albumArray, searchArtist } from "../../slices/AlbumSlice"
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



// Using function REACT 
const HomeComponentFunction = () => {
  const searchLimit = useSelector((state) => state.album.value);
  const artistInput = useSelector((state) => state.album.artist);
  // const totalResults = useSelector((state) => state.album.totalResults)
  // const allAlbums = useSelector((state) => state.album.albumResults)
  const dispatch = useDispatch();

  const [renderResult, setRenderResult] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [arrayHold, setArrayHold] = useState([]);
  const [status, setStatus] = useState(0);
  let localLimit = searchLimit
  
  
  const startAPISearch = async () => {
    setStatus(0)
    localLimit = 4;
    let artistSearch = artistInput
    console.log("We are starting the API search function")
    console.log("We are going to catalogue all prior values before this search");
    console.log("This is the state value of artist: ", artistInput)
    console.log("This is the state value of artist: ", artistSearch)
    console.log("This is the state value of your searchLimit: ", searchLimit)
    const response = await fetch(`https://itunes.apple.com/search?term=${artistInput}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    const totalResults =  data.results;
   setResultCount(totalResults.length); // set resultCount to the length of the totalResults array
   setArrayHold(totalResults); // Store the total array
   setRenderResult(totalResults);
  }


const loadAllResults = () => {
        setStatus(1)
    }


  return (
  <div>
    <div className="banner">
      <Typography variant="h2" className="main-title"> Album Search </Typography>
 
      
        <Card  className="post-submit" >
          <TextField className="search-artist" id="outlined-basic" label="Begin your search" variant="outlined"  placeholder="Type in Artist name"/>
          <Button id="submit" onClick={() => dispatch(searchArtist()).then(startAPISearch())}> Search for your Artist</Button>
          <ResultsBar number={resultCount} artist={artistInput} limit={searchLimit}  />
        </Card>
    </div>



    <div id="content-body">
    <Grid container spacing={2} > 
      {status === 1 ? (
        <>
      {renderResult.map((element)=> { 
          return(
            <Grid item sx={2} md={2} lg={2} >
            <MediaCard  
            title={element.artistName}
            description={element.collectionName}
            imageSource={element.artworkUrl100}
            />
            </Grid>
          )
      })}
        </>
      ) : (
        <>
        {renderResult.map((element,index)=> { if (index< localLimit ) {
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
       </>
      )}
       
      
    
     
   </Grid>
    </div>

    {resultCount > 0? (
      <>
      <LoadOptionsMenu loadAll={loadAllResults}/>
  
    </>
    ) : (
      
      <Typography> Search for your artists</Typography>
    )}
   </div>
  )
}




export default HomeComponentFunction;