import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { StyledButton, StyledText } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotes } from '../../redux/actions/notes';

const editNote = (props: any) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(props?.route?.params?.note)
  let id = props?.route?.params?.id
  let note = { note: value }

  const storeData = useSelector(item => item);
  let loading = storeData?.notesReducer?.loading;
  
console.log('--loading=-', loading)
  const handleLoginPress = async () => {
    try {
      const response = await dispatch(updateNotes(id, note));
      if (!response) {
        Alert.alert('An error has occoured.')
      } else {
        props?.navigation.goBack()
      }

    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.containerView}>
            <View style={styles.backView}>
              <TouchableOpacity
                onPress={
                  () => {
                    props?.navigation.goBack()
                  }
                }
              >
                <Text>
                  <MatIcon name={'chevron-left'} size={40} color={'#424242'} />
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>{props?.route?.params?.title || 'Empty Title'}</Text>
              <Text>{props?.route?.params?.createdAt.split('T')[0] || '-'}</Text>
            </View>
            <View style={styles.textInpView}>
              <TextInput
                placeholder={'please type your notes here'}
                style={styles.textInp}
                multiline
                numberOfLines={4}
                onChangeText={text => setValue(text)}
                value={value}
              ></TextInput>
            </View>
            <View style={styles.butView}>
              <StyledButton
                onPress={handleLoginPress}
                backgroundColor={"#424242"}>
                {/* {true} ?  <ActivityIndicator color={'#fff'} /> : <StyledText color='#fff'>
                  Update Note
                </StyledText> */}

                <StyledText color='#fff'>
                  {(loading) ? <ActivityIndicator color={'#fff'} /> : 'Update Note'}
                </StyledText>
              </StyledButton>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  backView: {
    paddingTop: hp(4),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: wp(5)
  },
  containerView: {
    paddingLeft: wp(3),
    paddingRight: wp(3)
  },
  textInp: {
    height: hp(30),
    width: wp(100),
    fontSize: hp(2)
  },
  textInpView: {
    height: hp(50),
    backgroundColor: '#c2c2c27f'
  },
  butView: {
    paddingTop: hp(4)
  }
});

export default editNote;