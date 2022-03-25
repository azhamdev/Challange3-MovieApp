import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL_ALDIPEE, IMAGES_URL_ALDIPEE } from '../../../Helpers/ApiAccess'

export default function Home({ navigation }) {
    const [data, setData] = useState()
    const getData = async () => {
        try
        {
            // const res = await axios.get('https://newsapi.org/v2/top-headlines', {
            //     params: {
            //         country: 'us',
            //         category: 'business',
            //         apiKey: 'cb14f427763046b49ef085faeae0602c'
            //     }
            // })
            // setData(res.data.articles);
            const res = await axios.get(`${BASE_URL_ALDIPEE}movies`);
            console.log(res.data.results);
            setData(res);

        } catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const cardNews = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Details", { data: item })}>
                <View style={{ padding: 20, flexDirection: 'row' }}>
                    <Image source={{ uri: item.urlToImage }} style={{ width: 100, height: 100, marginRight: 10 }} />
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', flexWrap: 'wrap', flex: 1 }}>
                            {item.title}
                        </Text>
                        <Text>
                            Author : <Text style={{ color: 'black', fontWeight: '700' }}>{item.author}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const posterMovie = ({ item }) => {
        return (
            <View>
                <Image
                    source={{ uri: `${IMAGES_URL_ALDIPEE}${item.poster_path}` }}
                    style={{ width: 100, height: 100 }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView>
            {/* {console.log(data)} */}
            {/* <Text style={{ color: 'black', fontSize: 28, fontWeight: 'bold' }}>
                News Business
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Details")}>
                <Text style={{ color: 'red' }}>
                    Details
                </Text>
            </TouchableOpacity> */}
            {/* <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={cardNews}
                style={{ marginBottom: 12 }}
            /> */}
            <View>
                <Text style={Styles.title}>Recommended</Text>
                <FlatList
                    data={data}
                    horizontal={true}
                    keyExtractor={(item, index) => index}
                    renderItem={posterMovie}
                    style={{ marginBottom: 12 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://picsum.photos/200' }} />
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: 'black'
    },
    containerItemHorizontal: {
        // backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        height: 120,
        alignItems: 'center',
    },
    itemHorizontal: {
        marginRight: 10,
        height: 110,
        width: 85,
        borderRadius: 10,
    },
});