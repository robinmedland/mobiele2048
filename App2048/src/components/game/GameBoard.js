import React, { Component } from 'react';
import { View } from 'react-native';


class GameBoard extends Component {    
    render() {        
        return (
                
                <View style={[styles.parent]}>
                <View style={[styles.child, { backgroundColor: '#996666' }]} />
                <View style={[styles.child, { backgroundColor: '#339966' }]} />
                <View style={[styles.child, { backgroundColor: '#996633' }]} />
                <View style={[styles.child, { backgroundColor: '#669933' }]} />
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
    child: {
        width: '48%', 
        margin: '1%', 
        aspectRatio: 1,
    }
};

export default GameBoard;
