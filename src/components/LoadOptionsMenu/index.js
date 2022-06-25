import React from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";

const LoadOptionsMenu = (props) => {
    const dispatch = useDispatch();
    
    return( 
    <div >
    <Stack id="load-options" spacing={2} direction="row">    
    <Button className="load-more-button" onClick={props.loadmore}>Load More</Button>
    <Button className="load-all-button" onClick={props.loadAll}> Load All </Button>
    </Stack>
    </div>
    )
}

export default LoadOptionsMenu