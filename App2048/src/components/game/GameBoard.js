import React, { Component } from 'react';
import { View } from 'react-native';
import GameRow from './GameRow';
import { connect } from 'react-redux';
import { swipeUp, swipeDown, swipeLeft, swipeRight, createGame } from '../../actions';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class GameBoard extends Component {      

  componentWillMount() {
    this.props.createGame();
  }

  onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      switch (gestureName) {
        case SWIPE_UP:
          this.props.swipeUp(this.props.gameBoard);
          break;
        case SWIPE_DOWN:
          this.props.swipeDown(this.props.gameBoard);
          break;
        case SWIPE_LEFT:
          this.props.swipeLeft(this.props.gameBoard); 
          break;
        case SWIPE_RIGHT:
          this.props.swipeRight(this.props.gameBoard);
          break;
      }
    }

  render() {   

    const rows = this.props.gameBoard.map(function(row,index){
      return <GameRow key={index} values={row}/>;
    })

    const config = {
      velocityThreshold: 0.2,
      directionalOffsetThreshold: 60
    };

    return (
        
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
      >
        <View style={[styles.parent]}>
          {
            rows
          }
        </View>
      </GestureRecognizer>
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

  const gameBoard = state.game.board;
  
  return { gameBoard };
}

export default connect(mapStateToProps, {swipeUp, swipeDown, swipeRight, swipeLeft, createGame})(GameBoard);
