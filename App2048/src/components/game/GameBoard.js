import React, { Component } from 'react';
import { View } from 'react-native';
import GameRow from './GameRow';


class GameBoard extends Component {
    renderGameRows() {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push(
                <GameRow key={i} />
            );
        }
        return rows;
    }        
    render() {        
        return (
                
                <View style={[styles.parent]}>
                    {this.renderGameRows()}
                </View>
              
        );
    }
}
const styles = { 
    parent: {
        width: '100%', 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
};

export default GameBoard;
