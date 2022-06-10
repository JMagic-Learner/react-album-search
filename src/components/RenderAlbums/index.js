import React from 'react'

class RenderAlbums extends React.Component {
    render() {
        return<div id="results"> 
        <p id="results-display"> Search Albums by {this.props.artist}</p>
        <p id="results-display"> Number of results: {this.props.limit}/{this.props.number}</p>
        </div>
    }

}

export default RenderAlbums