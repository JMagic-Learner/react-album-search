import React from 'react'

class ResultsBar extends React.Component {
    render() {
        return<div id="results"> 
        <p id="results-display"> Search Albums by {this.props.artist}</p>
        <p id="results-display"> Limit results to {this.props.limit}</p>
        <p id="results-display"> Total results: {this.props.number}</p>
        </div>
    }

}

export default ResultsBar
