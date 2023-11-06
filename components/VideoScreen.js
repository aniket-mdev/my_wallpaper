import React, { useState } from 'react'
import {
    View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView,
    Button,
    TouchableOpacity,
} from 'react-native'
import Video from 'react-native-video';

import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function VideoScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(false)

    const data = [
        {
            id: 1,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPgz6HI3XjiwxUtOHo8D_9BVfgmhop77_uA&usqp=CAU"
        },
        {
            id: 2,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7W5UVXAo1tYFSbT-Kcbf_fsV7s6jvIm-JeA&usqp=CAU"
        },
        {
            id: 3,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHWXCJQD5_filUYK1JrevTNCb1h_4DaDdAQ&usqp=CAU"
        },
        {
            id: 4,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbRsmVPs96oEtsG8WltdanXOcmqGSDCoYlQ&usqp=CAU"
        },
        {
            id: 5,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbg5MGPpmDrjhySn2jcw09qQCCvVk9Ng0SLg&usqp=CAU"
        },
        {
            id: 6,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_jppyfY7MYyfOGAxLDs1lu2-D_l_wDW4tg&usqp=CAU"
        },
        {
            id: 7,
            path: "https://e1.pxfuel.com/desktop-wallpaper/143/243/desktop-wallpaper-280-shivaji-maharaj-ideas-in-2022-chhatrapati-shivaji-maharaj-3d.jpg"
        },
        {
            id: 8,
            path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3PMRUoDzoIxCl3h_nrq3B9Z5hxeQ00Q8gSyMmDyrOvJXZvT_p06rbFMq-9dXGgnlT4k&usqp=CAU"
        }
    ]

    const category_list = [
        {
            id: 1,
            name: "Recent"
        },
        {
            id: 2,
            name: "Popular"
        },
        {
            id: 3,
            name: "Most Download"
        },
        {
            id: 4,
            name: "Most Share"
        },
    ]

    const images_path = [
        {
            id: 1,
            path: 'https://i.pinimg.com/originals/6b/c3/d5/6bc3d55992cf30b7142ef00ae30713bc.jpg'
        },
        {
            id: 2,
            path: 'https://m.media-amazon.com/images/I/61HNir6MubL.jpg'
        },
        {
            id: 3,
            path: 'https://wallpapers.com/images/hd/shivaji-maharaj-statue-with-garlands-hd-s2g4axsjame3uk9k.jpg'
        },
        {
            id: 4,
            path: 'https://w0.peakpx.com/wallpaper/15/953/HD-wallpaper-shivaji-maharaj-rose-garland-rose-garland-sunrays-raje-king-thumbnail.jpg'
        },
        {
            id: 5,
            path: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/n/v/1/small-chhatrapati-shivaji-maharaj-statue-poster-hd-god-poster-original-imaghnzyyj7tgebz.jpeg?q=20'
        },
        {
            id: 6,
            path: 'https://media.istockphoto.com/id/1415611604/photo/full-shot-of-chatrapati-shivaji-maharaj-statue-located-on-raigad-fort-in-western-sahyadri.webp?b=1&s=170667a&w=0&k=20&c=iwPN7xif-jjjmqfd_PmgHzYcIKvdztrqHdbiiIGV9OY='
        },
    ]


    const category_list_view = (item) => {
        return (
            <View  >
                <Text style={Styles.category_view}>{item.name}</Text>
            </View>
        )
    }

    const explore_image=(item)=>{
        console.log("clicked event triggered for image : ", item.id);
        navigation.navigate('Explore', {"path":item.path})
    }

    
    const data_view = (item) => {
        return (
            <Card style={Styles.container} >
                <TouchableOpacity onPress={()=>explore_image(item)}>
                <Card.Cover style={Styles.card_cover} source={{ uri: item.path }} />

                </TouchableOpacity>
            </Card>
        )
    }


    const all_images_view = (item, index) => {
        return (
            <View style={Styles.item} key={index}>
                <Card style={Styles.container} >
                    <TouchableOpacity onPress={()=>explore_image(item)}>
                        <Card.Cover style={Styles.all_image_card_cover} source={{ uri: item.path }} onLoadStart={() => setIsLoading(true)} />

                    </TouchableOpacity>
                </Card>

            </View>
        )
    }


    return (

        <SafeAreaView style={Styles.paren_view}>

            <View style={Styles.app_view}>
                <Text style={Styles.app_title}>Jay Shivray !</Text>
            </View>

            <View>
                <Text style={Styles.smp_text}>Popular</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => data_view(item)}
                />
            </View>

            <View >
                <Text style={Styles.smp_text} >Category</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={category_list}
                    renderItem={({ item }) => category_list_view(item)}
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
                    {images_path.map(function (item, index) { return all_images_view(item, index) })
                    }
                </View>
            </ScrollView>


        </SafeAreaView>

    )
}

const Styles = StyleSheet.create({
    paren_view: {
        width: '100%',
        height: "100%",
        backgroundColor: '#0d0c22',
    },
    app_view: {
        padding: 15
    },
    app_title: {
        fontSize: 25,
        color: "#f87217",
        fontWeight: "bold",
        fontFamily: "serif"
    },
    container: {
        alignContent: 'center',
        margin: 10,
        backgroundColor: 'white',
        opacity: 1,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
    },
    card_txt: {
        fontSize: 15,
        color: 'black',
    },
    card_cover: {
        width: 120,
        height: 120
    },
    smp_text: {
        color: 'white',
        padding: 13,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "monospace"
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
    },
    item: {
        // margin:15,
        marginStart: 20,
        marginLeft: 20
    },
    all_image_card_cover: {
        width: 150,
        height: 150
    }
})

export default VideoScreen;