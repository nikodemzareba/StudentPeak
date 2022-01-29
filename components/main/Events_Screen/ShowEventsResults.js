import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    StyleSheet,
    TextInput, Button, Image, Dimensions, Alert, ActivityIndicator
} from 'react-native';


import {Platform} from "@unimodules/core";
import {LinearGradient} from 'expo-linear-gradient';

import Rating from './Objects/Ratings';
import Tickets from './Objects/Tickets';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;


export default function Events(dataIncome) {
    {/* Variables  */
    }

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;

    const [eventsData, setEventsData] = useState(null);
    const [loading, setLoading] = useState(false)


    {/*  Video Variables  */
    }
    const SPACING = 10;
    const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
    const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const BACKDROP_HEIGHT = height * 0.65;

    const eventsDataList = dataIncome.route.params.json.events_results;
    console.log(`\n\nEvents Data Results \n${JSON.stringify(eventsDataList)}`);
    const newData = eventsDataList.map((item, i) => {
        return {...item, key: i}
    }); // static index, isnt an issue as the list isnt going to be ammended

    {/* Run Script when page is first rendered */
    }

    useEffect(() => {

        //#####################################################
        //HELLO Should be removed when official way is fixed
        //#####################################################


        //#####################################################

        console.log(`\n\nShowEventsPage \n${dataIncome}`);
        setEventsData(dataIncome);


    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/* Status Bar*/}
            <ActivityIndicator size="large"/>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={newData}
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                renderItem={({item}) => {

                    {/*If rating doesn't exist fill in a 0 */}

                    let ratingRate = 0;
                    let foundRatingsProperty = false;

                    if(item.hasOwnProperty('venue') && item.venue.hasOwnProperty('rating'))
                    {
                        ratingRate = item.venue.rating;
                    }

                    return (
                        <View style={{Width: ITEM_SIZE}}>
                            <View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 34
                                }}
                            >
                                <Image
                                    style={styles.posterImage}
                                    source={{uri: item.thumbnail}}
                                />

                                <Text style={{fontSize: 24}} numberOfLines={1}>
                                    {item.title}
                                </Text>


                                <Rating rating={ratingRate}/>
                                <Tickets tickets={item.ticket_info}/>

                                <Text style={{fontSize: 12}} numberOfLines={3}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 30,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        fontSize: 15,
    },

});