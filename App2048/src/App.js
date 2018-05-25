import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
          apiKey: 'AIzaSyDhDNNDgnD_7g6Fwd1h8mO_VMxeJFXptMY',
          authDomain: 'app2048-bfb84.firebaseapp.com',
          databaseURL: 'https://app2048-bfb84.firebaseio.com',
          projectId: 'app2048-bfb84',
          storageBucket: 'app2048-bfb84.appspot.com', 
          messagingSenderId: '428725390564'
        };
    
        firebase.initializeApp(config);
      }
    
      render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
        return (
          <Provider store={store}>
            <Router />
          </Provider>
        );
      }
    }
    
    export default App;
