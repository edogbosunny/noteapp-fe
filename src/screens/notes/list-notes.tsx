import React, { useState } from 'react';
import { getNotes } from '../../redux/actions/notes';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Auth0 from 'react-native-auth0';
import { ID, DOMAIN } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Item = ({ item, onPress, backgroundColor, textColor }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{(item.title) ? item.title : 'Empty Title'}</Text>
    <Text style={[styles.date, textColor]}>{item.createdAt.split('T')[0]}</Text>
  </TouchableOpacity>
);


const createNote = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  const storeData = useSelector(item => item);
  let notes = storeData?.notesReducer?.notes?.data?.auctions
  // console.log('0-0-0', storeData?.notesReducer?.notes?.data?.auctions)


  const getNoteResponse = async () => {
    try {
      const response = await dispatch(getNotes());
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      getNoteResponse();
    });
  }, [navigation]);


  const renderItem = ({ item }: any) => {
    console.log('--> i', item)
    const backgroundColor = item.id === selectedId ? "#4242427f" : "#42424220";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          navigation.navigate('editnote', item)
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

    const auth0 = new Auth0({
      domain: DOMAIN,
      // domain: 'cv-demo.eu.auth0.com',
      clientId: ID,
      // clientId: 'odo67ZuCQLT5FA2yyGOKAwtsPRkyY8Zf',
    });
    

    const removeData = async (value: string) => {
      try {
        await AsyncStorage.removeItem('@token')
      } catch (e) {
        console.log(e)
        // saving error
      }
    }

    const logout = () => {
      removeData('@token')
      auth0.webAuth.clearSession()
      .then(item => navigation.navigate('Auth'))
      .catch(error => console.log(error));
      // navigation.navigate('listnote')
    }

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.backView}>
            <TouchableOpacity
              onPress={logout}>
              <Text>
                <MatIcon name={'logout'} size={40} color={'#424242'} />
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </>
    );
  };

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
    date: {
      fontSize: 12,
    },
    backView: {
      paddingTop: hp(4),
      // justifyContent: 'flex-end',
      alignItems: 'flex-start',
      left: wp(5)
    }
  });

  export default createNote;