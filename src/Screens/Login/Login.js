import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import IL_Login from '../../Assets/Images/IL_login.png';
import { BASE_URL_FAKE } from '../../Helpers/ApiAccess';
import axios from 'axios';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const postLogin = async () => {
        try
        {
            const body = {
                username: username, //mor_2314
                password: password, //83r5^_
            };

            const res = await axios.post(`${BASE_URL_FAKE}/auth/login`, body, {
                validateStatus: status => {
                    if (status <= 201)
                    {
                        navigation.navigate('HomeScreen')
                    } else if (status === 400)
                    {
                        Alert.alert(
                            "Pemberitahuan",
                            "HTTP STATUS 400"
                        );
                    } else if (status === 401)
                    {
                        Alert.alert(
                            "Pemberitahuan",
                            "Error: Salah Username atau Password"
                        );
                    }
                }
            });
            console.log(res);
        } catch (error)
        {
            console.log(error);
        }
    };


    return (
        <ScrollView style={Styles.container}>
            <Image source={IL_Login} style={Styles.ilustrasi} />
            <Text style={Styles.title}>Login</Text>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'ionicon', name: 'person', color: '#79018C' }}
                onChangeText={text => {
                    setUsername(text);
                }}
                inputContainerStyle={Styles.input}
                style={Styles.inputText}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'ionicon', name: 'key', color: '#79018C' }}
                onChangeText={text => {
                    setPassword(text);
                }}
                secureTextEntry={true}
                inputContainerStyle={Styles.input}
                style={Styles.inputText}
            />

            <Button
                title={'Login'}
                buttonStyle={Styles.buttonRegister}
                titleStyle={{ fontSize: scale(18) }}
                onPress={() => {
                    postLogin();
                }}
            />
            <Text style={{ color: 'white', marginTop: scale(10) }}>Don't have an Account ? Register now !</Text>
            <Button
                title={'Register'}
                buttonStyle={Styles.buttonLogin}
                titleStyle={{ fontSize: scale(18) }}
                onPress={() => navigation.navigate("Register")}
            />
        </ScrollView>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingVertical: scale(20),
        backgroundColor: '#160040',
        paddingHorizontal: scale(12),
    },
    ilustrasi: {
        width: window.width,
        // width: scale(200),
        height: scale(200),
    },
    title: {
        color: '#79018C',
        fontSize: scale(24),
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: scale(20),
    },
    input: {
        borderWidth: 1,
        borderColor: '#79018C',
        paddingHorizontal: scale(10),
        borderRadius: scale(5),
    },
    inputText: {
        color: 'white',
    },
    buttonRegister: {
        backgroundColor: '#79018C',
        paddingVertical: scale(14),
        fontSize: scale(18),
    },
    buttonLogin: {
        backgroundColor: null,
        borderWidth: 1,
        paddingVertical: scale(14),
        borderColor: '#79018C',
        marginTop: scale(8),
        marginBottom: scale(50),
    },
});
