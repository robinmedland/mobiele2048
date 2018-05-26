import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { playersFetch } from '../actions';
import LogoutButton from './LogoutButton';
import PlayerItem from './PlayerItem';

class PlayerList extends Component {  
  componentWillMount() {
    this.createDataSource();
  }
  createDataSource() {
    this.props.playersFetch();
  }

  renderRow(player) {
    return <PlayerItem player={player} />;
  }

 
  render() {
    console.log(this.props);
    return (
      <Card>
        <CardSection>
          <Text style={styles.titleStyle}>Druk op je naam om een spel te starten!</Text>
        </CardSection>
         
        <FlatList 
        data={this.props.players}
        renderItem={this.renderRow}
        keyExtractor={player => player.uid}
        /> 
           
        <LogoutButton />                   
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

const mapStateToProps = state => {
  const players = _.map(state.players, (val, uid) => {
    return { ...val, uid };
  });
  return { players };
};


export default connect(mapStateToProps, { playersFetch })(PlayerList);
