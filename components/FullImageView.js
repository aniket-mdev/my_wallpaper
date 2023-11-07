import React, {useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';

function FullImageView() {
  const route = useRoute();
  const path = route.params?.path;
  const ref = useRef();

  const onShare = async item => {
    let shareImage = {
        message: "Jay Bhavani ! " , //string
       url: path
        // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
      };

      Share.open(shareImage)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const onLike = item => {
    console.log('on Liked Cliked');
  };

  const onDownload = item => {
    console.log('on download Cliked');
  };

  const shareImage = async () => {
    try {
        const uri = await captureRef(ref, {
            format: 'png',
            quality: 0.7,
          });

      console.log('uri', uri);
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
    }
  };

  

  const new_view = () => {
    return (
      <SafeAreaView style={Styles.paren_view}>
        <ViewShot ref={ref}>
          {/* <Image
              style={Styles.generatedImage}
              source={{
                uri: path,
              }}
            /> */}
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

          <TouchableHighlight onPress={() => onDownload(path)}>
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
  // <SafeAreaView style={Styles.paren_view}>
  //   <Card style={Styles.container}>
  //     <Card.Cover style={Styles.card_cover} source={{uri: path}} />
  //   </Card>

  <View style={Styles.menu_view}>
    <TouchableHighlight onPress={() => onShare(path)}>
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

    <TouchableHighlight onPress={() => onDownload(path)}>
      <Image
        style={Styles.icons}
        source={require('../assets/icons/arrow.png')}
      />
    </TouchableHighlight>
  </View>;
  // </SafeAreaView>
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
    marginTop:-50
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

  generateButton: {
    height: 50,
    width: 300,
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
  },
  generatedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullImageView;
