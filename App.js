import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


export default class App extends Component {
  state = {
    location: null,
  };
  render() {
    return (
      <>
        <View style={styles.container}>
            <Text style={styles.welcome}>Find My Coords?</Text>
            <Text>Location: {this.state.location}</Text>
        </View>
      </>
    );
  }
}
