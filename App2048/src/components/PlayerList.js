import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { logOutUser } from '../actions';

class PlayerList extends Component {  
  onButtonPress() {
    console.log('LogOut Clicked');
    this.props.logOutUser();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log Out
      </Button>
    );
  }
  
  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>Druk op je naam om een spel te starten!</Text>
        </CardSection>
        <CardSection>  
          <Text>Player 1</Text>
        </CardSection>
        <CardSection>  
          <Text>Player 2</Text>
        </CardSection> 
        <CardSection>  
          <Text>Player 3</Text>
        </CardSection>     
        <CardSection>
          {this.renderButton()}
        </CardSection>
            
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,    
  }
};
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { logOutUser })(PlayerList);
