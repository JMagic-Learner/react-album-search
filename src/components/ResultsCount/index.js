import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

class ResultsBar extends React.Component {
    render() {
        return<section id="results"> 
        <Typography id="results-display"> Search Albums by {this.props.artist} </Typography>
        <Typography id="results-display"> Limit results to {this.props.limit}</Typography>
        <Typography id="results-display"> Total results: {this.props.number}</Typography>
        </section>
    }

}

export default ResultsBar
