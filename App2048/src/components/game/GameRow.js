import React, { Component } from 'react';
import GameTile from './GameTile';

class GameRow extends Component {

  renderGameTiles(values) {
    const tiles = [];
    for (let i = 0; i < values.length; i++) {
        tiles.push(
            <GameTile key={i} value={values[i]}/>
        );
    }
    return tiles;
  }
  render() {
    const { values } = this.props;
    
    return (
        
      this.renderGameTiles(values)
            
    );
  }    
}
export default GameRow;
