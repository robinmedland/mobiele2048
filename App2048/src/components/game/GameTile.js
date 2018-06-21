import React, { Component } from 'react';
import { View, Text } from 'react-native';

class GameTile extends Component {

    render() {
        const { value } = this.props;
        
        return (
            <View style={[styles.child, styles[`tile${value}`]]}>
                <Text style={styles.tileText}>{value === 0 ? '' : value}</Text>
            </View>
        );
    }    
}
const styles = { 
    child: {
        width: '23%', 
        margin: '1%', 
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    tileText: {        
        fontSize: 30,
        fontWeight: 'bold',
        
    },
    tile0: {
        backgroundColor: '#c9ede5'
    }, 
    tile2: {
        backgroundColor: '#7fc6b7'
    },
    tile4: {
        backgroundColor: '#4a82a5'
    },
    tile8: {
        backgroundColor: '#4456af'
    },
    tile16: {
        backgroundColor: '#4927ad'
    },
    tile32: {
        backgroundColor: '#511372'
    },
    tile64: {
        backgroundColor: '#721247'
    },
    tile128: {
        backgroundColor: '#d10a1b'
    },
    tile256: {
        backgroundColor: '#48ea1c'
    },
    tile512: {
        backgroundColor: '#48ea1c'
    },
    tile1024: {
        backgroundColor: '#5e5407'
    },
    tile2048:{
        backgroundColor: '#5e5407'
    }

};

export default GameTile;

