import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerUpdate, playerCreate } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class PlayerCreate extends Component {
    onButtonPres() {
        const { name } = this.props;

        this.props.playerCreate({ name });
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
                    <Button onPress={this.onButtonPres.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
                
        );
    }
}
const mapStateToProps = (state) => {
    const { name } = state.playerForm;
    return { name };
};

export default connect(mapStateToProps, { playerUpdate, playerCreate })(PlayerCreate);
