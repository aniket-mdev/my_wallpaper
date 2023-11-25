import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid,  ActivityIndicator,
  ToastAndroid,
  Alert, } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Permissions = () => {

  const [loading, setLoading] = useState(false);

  const actualDownload = () => {
    setLoading(true);
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: dirs.DownloadDir + '/path-to-file.png',
      fileCache: true,
    })
      .fetch(
        'GET',
        'https://cdn.pixabay.com/photo/2014/12/21/23/34/cherry-575547_960_720.png',
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

  const downloadFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      console.log('Requesting storage permission...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs storage permission to save pictures.',
          buttonPositive: 'OK',
        }
      );
  
      console.log('Storage permission result:', granted);
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        // Your logic for using storage
      } else {
        console.log('Storage permission denied');
        // Handle accordingly
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
    }
  };
  
  return (
    <View>
      <Text>Asking Permissions</Text>
      <Button title="Request Camera Permission" onPress={requestStoragePermission} />
      <Text> Download Files in Android </Text>
      <Button onPress={() => downloadFile()} title="Download" />
      {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    </View>
  );
};

export default Permissions;