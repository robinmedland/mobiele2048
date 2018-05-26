import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerUpdate, playerCreate } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class PlayerCreate extends Component {
    onButtonPress() {        
        const { name, highscore } = this.props;           
        this.props.playerCreate({ name, highscore });         
    }
    renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
    
        return (
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        );
      }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="MightyPlayer"
                        value={this.props.name}
                        onChangeText={value => 
                        this.props.playerUpdate({ prop: 'name', value })}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
                
        );
    }
}
const mapStateToProps = (state) => {
    const { name, loading, highscore } = state.playerForm;
    return { name, loading, highscore };
};

export default connect(mapStateToProps, { playerUpdate, playerCreate })(PlayerCreate);
