import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import {  
    IncreaseLimitBy3,
    sendArtistRequest,
    storeArtist,
    resetValue,
    checkInitialState,
    StartProcess } from "../slices/AlbumSlice"

  export async function StartAPISearch(target) {
    const response = await fetch(`https://itunes.apple.com/search?term=${target}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
    const data = await response.json();
    const totalResults =  data.results;
    console.log(totalResults)
    return totalResults
  }


