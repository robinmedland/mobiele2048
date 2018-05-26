import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Confirm, Button } from '../common';
import GameBoard from '../game/GameBoard';
import { playerDelete } from '../../actions';

class Game extends Component {   
    //Dit is een bug van esslint, code werkt wel
    state = { showModal: false };

    onAccept() {
        const { uid } = this.props.player.item;
        this.props.playerDelete({ uid });
    }
    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        const { name, highscore } = this.props.player.item;
        return (
            <Card>
                <CardSection>
                    <Text style={styles.nameStyle}>
                        {name}
                    </Text>
                    <Text style={styles.highScoreStyle}>
                        {highscore}
                    </Text>
                    <Text style={styles.highScoreStyle}>
                        0
                    </Text>
                </CardSection>

                <CardSection>
                    <GameBoard />                    
                </CardSection>
                <CardSection>
                    <Button>
                        Restart Game
                    </Button>
                </CardSection>
                
                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Delete Player
                    </Button>               
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                        Do you want to delete this player?
                </Confirm>


            </Card>
        );
    }
}
const styles = {
    
    nameStyle: {
        fontSize: 22,
        paddingLeft: 15,
        fontFamily: 'Roboto'               
    },
    highScoreStyle: {
        fontSize: 22,
        paddingLeft: 15,
        fontFamily: 'Roboto',
        fontWeight: 'bold'   
    },
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

export default connect(null, { playerDelete })(Game);
