import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  DimensionValue,
  Dimensions,
  PermissionsAndroid,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';

function FullImageView() {
  const route = useRoute();
  const path = route.params?.path;
  const fileName = route.params.fileName;
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const actualDownload = (file_path) => {
    setLoading(true);
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DownloadDir + '/' + fileName,
      fileCache: true,
    })
      .fetch(
        'GET',
        file_path,
        {},
      )
      .then(res => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Your file has been downloaded to downloads folder!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  const downloadFile = async (file_path) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(file_path);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Something Went Wrong!',
        '',
      );
    }
  };
  const onLike = item => {
    console.log('on Liked Cliked');
  };


  const shareImage = async () => {
    setLoading(true)
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7,
      });
      setLoading(false)
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
    }
  };

  const new_view = () => {
    return (
      <SafeAreaView style={Styles.paren_view}>
        <ViewShot ref={ref}>
          <Card style={Styles.container}>
            <Card.Cover style={Styles.card_cover} source={{uri: path}} />
          </Card>
        </ViewShot>
        <View style={Styles.menu_view}>
          <TouchableHighlight onPress={() => shareImage()}>
            <Image
              style={Styles.icons}
              source={require('../assets/icons/share.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => onLike(path)}>
            <Image
              style={Styles.icons}
              source={require('../assets/icons/like.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => downloadFile(path)}>
            <Image
              style={Styles.icons}
              source={require('../assets/icons/arrow.png')}
            />
          </TouchableHighlight>
          {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        </View>
      </SafeAreaView>
    );
  };

  return new_view();
}
const Styles = StyleSheet.create({
  paren_view: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0d0c22',
  },
  container: {
    alignContent: 'center',
    marginTop: 15,
    backgroundColor: 'white',
    opacity: 1,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    width: '80%',
    height: '85%',
    alignSelf: 'center',
  },
  card_txt: {
    fontSize: 15,
    color: 'black',
  },
  card_cover: {
    width: '100%',
    height: '100%',
  },
  menu_view: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    width: '70%',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    marginTop: -30,
  },
  icons: {
    width: 33,
    height: 33,
    marginStart: 20,
    marginLeft: 20,
    marginEnd: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
    borderColor: 'white',
  },
  app_title: {
    fontSize: 15,
    textAlign: 'right',
    color: '#f87217',
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginEnd: 25,
  },
});

export default FullImageView;
