

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import wifi from 'react-native-android-wifi';

export async function ACCESS_COARSE_LOCATION() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Wifi networks',
        message: 'We need your permission in order to find wifi networks',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Thank you for your permission! :)');
    } else {
      console.log('You will not able to retrieve wifi available networks list');
    }
  } catch (err) {
    console.warn(err);
  }
}

const wifienable = () => {
  wifi.isEnabled(isEnabled => {
    if (isEnabled) {
      Alert.alert('Wifi service enabled');
    } else {
      Alert.alert('Wifi service is disabled');
    }
  });
};

const wifioff = () => {
  wifi.disconnect();
  Alert.alert('wifi service disabled');
};


const loadwifi = () => {
  wifi.loadWifiList(
    wifiStringList => {
      var wifiArray = JSON.parse(wifiStringList);
      console.log('Detected wifi networks - ', wifiArray);
    },
    error => {
      console.log(error);
    },
  );
};


const params = JSON.stringify({
  username: 'technixia',

  password: 'automation',
});

const ping = () => {
  axios
    .post('http://192.168.4.1/master_login', params, {
      headers: {
        'content-type': 'application/json',
      },
    })

    .then(function (response) {
      console.log('Updated Successfuly');
    })

    .catch(function (error) {
      console.log(error);
    });
};

export default class App extends Component {
  async componentDidMount() {
    await ACCESS_COARSE_LOCATION();
  }

  render() {
    return (
      <View style={{backgroundColor: '', color: '', flex: 1}}>
        <View
          style={{
            backgroundColor: '#306aff',
            height: '20%',
            borderRadius: 50,
            paddingHorizontal: 20,
            alignItems: 'center',
            width: '90%',
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 30,
            borderWidth: 1,
            borderColor: '#608cff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: 50,
              elevation: 50,
              height: 60,
              marginHorizontal: 10,
              borderColor: '#fff',
              borderWidth: 1,
            }}>
            <View
              style={{
                marginLeft: 30,
                alignItems: 'center',
                height: 50,
                width: 50,
                paddingTop: 10,
                backgroundColor: 'green',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: '#fff',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{}}
                activeOpacity={0.5}
                onPress={() => {
                  wifienable();
                }}>
                <FontAwesome5 name={'link'} solid size={25} color={'#fff'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                height: 50,
                width: 50,
                paddingTop: 10,
                backgroundColor: 'red',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: '#fff',
              }}>
              <TouchableOpacity
                style={{}}
                activeOpacity={0.5}
                onPress={() => {
                  wifioff();
                }}>
                <FontAwesome5
                  name={'power-off'}
                  solid
                  size={25}
                  color={'#fff'}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                fontWeight: 'bold',
                marginHorizontal: 20,
              }}>
              WIFI
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25,
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 50,
              elevation: 50,
              padding: 15,
              marginHorizontal: 10,
              borderColor: '#fff',
              borderWidth: 1,
            }}>
            <FontAwesome5 name={'wifi'} solid size={25} color={'blue'} />
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#4487ff',
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                }}>
                NIGHT KING
              </Text>
            </View>
            <View style={styles.SubmitButtonStyle}>
              <TouchableOpacity
                style={{}}
                activeOpacity={0.5}
                onPress={() => {
                  ping();
                }}>
                <FontAwesome5 name={'crown'} solid size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#608cff',
            height: '25%',
            borderRadius: 50,
            paddingHorizontal: 20,
            alignItems: 'center',
            width: '90%',
            marginLeft: 20,
            marginTop: 20,
            flex: 1,
            borderWidth: 1,
            borderColor: '#306aff',
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: 'white',
              borderRadius: 50,
              elevation: 10,
              marginBottom: 10,
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginHorizontal: 20,
                marginVertical: 8,
                paddingTop: 4,
                textDecorationLine: 'underline',
              }}>
              WIFI NETWORKS
            </Text>
            <TouchableOpacity style={styles.ScanButtonStyle} onPress={() => {
                  loadwifi();
                }}>
              <FontAwesome5 name={'sync'} solid size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '98%',
              height: 80,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 50,
              marginBottom: 10,
              marginTop: 20,
              borderColor: '#fff',
              borderWidth: 1,
            }}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  SubmitButtonStyle: {
    alignItems: 'center',
    height: 50,
    width: 50,
    paddingTop: 10,
    marginHorizontal: 50,
    backgroundColor: '#44C7FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  ScanButtonStyle: {
    alignItems: 'center',
    height: 45,
    width: 45,
    paddingTop: 8,
    marginHorizontal: 60,
    marginVertical: 2,
    backgroundColor: '#306aff',
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
