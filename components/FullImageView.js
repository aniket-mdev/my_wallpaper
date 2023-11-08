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
} from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';

function FullImageView() {
  const route = useRoute();
  const path = route.params?.path;
  const ref = useRef();
  const [displa_app_txt, setDisplayAppText] = useState(false);

  const onLike = item => {
    console.log('on Liked Cliked');
  };
  const REMOTE_IMAGE_PATH =
  'https://homepages.cae.wisc.edu/~ece533/images/cat.png'
  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App needs access to your storage to download Photos',
            }
          );
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const shareImage = async () => {
    try {
      setDisplayAppText(true);
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7,
      });
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
      setDisplayAppText(false)
    }
  };

  const new_view = () => {
    return (
      <SafeAreaView style={Styles.paren_view}>
        <ViewShot ref={ref}>
          <Card style={Styles.container}>
            <Card.Cover style={Styles.card_cover} source={{uri: path}} />
          </Card>
          {displa_app_txt ? (
            <Text style={Styles.app_title}>Jay Bhavani !</Text>
          ) : null}
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

          <TouchableHighlight onPress={checkPermission}>
            <Image
              style={Styles.icons}
              source={require('../assets/icons/arrow.png')}
            />
          </TouchableHighlight>
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
