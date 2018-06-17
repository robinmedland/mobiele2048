import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class PlayerItem extends Component {
    onRowPress() {
        console.log('klik');
        Actions.Game({ player: this.props.player });
    }
    render() {
        const { name, highscore } = this.props.player.item;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.nameStyle}>
                            {name}
                        </Text>
                        <Text style={styles.highScoreStyle}>
                            {highscore}
                        </Text>

                    </CardSection>
                </View>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = {
    
    nameStyle: {
        fontSize: 22,
        paddingLeft: 15  
                  
    },
    highScoreStyle: {
        fontSize: 22,
        paddingLeft: 15,
        fontWeight: 'bold'    
        
    }
};

export default PlayerItem;
