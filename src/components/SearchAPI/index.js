import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

const SearchAPI = () => {
    const [postResult, setPostResult] = useState([])
    let searchValue = this.props.artist
  const startAPISearch = async()=> {
    console.log("testing the value");
    const response = await fetch(`https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    setPostResult(data.results)
    // console.log(data.results);
    console.log(postResult);
    console.log(postResult.length);
      }
  
  useEffect(() => {
  startAPISearch()
      }, [])
    

return (<div id="content-body"> 
{postResult.map((element) => {
    if (element) {
      console.log("We have detected an element");
    }
    if (element.artistName) {
      console.log("we have detected an element artistname");
      console.log(element.artistName)
      console.log(element.collectionName)
    }
    return (
    <div className="album-body"> 
      <div className="album-container">
        <img className="container-child" src={element.artworkUrl100}></img>
        </div>
      <div className="album-container2">
        <ul>
          <li className="container-child"> {element.artistName}</li>
          <li className="container-child"> {element.collectionName}</li>
        </ul>
        </div>
      
      
      </div>)
      
    
  })}
  </div>
)
}

export default SearchAPI;