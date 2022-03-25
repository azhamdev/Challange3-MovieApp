import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

export default function Details({ route }) {
    const { widht, height } = Dimensions.get('screen')
    const file = route.params.data;
    return (
        <View style={{ padding: 15, flex: 1 }}>
            <Image source={{ uri: file.urlToImage }} style={{ width: widht, height: 200, resizeMode: 'contain' }} />
            <Text style={{ color: 'black', fontSize: 28, fontWeight: 'bold' }}>
                {route.params.data.title}
            </Text>
            <Text style={{ color: 'black', fontSize: 14, flexWrap: 'wrap' }}>
                {file.description}
            </Text>
        </View>
    )
}