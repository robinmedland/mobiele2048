import React, { Component } from 'react';
import { View } from 'react-native';
import GameRow from './GameRow';
import { connect } from 'react-redux';

class GameBoard extends Component {
    render() {
				const rows = this.props.gameBoard.map(function(row,index){
				return <GameRow key={index} values={row}/>;
				})
        return (
			<View style={[styles.parent]}>
			{
			rows
			}
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

const mapStateToProps = (state) => {

// const gameBoard = state.gameBoard;
const gameBoard = [[5,4,3,1],[3,5,2,6],[4,5,23,65],[34,56,234,543]];
return { gameBoard };
}

export default connect(mapStateToProps, null)(GameBoard);
