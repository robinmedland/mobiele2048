import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PlayerList from './components/PlayerList';
import PlayerCreate from './components/PlayerCreate';
import Game from './components/game/Game';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        <Scene key="main">
          <Scene
            onRight={() => Actions.playerCreate()}
            rightTitle="Add"
            key="playerList"
            component={PlayerList}
            title="Players"
            initial
          />
          <Scene 
            key="playerCreate" 
            title="Create Player" 
            component={PlayerCreate}
          />
          <Scene            
            key="Game"
            title="2048 Crush Records"
            component={Game}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
