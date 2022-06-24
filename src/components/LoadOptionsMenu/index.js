import React from 'react'
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { IncreaseLimitBy4, albumArray } from "../../slices/AlbumSlice"
const LoadOptionsMenu = (props) => {
    const dispatch = useDispatch();
    
    return( 
    <Stack spacing={2} direction="row">    
    <Button className="load-more-button" onClick={() => dispatch(IncreaseLimitBy4())}>Load More</Button>
    <Button className="load-all-button" onClick={props.loadAll}> Load All </Button>
    </Stack>
    )
}

export default LoadOptionsMenu