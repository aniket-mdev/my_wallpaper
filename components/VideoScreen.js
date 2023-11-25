import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function VideoScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCatSelect, setIsCatSelect] = useState(false);

  const data = [
    {
      id: 1,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPgz6HI3XjiwxUtOHo8D_9BVfgmhop77_uA&usqp=CAU',
      fileName: 'chatrapati_1.png',
    },
    {
      id: 2,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7W5UVXAo1tYFSbT-Kcbf_fsV7s6jvIm-JeA&usqp=CAU',
      fileName: 'chatrapati_2.png',
    },
    {
      id: 3,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHWXCJQD5_filUYK1JrevTNCb1h_4DaDdAQ&usqp=CAU',
      fileName: 'chatrapati_3.png',
    },
    {
      id: 4,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbRsmVPs96oEtsG8WltdanXOcmqGSDCoYlQ&usqp=CAU',
      fileName: 'chatrapati_4.png',
    },
    {
      id: 5,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbg5MGPpmDrjhySn2jcw09qQCCvVk9Ng0SLg&usqp=CAU',
      fileName: 'chatrapati_5.png',
    },
    {
      id: 6,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_jppyfY7MYyfOGAxLDs1lu2-D_l_wDW4tg&usqp=CAU',
      fileName: 'chatrapati_6.png',
    },
    {
      id: 7,
      path: 'https://e1.pxfuel.com/desktop-wallpaper/143/243/desktop-wallpaper-280-shivaji-maharaj-ideas-in-2022-chhatrapati-shivaji-maharaj-3d.jpg',
      fileName: 'chatrapati_7.png',
    },
    {
      id: 8,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3PMRUoDzoIxCl3h_nrq3B9Z5hxeQ00Q8gSyMmDyrOvJXZvT_p06rbFMq-9dXGgnlT4k&usqp=CAU',
      fileName: 'chatrapati_8.png',
    },
  ];

  const category_list = [
    {
      id: 1,
      name: 'Recent',
    },
    {
      id: 2,
      name: 'Popular',
    },
    {
      id: 3,
      name: 'Most Download',
    },
    {
      id: 4,
      name: 'Most Share',
    },
  ];

  const images_path = [
    {
      id: 1,
      path: 'https://i.pinimg.com/originals/6b/c3/d5/6bc3d55992cf30b7142ef00ae30713bc.jpg',
      fileName: 'chatrapati_1.png',
    },
    {
      id: 2,
      path: 'https://m.media-amazon.com/images/I/61HNir6MubL.jpg',
      fileName: 'chatrapati_2.png',
    },
    {
      id: 3,
      path: 'https://wallpapers.com/images/hd/shivaji-maharaj-statue-with-garlands-hd-s2g4axsjame3uk9k.jpg',
      fileName: 'chatrapati_3.png',
    },
    {
      id: 4,
      path: 'https://w0.peakpx.com/wallpaper/15/953/HD-wallpaper-shivaji-maharaj-rose-garland-rose-garland-sunrays-raje-king-thumbnail.jpg',
      fileName: 'chatrapati_4.png',
    },
    {
      id: 5,
      path: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/n/v/1/small-chhatrapati-shivaji-maharaj-statue-poster-hd-god-poster-original-imaghnzyyj7tgebz.jpeg?q=20',
      fileName: 'chatrapati_5.png',
    },
    {
      id: 6,
      path: 'https://media.istockphoto.com/id/1415611604/photo/full-shot-of-chatrapati-shivaji-maharaj-statue-located-on-raigad-fort-in-western-sahyadri.webp?b=1&s=170667a&w=0&k=20&c=iwPN7xif-jjjmqfd_PmgHzYcIKvdztrqHdbiiIGV9OY=',
      fileName: 'chatrapati_6.png',
    },
    {
      id: 7,
      path: 'https://e1.pxfuel.com/desktop-wallpaper/143/243/desktop-wallpaper-280-shivaji-maharaj-ideas-in-2022-chhatrapati-shivaji-maharaj-3d.jpg',
      fileName: 'chatrapati_7.png',
    },
    {
      id: 8,
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3PMRUoDzoIxCl3h_nrq3B9Z5hxeQ00Q8gSyMmDyrOvJXZvT_p06rbFMq-9dXGgnlT4k&usqp=CAU',
      fileName: 'chatrapati_8.png',
    },
  ];

  const open_category = cat_name => {
    console.log('Open category : ', cat_name);
    setIsCatSelect(true)
  };

  const category_list_view = (item, index) => {
    return (
      <View>
        <TouchableOpacity onPress={() => open_category(item.name)}>
          <View style={Styles.category_view}>
          {
          isCatSelect ? <Text style={{color:'red'}}>{item.name}</Text> :
                <Text style={{color:'blue'}}>{item.name}</Text>
          }
          
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const explore_image = item => {
    navigation.navigate('Explore', {path: item.path, fileName: item.fileName});
  };

  const data_view = item => {
    return (
      <Card style={Styles.container}>
        <TouchableOpacity onPress={() => explore_image(item)}>
          <Card.Cover style={Styles.card_cover} source={{uri: item.path}} />
        </TouchableOpacity>
      </Card>
    );
  };

  const all_images_view = (item, index) => {
    return (
      <View style={Styles.item} key={index}>
        <Card style={Styles.container}>
          <TouchableOpacity onPress={() => explore_image(item)}>
            <Card.Cover
              style={Styles.all_image_card_cover}
              source={{uri: item.path}}
              onLoadStart={() => setIsLoading(true)}
            />
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.paren_view}>
      <View style={Styles.app_view}>
        <Text style={Styles.app_title}>Jay Bhavani !</Text>
      </View>

      <View>
        <Text style={Styles.smp_text}>Popular</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => data_view(item)}
        />
      </View>

      <View>
        <Text style={Styles.smp_text}>Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          data={category_list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item,index}) => category_list_view(item,index)}
        />
      </View>

      {/* display all images */}
      {/* <FlatList
                contentContainerStyle={Styles.list}
                data={images_path}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => all_images_view(item)}
            /> */}

      <ScrollView>
        <View style={Styles.list}>
          {images_path.map(function (item, index) {
            return all_images_view(item, index);
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const {width, height} = Dimensions.get('window');

const Styles = StyleSheet.create({
  paren_view: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0d0c22',
  },
  app_view: {
    padding: 15,
  },
  app_title: {
    fontSize: 25,
    color: '#f87217',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  container: {
    alignContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    opacity: 1,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  card_txt: {
    fontSize: 15,
    color: 'black',
  },
  card_cover: {
    width: 120,
    height: 120,
  },
  smp_text: {
    color: 'white',
    padding: 13,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  category_view: {
    padding: 7,
    borderRadius: 25,
    borderColor: '#f87217',
    borderWidth: 1,
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginStart: 15,
    marginEnd: 15,
    marginTop: 25,
  },
  item: {
    // margin:15,
    marginStart: 5,
    marginLeft: 5,
  },
  all_image_card_cover: {
    //width: 150,
    //height: 150,

    width: width * 0.39,
    height: height / 6,
  },
});

export default VideoScreen;
