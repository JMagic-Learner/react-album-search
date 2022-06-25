import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import {  
    IncreaseLimitBy4,
    sendArtistRequest,
    storeArtist,
    beginProcess } from "./AlbumSlice"


export function MiddleWare() {
    const searchLimit = useSelector((state) => state.album.value);
    console.log(searchLimit)
    return searchLimit
}

