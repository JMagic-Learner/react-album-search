import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import ResultsBar from '../../components/ResultsCount';

let artistInput;

class HomeComponentClass extends React.Component {
    constructor(props){
      super(props);
      this.state={
        renderResult:[],
        leftoverArray:[],
        artistInput:"",
        loadLimit:4,
        resultCount:0
      }
    }
      showInput = async (event) => {
   
      console.log("The end user is typing in a input");
      let target = document.getElementById("textbox-search");
     
    };
  
    submitInput = async (event) => {
      this.setState({
       loadLimit:4
      })
          console.log("The end user is attempting to submit the input value");
          let target = document.getElementById("textbox-search");
          this.state.artistInput = target.value;
          console.log("The end user has designated " + this.state.artistInput + " as the search parameter");
          this.startAPISearch()
        };
  
    startAPISearch = async () => {
      fetch(`https://itunes.apple.com/search?term=${this.state.artistInput}&media=music&entity=album&attribute=artistTerm&limit=200`)
        .then(res=>res.json())
        .then(res=>{
          let totalArray=res.results
          let firstFour = res.results.slice(0,this.state.loadLimit)
          let leftover = res.results
          this.setState({
            renderResult:firstFour,
            resultCount:totalArray.length,
            leftoverArray:leftover
          })
        })
        .catch((err)=>{
          alert('no artist found')
    })}
  
    loadMoreResults = async() => {
      let increase = this.state.loadLimit + 4
      let originalArray = this.state.leftoverArray
      let newArray = originalArray.slice(0,increase);
      this.setState({
       loadLimit: increase,
       renderResult:newArray
      })
    }
  
      loadAllResults = async() => {
        let originalArray = this.state.leftoverArray
        this.setState({
         loadLimit: this.resultCount,
         renderResult:originalArray
        })
      }
  
  
    render() {
      return   (<div>
           <div className="banner">
            <h1 className="main-title"> Album Search </h1>
          <nav className="post-submit">
               <textarea name="search-artist"
                placeholder="Type in Artist name"
                id="textbox-search"
                onChange={this.showInput}>
              </textarea>
              {/* <input type="text" id="textbox-search"> </input> */}
              <button id="submit" onClick={this.submitInput}> Search for your Artist</button>
              {/* <button id="refresh"><a href="" > Refresh/Clear Search </a></button> */}
            </nav>
            <ResultsBar number={this.state.resultCount} artist={this.state.artistInput} limit={this.state.loadLimit}  />
            <div id="load-display">
            
          </div>
          </div>
      
      
      
          <div id="content-body">
            {this.state.renderResult.map((element) => {
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
            <button className="load-more-button" onClick={this.loadMoreResults}>Load More</button>
           <button className="load-all-button" onClick={this.loadAllResults}> Load All </button>
          </div>
        </div>
        )
      }
    }


export default HomeComponentClass