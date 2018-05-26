import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardSection, Button, Spinner } from './common';
import { logOutUser } from '../actions';

class LogoutButton extends Component {
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
        <CardSection>
            {this.renderButton()}
        </CardSection>
    );
}
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
  
    return { email, password, error, loading };
  };
  
export default connect(mapStateToProps, { logOutUser })(LogoutButton);
