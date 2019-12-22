import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity,PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
  boldText: {
    fontSize: 30,
    color: 'red',
 },
});
export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'LocationTrack',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      alert("You can use the location");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

export default class App extends Component {
  state = {
    initialPosition: null,
    lastPosition: null,
  };
  async componentWillMount() {
    await requestLocationPermission()
    }

  watchID: ?number = null;

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);

        this.setState({initialPosition});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
   });

  };
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
 }
  
  render() {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.findCoordinates}>
            <Text style={styles.welcome}>Find My Coords?</Text>

            <Text style = {styles.boldText}> Initial position:</Text>
            <Text>Location: {this.state.initialPosition}</Text>

            <Text style = {styles.boldText}> Current position:</Text>
            <Text> Location: {this.state.lastPosition}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
