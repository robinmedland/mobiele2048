import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PlayerList extends Component {
  render() {
    return (
      <View>
        <Text>Druk op je naam om een spel te starten!</Text>
        <Text>Player 1</Text>
        <Text>Player 2</Text>
        <Text>Player 3</Text>
        <Text>Player 4</Text>
        <Text>Player 5</Text>
      </View>
    );
  }
}

export default PlayerList;
