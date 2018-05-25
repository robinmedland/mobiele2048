import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';

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
    return (
        <Provider store={createStore(reducers)}>
            <View>
                <Text>
                    Hello!
                </Text>
            </View>
        </Provider>
    );
}
}
export default App;
