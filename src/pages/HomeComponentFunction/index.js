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
  const dispatch = useDispatch();


  const [renderResult, setRenderResult] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [loadLimit, setloadLimit] = useState(searchLimit)
  const [arrayHold, setArrayHold] = useState([]);
  const [initialValue, setInitialValue] = useState(artistInput)
  const [artistDisplay, setArtistDisplay] = useState();

  const startAPISearch = async () => {
    console.log(artistInput)
    const response = await fetch(`https://itunes.apple.com/search?term=${artistDisplay}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    const totalResults = data.results;
    setResultCount(totalResults.length); // set resultCount to the length of the totalResults array
    setArrayHold(totalResults); // Store the total array
    console.log("This is the array of the original search" ,arrayHold);
    const totalResultsSpliced = await totalResults.splice(0,searchLimit); // Create new array to generate the first 4 items.
    setRenderResult(totalResultsSpliced);
  }


  useEffect(() => {
    console.log("we have detected a change in initialVlaue")
    console.log(artistInput);
    console.log(searchLimit)
  }, [initialValue])



  useEffect(() => {
  console.log("This is the album array", albumArray)
  console.log("This is the searchLimit from Redux", searchLimit)
  console.log("LoadLimit has changed" ,loadLimit)
  let combinedArray = renderResult.concat(arrayHold);
  let resolvedArray = combinedArray.splice(0,loadLimit);
  setArrayHold(combinedArray);
  setRenderResult(resolvedArray);
  }, [loadLimit])



  // const submitInput = async (event) => {
  //   // setloadLimit(4);
   
  //   console.log("The end user is attempting to submit the input value");
  //   let target = document.getElementById("outlined-basic");
  //   artistInput = target.value;
  //   () => dispatch(searchArtist(artistInput))
  //   console.log("The end user has designated " + artistInput + " as the search parameter");
  //   startAPISearch()
    
  // };
const beginSearchProcess = () =>{
  setArtistDisplay(artistInput) 
  startAPISearch();
}


const loadAllResults = async() => {

  // let previousResults = await renderResult;
  // let pendingResults = await arrayHold;
  // console.log("This is the array from the previous search, previousResults", previousResults);
  // console.log("This is the array that needs to be joined previousResults", pendingResults)
   let combinedArray = renderResult.concat(arrayHold);
  setRenderResult(combinedArray);
    }




  return (
  <div>
    <div className="banner">
      <Typography variant="h2" className="main-title"> Album Search </Typography>
 
      
          <Card  className="post-submit" >
          <TextField className="search-artist" id="outlined-basic" label="Begin your search" variant="outlined"  placeholder="Type in Artist name"/>
          <Button id="submit" onClick={() => dispatch(searchArtist()).then( beginSearchProcess())}> Search for your Artist</Button>

        
        {/* <button id="refresh"><a href="" > Refresh/Clear Search </a></button> */}
        
      
     
      <ResultsBar number={resultCount} artist={artistDisplay} limit={searchLimit}  />
      </Card>
    </div>



    <div id="content-body">
    <Grid container spacing={2} > 
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