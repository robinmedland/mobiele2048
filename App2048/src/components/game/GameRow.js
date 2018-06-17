import React, { Component } from 'react';
import GameTile from './GameTile';

class GameRow extends Component {
	
	constructor(props){
		super(props);
		
		this.values = this.props.values;
	}
	
    renderGameTiles() {
        const tiles = [];
        for (let i = 0; i < this.values.length; i++) {
            tiles.push(
                <GameTile key={i} value={this.values[i]}/>
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
