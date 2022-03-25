import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    Linking,
    ActivityIndicator,
    RefreshControl,
    Share,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BASE_URL_ALDIPEE } from '../../Helpers/ApiAccess';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { Icon, Dialog } from 'react-native-elements';

export default function DetailsScreen({ route, navigation }) {
    const { params } = route.params;
    const idMovie = params.idMovie;
    const file = route.params.data;
    // const file2 = route.params.params.idMovie;

    const [isLoaded, setIsLoaded] = useState(false);

    const { width, height } = Dimensions.get('window');

    const [detailMovie, setDetailMovie] = useState({});
    const [listGenre, setListGenre] = useState([]);
    const [listCasts, setListCasts] = useState([]);
    const [visible2, setVisible2] = useState(false);

    const toggleDialog2 = () => {
        setVisible2(!visible2);
    };

    const getDetailMovie = async () => {
        try
        {
            const res = await axios.get(`${BASE_URL_ALDIPEE}/movies/${idMovie}`);

            console.log(idMovie);
            console.log(res);
            console.log(res.data.credits.cast.length);
            console.log(res.data.credits.cast);

            setDetailMovie(res.data);
            setIsLoaded(true);
        } catch (error)
        {
            console.log(error);
            console.log(idMovie);
        }
    };

    useEffect(() => {
        getDetailMovie();
    }, []);

    // Genres
    const getGenreMovie = async () => {
        try
        {
            const res = await axios.get(`${BASE_URL_ALDIPEE}/movies/${idMovie}`);

            console.log(idMovie);

            setListGenre(res.data.genres);
            setIsLoaded(true);
        } catch (error)
        {
            console.log(error);
            console.log(idMovie);
        }
    };

    useEffect(() => {
        getGenreMovie();
    }, []);

    // Casts
    const getCastsMovie = async () => {
        try
        {
            const res = await axios.get(`${BASE_URL_ALDIPEE}/movies/${idMovie}`);

            console.log(idMovie);
            console.log(res.data.credits.cast.length);
            console.log(res.data.credits.cast);

            setListCasts(res.data.credits.cast);
            setIsLoaded(true);
        } catch (error)
        {
            console.log(error);
            console.log(idMovie);
        }
    };

    useEffect(() => {
        getCastsMovie();
    }, []);

    // Buat Tampilnyaa
    const genres = ({ item }) => {
        return (
            <View style={Styles.genresContainer}>
                <Text style={Styles.genres}>{item.name}</Text>
            </View>
        );
    };

    const casts = ({ item }) => {
        return (
            <View style={Styles.containerCast}>
                <Image source={{ uri: item.profile_path }} style={Styles.castImage} />
                <View style={Styles.containerNameCast}>
                    <Text style={Styles.castName}>{item.name}</Text>
                </View>
            </View>
        );
    };

    // Refresh Control

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        getDetailMovie().then(() => setRefreshing(false));
        getGenreMovie().then(() => setRefreshing(false));
        getCastsMovie().then(() => setRefreshing(false));
    }, []);

    const onShare = async () => {
        try
        {
            const result = await Share.share({
                message:
                    "Testing menggunakan Share",
            });
            if (result.action === Share.sharedAction)
            {
                if (result.activityType)
                {
                    // shared with activity type of result.activityType
                } else
                {
                    // shared
                }
            } else if (result.action === Share.dismissedAction)
            {
                // dismissed
            }
        } catch (error)
        {
            alert(error.message);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#160040' }}>
            {isLoaded ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} size={'large'} progressBackgroundColor={'#79018C'} />
                    }>
                    <View style={{}}>
                        <View style={Styles.backDrop}>
                            <Image
                                source={{ uri: detailMovie.backdrop_path }}
                                style={Styles.backDropImage}
                            />
                        </View>
                        <View style={Styles.container}>
                            <View style={Styles.Top}>
                                <View>
                                    <Icon
                                        raised
                                        name="chevron-back-circle-outline"
                                        type="ionicon"
                                        color="#272651"
                                        onPress={() => navigation.navigate('HomeScreen')}
                                    />
                                </View>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon
                                        raised
                                        name="heart-outline"
                                        type="ionicon"
                                        color="#272651"
                                        onPress={() => navigation.navigate('HomeScreen')}
                                    />
                                    <Icon
                                        raised
                                        name="share-social"
                                        type="ionicon"
                                        color="#272651"
                                        onPress={onShare}
                                    />
                                </View>
                                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                                    <Dialog.Title title="Share with" />
                                    <Text>share with others</Text>
                                    <Dialog.Actions>
                                        <Dialog.Button
                                            title="Instagram"
                                            onPress={() =>
                                                Linking.openURL(
                                                    'https://www.instagram.com/azham.rasyid/',
                                                )
                                            }
                                        />
                                        <Dialog.Button
                                            title="Whatsapp"
                                            onPress={() =>
                                                Linking.openURL('https://wa.me/0895379181484')
                                            }
                                        />
                                    </Dialog.Actions>
                                </Dialog>
                            </View>
                            <View style={Styles.cardContainer}>
                                <View>
                                    <Image
                                        source={{ uri: detailMovie.poster_path }}
                                        style={Styles.cardImage}
                                    />
                                </View>
                                <View style={{ paddingLeft: scale(12) }}>
                                    <Text style={Styles.title}>{detailMovie.title}</Text>
                                    <Text style={Styles.releaseDate}>
                                        {detailMovie.release_date}
                                    </Text>
                                    <Text style={Styles.rating}>
                                        Rating : {detailMovie.vote_average}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: scale(20) }}></View>
                            <Text style={Styles.cardMovieTitle}>Genres</Text>
                            <FlatList
                                data={listGenre}
                                // numColumns={2}
                                horizontal={true}
                                keyExtractor={(_item, index) => index}
                                renderItem={genres}
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: scale(10) }}
                            />
                            <Text style={[Styles.cardMovieTitle, { marginTop: scale(-30) }]}>
                                Synopshis
                            </Text>
                            <Text style={Styles.overview}>{detailMovie.overview}</Text>
                            <Text style={Styles.cardMovieTitle}>Actors / Artist</Text>
                            <FlatList
                                data={listCasts}
                                // horizontal={false}
                                numColumns={3}
                                keyExtractor={(_item, index) => index}
                                renderItem={casts}
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: scale(20) }}
                                nestedScrollEnabled={true}
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
    container: {
        paddingTop: scale(10),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#160040',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "100%",
        backgroundColor: '#160040'
    },
    overview: {
        color: 'white',
        lineHeight: scale(20),
        textAlign: 'justify',
        marginTop: scale(10),
        marginBottom: scale(20),
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
    backDrop: {
        flexDirection: 'row',
        // backgroundColor: '#000000',
        width: window.width,
        // marginTop: scale(-70)
    },
    backDropImage: {
        flex: 1,
        height: scale(200),
        resizeMode: 'cover',
    },
    titleDetails: {
        fontSize: scale(22),
        fontWeight: '700',
    },
    genresContainer: {
        height: scale(30),
        // width: scale(70),
        backgroundColor: '#79018C',
        marginRight: scale(10),
        color: 'white',
        fontSize: scale(14),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scale(48),
        borderRadius: scale(10),
        paddingHorizontal: scale(12),
    },
    genres: {
        color: 'white',
    },

    castImage: {
        borderRadius: scale(10),
        height: scale(110),
        width: scale(100),
    },
    containerCast: {
        flex: 1,
        // backgroundColor: 'green',
        alignItems: 'center',
    },
    castName: {
        textAlign: 'center',
        fontSize: scale(14),
        fontWeight: '800',
        color: 'white',
    },
    containerNameCast: {
        backgroundColor: '#79018C',
        width: scale(100),
        borderRadius: scale(4),
        marginTop: scale(12),
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scale(12),
    },
    Top: {
        // flex: 1,
        // marginTop: scale(50),
        flexDirection: 'row',
        width: window.width,
        // backgroundColor: 'black',
        justifyContent: 'space-between',
        // marginTop: -100,
        // position: 'absolute',
        top: scale(-195),
    },
    container: {
        paddingHorizontal: scale(12),
        paddingTop: scale(12),
        flexDirection: 'column',
    },
    Top: {
        // flex: 1,
        flexDirection: 'row',
        width: window.width,
        // backgroundColor: 'black',
        justifyContent: 'space-between',
        // marginTop: -100,
        // position: 'absolute',
        top: scale(-200),
    },
    cardContainer: {
        backgroundColor: '#79018C',
        marginTop: scale(-140),
        padding: scale(14),
        flexDirection: 'row',
        borderRadius: 12,
    },
    cardImage: {
        width: scale(100),
        height: scale(140),
        borderRadius: scale(10),
    },
    title: {
        fontSize: scale(28),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    releaseDate: {
        color: '#fff',
        fontSize: scale(14),
        marginBottom: 10,
    },
    rating: {
        color: '#fff',
        fontSize: scale(18),
    },
});
