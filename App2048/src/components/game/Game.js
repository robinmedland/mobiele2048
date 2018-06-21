import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Confirm, Button } from '../common';
import GameBoard from '../game/GameBoard';
import { setHighscore, endgamevenster, playerDelete, createGame, playerUpdate } from '../../actions';

class Game extends Component {   
    //Dit is een bug van esslint, code werkt wel
    state = { showDeleteModal: false, showRestartModal: false };

    componentDidUpdate() {
        const { highscore } = this.props.player.item;
        const score = this.props.score;        
        if ( score > highscore ) {
            this.fixhighscore();
        }
        
    }
    onAcceptEndGame() {
        
        this.props.createGame();
        this.props.endgamevenster();
    }  

    onDeclineEndGame() {
        
        Actions.playerList();
        this.props.endgamevenster();
    }

    onAcceptDelete() {
        const { uid } = this.props.player.item;
        this.props.playerDelete({ uid });
    }
    onDeclineDelete() {
        this.setState({ showDeleteModal: false });
    }
    onAcceptRestart() {

        this.setState({ showRestartModal: false });
        this.props.createGame();
    }
    onDeclineRestart() {
        this.setState({ showRestartModal: false });
    }
    fixhighscore() {
        const { uid } = this.props.player.item;
        const score = this.props.score;
        this.props.setHighscore(uid, score);
    }

    render() {
        const { name, highscore } = this.props.player.item;
        const score = this.props.score;
        const gameOver = this.props.gameOver;

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
                        {score}
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

                <Confirm
                    visible={gameOver}
                    onAccept={this.onAcceptEndGame.bind(this)}
                    onDecline={this.onDeclineEndGame.bind(this)}
                >
                    !GAME OVER!
                    Do you want to play another game?
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

const mapStateToProps = (state) => {

    const score = state.game.score;
    const gameBoard = state.game.board;
    const gameOver = state.game.gameOver;

    return { score, gameBoard, gameOver };

    
};

export default connect(mapStateToProps, { setHighscore, playerDelete, createGame, endgamevenster, playerUpdate })(Game);