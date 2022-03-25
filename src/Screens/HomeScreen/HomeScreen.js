import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ACCESS_TOKEN,
    BASE_URL_ALDIPEE,
    IMAGES_URL_ALDIPEE,
} from '../../Helpers/ApiAccess';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    const [dataMovies, setDataMovies] = useState();
    const [dataLatest, setDataLatest] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // get All
    const getDataMovies = async () => {
        // const idMovie = item.id
        try
        {
            const res = await axios.get(`${BASE_URL_ALDIPEE}movies`, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });
            setDataMovies(res.data.results);
            setIsLoaded(true);
        } catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataMovies();
    }, []);

    // Latest Uploaded
    const getDataLatestMovies = async () => {
        // const idMovie = item.id
        try
        {
            const res = await axios.get(`${BASE_URL_ALDIPEE}movies`, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });
            setDataLatest(res.data.results);
            setIsLoaded(true);
        } catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataLatestMovies();
    }, []);

    const posterMovie = ({ item }) => {
        const idMovie = item.id
        return (
            <View style={Styles.recommendedContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen', { params: { idMovie } })}>
                    <Image
                        source={{ uri: `${IMAGES_URL_ALDIPEE}${item.poster_path}` }}
                        style={Styles.recommendedImages}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const cardMovie = ({ item }) => {
        const idMovie = item.id;
        return (
            <View style={Styles.cardMovieContainer}>
                <Image
                    source={{ uri: `${IMAGES_URL_ALDIPEE}${item.poster_path}` }}
                    style={Styles.cardMovie}
                />
                <View>
                    <Text style={Styles.cardMovieTitle}>{item.title}</Text>
                    <Text style={Styles.cardMovieReleaseDate}>
                        Release : {item.release_date}
                    </Text>
                    <Text style={Styles.cardMovieReleaseDate}>
                        Rating : {item.vote_average} / 10
                    </Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('DetailsScreen', { params: { idMovie } })
                        }>
                        <View style={Styles.buttonCardMovie}>
                            <Text style={Styles.textButtonCard}>See More</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    // Refresh Control
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        getDataMovies().then(() => setRefreshing(false));

    }, []);




    return (
        <SafeAreaView style={Styles.container}>
            {isLoaded ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} size={'large'} progressBackgroundColor={'#79018C'} />
                    }>
                    <View>
                        {console.log(dataMovies)}
                        <Text style={Styles.Title}>Recommended</Text>

                        <FlatList
                            data={dataMovies}
                            horizontal={true}
                            keyExtractor={(item, index) => index}
                            renderItem={posterMovie}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ marginTop: scale(-80) }}>

                            <Text style={Styles.Title}>Latest Uploaded</Text>
                            <FlatList
                                data={dataMovies}
                                // horizontal={true}
                                keyExtractor={(item, index) => index}
                                renderItem={cardMovie}

                            // showsHorizontalScrollIndicator={false}
                            />
                        </View>

                    </View>
                </ScrollView>
            ) : (
                <View style={Styles.loader}>
                    <ActivityIndicator size={'large'} color={'#79018C'} />
                </View>
            )}
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
    },
    container: {
        paddingTop: scale(10),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#160040',
    },
    recommendedContainer: {
        paddingBottom: scale(80),
        marginBottom: scale(10),
    },
    recommendedImages: {
        height: scale(120),
        width: scale(90),
        marginRight: 10,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    Title: {
        color: '#9A0680',
        fontSize: scale(24),
        fontWeight: 'bold',
        marginLeft: scale(10),
        marginBottom: scale(10),
    },

    cardMovieContainer: {
        flex: 1,
        backgroundColor: '#79018C',
        marginBottom: scale(20),
        paddingHorizontal: scale(10),
        flexDirection: 'row',
        paddingVertical: scale(14),
        marginHorizontal: scale(10),
        borderRadius: scale(12),
    },
    cardMovieTitle: {
        flexWrap: 'wrap',
        maxWidth: scale(198),
        color: 'white',
        fontSize: scale(18),
        // backgroundColor: 'red',
        fontWeight: 'bold',
        marginLeft: scale(12),
    },
    cardMovieReleaseDate: {
        fontSize: scale(12),
        color: 'white',
        marginLeft: scale(12),
        fontWeight: '700',
        marginTop: scale(4),
    },
    buttonCardMovie: {
        marginLeft: scale(12),
        backgroundColor: '#9A0680',
        width: scale(100),
        height: scale(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(8),
        marginTop: scale(14),
    },
    textButtonCard: {
        color: 'white',
        fontWeight: '700',
    },
    cardMovie: {
        height: scale(120),
        width: scale(110),
        borderRadius: scale(10),
    },
});
