import React, { Component } from 'react';
import GameTile from './GameTile';

class GameRow extends Component {
    renderGameTiles() {
        const tiles = [];
        for (let i = 0; i < 4; i++) {
            tiles.push(
                <GameTile />
            );
        }
        return tiles;
    }
    render() {
        return (
            
               this.renderGameTiles()
            
                
        );
    }    
}
export default GameRow;
