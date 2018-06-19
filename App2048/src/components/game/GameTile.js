import React, { Component } from 'react';
import { View, Text } from 'react-native';

class GameTile extends Component {
    render() {
		const { value } = this.props;
        return (
            <View style={styles.child}>
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
        backgroundColor: '#ADD8E6',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    tileText: {        
        fontSize: 30,
        fontWeight: 'bold',
        
    }

};

export default GameTile;

