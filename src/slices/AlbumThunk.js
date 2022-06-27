import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import {  
    IncreaseLimitBy4,
    sendArtistRequest,
    storeArtist,
    beginProcess } from "./AlbumSlice"

function StartProcess() {
   return console.log("Albumslice has triggered this function")
}


export default StartProcess
