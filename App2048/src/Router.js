import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PlayerList from './components/PlayerList';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        <Scene key="main">
          <Scene
            onRight={() => console.log('right!!!')}
            rightTitle="Add"
            key="playerList"
            component={PlayerList}
            title="Players"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
