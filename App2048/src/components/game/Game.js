import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Confirm, Button } from '../common';
import GameBoard from '../game/GameBoard';
import { playerDelete } from '../../actions';

class Game extends Component {   
    //Dit is een bug van esslint, code werkt wel
    state = { showDeleteModal: false, showRestartModal: false };
      

    onAcceptDelete() {
        const { uid } = this.props.player.item;
        this.props.playerDelete({ uid });
    }
    onDeclineDelete() {
        this.setState({ showDeleteModal: false });
    }
    onAcceptRestart() {
        console.log('yes');
    }
    onDeclineRestart() {
        this.setState({ showRestartModal: false });
    }

    render() {
        //const { name, highscore } = this.props.player.item;
		const { name, highscore } = {name: 'sven', highscore: 433};
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
                    <Button 
                    onPress={() => 
                    this.setState({ showRestartModal: !this.state.showRestartModal })}
                    >
                       Restart
                    </Button> 
                </CardSection>
                
                <CardSection>
                    <Button 
                    onPress={() => 
                    this.setState({ showDeleteModal: !this.state.showDeleteModal })}
                    >
                        Delete Player
                    </Button>               
                </CardSection>
                <Confirm
                    visible={this.state.showRestartModal}
                    onAccept={this.onAcceptRestart.bind(this)}
                    onDecline={this.onDeclineRestart.bind(this)}

                >
                Do you want to restart the game?
                </Confirm>

                <Confirm
                    visible={this.state.showDeleteModal}
                    onAccept={this.onAcceptDelete.bind(this)}
                    onDecline={this.onDeclineDelete.bind(this)}
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
        paddingLeft: 15               
    },
    highScoreStyle: {
        fontSize: 22,
        paddingLeft: 15,
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
