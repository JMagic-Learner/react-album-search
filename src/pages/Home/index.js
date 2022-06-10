import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import ResultsBar from '../../components/ResultsCount';

let artistInput;







// function generateList(jsonData) {
//   let arrayLevel1 = jsonData.results;
//   let arrayTest=[];
//   console.log("We have in the generateList");
//   console.log(arrayLevel1);
// }

//   if (arrayLevel1.length===loadLimit) { // If the first results match the load limit, or if the load all was clicked.
//     load_body.innerHTML="";
//     for (let i = 0; i <= loadLimit-1; i++) {
//       arrayTest.push(arrayLevel1[i]);
//     }
//   } else if (arrayLevel1.length >= loadLimit ) {

//     for (let i = 0; i <= loadLimit-1; i++) {
//       arrayTest.push(arrayLevel1[i]);
//     }
//   createLoadButton();
//   loadMoreResults();
//   loadAllResults(arrayLevel1.length);
//   } else {
//     console.log("We have found no other results");
//     load_body.innerHTML="";   // If there are no more results to load, do not display the load_body
//     for (let i = 0; i < arrayLevel1.length; i++ ) {
//       arrayTest.push(arrayLevel1[i]);
//     }


//   }
//   console.log(arrayTest);
//   console.log(jsonData)
//   let numberResults = arrayLevel1.length
//   results_body.innerHTML = `Results Found: ${arrayTest.length} / ${numberResults} for ${artistInput}`;
//   createResultsDisplay(arrayTest);

// }

// function createLoadButton() {
//   let LoadMore = document.createElement('button')
//   let LoadAll = document.createElement('button')
//   let loadContainer = document.createElement('div')
//   load_body.innerHTML="";
//   LoadMore.innerHTML="Load More";
//   LoadAll.innerHTML="Load All";
//   load_body.appendChild(loadContainer);
//   loadContainer.appendChild(LoadMore);
//   loadContainer.appendChild(LoadAll);
//   LoadMore.classList.add("load-more-button");
//   LoadAll.classList.add("load-all-button");
//   loadContainer.classList.add("load-more-container");
// }



// function loadAllResults(length) {
//   let AllButton = document.querySelector('.load-all-button');
//   console.log("LoadAllResults have been clicked");
//   AllButton.addEventListener('click', () => {
//   loadLimit = length;
//   renderHTML();
//   })
// }






const Home = () => {
  const [postResult, setPostResult] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [loadLimit, setloadLimit] = useState(4)
  const [arrayHold, setArrayHold] = useState([]);

  let limitedArray = [];
  let renderThisArray = [];
  const startAPISearch = async () => {

    console.log("testing the value");
    const response = await fetch(`https://itunes.apple.com/search?term=${artistInput}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    const totalResults = await data.results;
    const totalResultsSpliced = await totalResults.splice(0,loadLimit);
    setArrayHold(totalResults);
    setResultCount(totalResults.length);
    console.log(loadLimit);
    limitedArray = totalResults;
    
      for (let i = 0; i < loadLimit; i++) {
        console.log("this is the limited array", limitedArray[i]);
        console.log("Lets push this this limited set to renderThisArray", renderThisArray.push(limitedArray[i]))
      }
      console.log(renderThisArray);
      setPostResult(totalResultsSpliced);
      // setPostResult(totalResults);
  }



  useEffect(() => {
    startAPISearch()
  }, [])

  useEffect(() => {
    submitInput();
  }, [])

  const showInput = async (event) => {
 
    console.log("The end user is typing in a input");
    let target = document.getElementById("textbox-search");
   
  };

  const submitInput = async (event) => {
    console.log("The end user is attempting to submit the input value");
    let target = document.getElementById("textbox-search");
    artistInput = target.value;
    console.log("The end user has designated " + artistInput + " as the search parameter");
    startAPISearch()
  };

 const loadMoreResults = async() => {
      
  limitedArray = await arrayHold;
  console.log("This is the limited array", limitedArray);
  limitedArray = await limitedArray.splice(0,loadLimit+4);
  console.log("This is the limited array after splice", limitedArray)
  setloadLimit(loadLimit+4);
  setPostResult(limitedArray);
      // for (let i = 0; i < loadLimit; i++) {
      //   console.log("this is the limited array", arrayHold[i]);
      //   console.log("Lets push this this limited set to renderThisArray", renderThisArray.push(arrayHold[i]))
      // }
      // setPostResult(renderThisArray);   
  }



const loadAllResults = async() => {

  limitedArray = await arrayHold;
  console.log("This is the limited array", limitedArray);
  setloadLimit(resultCount);
  setPostResult(arrayHold);;
    }




  return (<div>
    <div className="banner">
      <h1 className="main-title"> Album Search </h1>
      <nav className="post-submit">
        <textarea name="search-artist"
          placeholder="Type in Artist name"
          id="textbox-search"
          onChange={showInput}>
        </textarea>
        {/* <input type="text" id="textbox-search"> </input> */}
        <button id="submit" onClick={submitInput}> Search for your Artist</button>
        {/* <button id="refresh"><a href="" > Refresh/Clear Search </a></button> */}
      </nav>
      <ResultsBar number={resultCount} artist={artistInput} limit={loadLimit}  />
      <div id="load-display">
      
    </div>
    </div>



    <div id="content-body">
      {postResult.map((element) => {
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
    <div className="load-more-container">
          <button className="load-more-button" onClick={loadMoreResults}>Load More</button>
          <button className="load-all-button" onClick={loadAllResults}> Load All </button>
        </div>
  </div>
  )
}




export default Home;