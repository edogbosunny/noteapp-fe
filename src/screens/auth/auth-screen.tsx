import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  StatusBar,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import { ID, DOMAIN } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../../lib/axios';
import AutoHeightImage from 'react-native-auto-height-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { image, StyledButton, StyledText } from '../../assets'




const auth = ({ navigation }: { navigation: any }) => {
  const auth0 = new Auth0({
    domain: DOMAIN,
    // domain: 'cv-demo.eu.auth0.com',
    clientId: ID,
    // clientId: 'odo67ZuCQLT5FA2yyGOKAwtsPRkyY8Zf',
  });

  const [authToken, setAuthToken] = useState<any | null>(null);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if (value !== null) {
        setToken(value)
        navigation.navigate('listnote')
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@token', value)
      setToken(value)
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const removeData = async (value: string) => {
    try {
      await AsyncStorage.removeItem('@token')
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const handleLoginPress = async () => {
    try {
      let credentials = await auth0
        .webAuth
        .authorize({ scope: 'openid profile email' });
      setAuthToken(credentials.idToken);
      storeData(credentials.idToken);
      setToken(credentials.idToken)
      navigation.navigate('listnote')

      console.log('authToken', credentials.accessToken);

    } catch (error) {
      console.log(error)
    }
  }

  const handleLogoutPress = () => {
    auth0.webAuth.clearSession().catch(error => console.log(error));
    removeData('@token')
    setAuthToken(null);

  }

  // const getUserProfile = () => {
  //   auth0.auth
  //     .userInfo({ token: authToken })
  //     .then(result => console.log('user profile', result))
  //     .catch(console.error);
  // }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.sectionContainer}>
        <View>
          <AutoHeightImage
            // resizeMode='contain'
            width={wp(100)}
            height={hp(80)}
            source={image.BACKGROUND}
          />
  
          <StyledButton
            onPress={handleLoginPress}
            backgroundColor={"#3D45F4"}>
            <StyledText color='#fff'>
              Sign in with Auth 0
              </StyledText>
          </StyledButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#fff',
    height: hp(100)
    // marginTop: 32,
    // paddingHorizontal: 24,
  },
});

export default auth;