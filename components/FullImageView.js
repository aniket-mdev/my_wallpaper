import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';

function FullImageView() {
    const route = useRoute()
    const path = route.params?.path
    

    return (
        <SafeAreaView style={Styles.paren_view}>
            <Card style={Styles.container} >
                <Card.Cover style={Styles.card_cover} source={{ uri: path }} />
            </Card>

            <View style={Styles.menu_view}>
                <Image
                    style={Styles.icons}
                    source={require('../assets/icons/share.png')}
                />
                <Image
                    style={Styles.icons}
                    source={require('../assets/icons/thumb-up.png')}
                />

                <Image
                    style={Styles.icons}
                    source={require('../assets/icons/arrow.png')}
                />

            </View>

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    paren_view: {
        width: '100%',
        height: "100%",
        backgroundColor: '#0d0c22',
    },
    container: {
        alignContent: 'center',
        margin: 15,
        backgroundColor: 'white',
        opacity: 1,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        height: "70%",
    },
    card_txt: {
        fontSize: 15,
        color: 'black',
    },
    card_cover: {
        width: "100%",
        height: "100%"
    },
    menu_view: {
        margin: 15,
        justifyContent: "center",
        alignSelf: "center",
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        width: '70%',
        flexDirection: 'row'
    },
    icons: {
        width: 33,
        height: 33,
        marginStart:20,
        marginLeft:20,
        marginEnd:20,
        marginRight:20,
        marginTop:8,
        marginBottom:8
    }
})

export default FullImageView;