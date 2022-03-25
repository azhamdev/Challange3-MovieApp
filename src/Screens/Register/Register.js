import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import IL_Register from '../../Assets/Images/IL_register.png';
import { BASE_URL_FAKE } from '../../Helpers/ApiAccess';
import axios from 'axios';
import Login from '../Login/Login';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');

    const hurufBesar = /[A-Z]/;
    const hurufKecil = /[a-z]/;
    const angka = /[0-9]/;

    const isValidPassword = givenPassword => {
        if (typeof givenPassword === 'string')
        {
            if (givenPassword.length < 8)
            {
                return false; //+ ", karena jumlah password kurang, yaitu hanya " + givenPassword.length
            } else if (!hurufBesar.test(givenPassword))
            {
                return false; //+ ", karena tidak ada huruf besar"
            } else if (!hurufKecil.test(givenPassword))
            {
                return false; //+ ", karena tidak ada huruf kecil"
            } else if (!angka.test(givenPassword))
            {
                return false; //+ ", karena tidak ada angka"
            } else
            {
                return true;
            }
        } else
        {
            return false;
        }
    };

    // email
    const emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const checkEmail = email => {
        if (email)
        {
            if (emailValidate.test(email))
            {
                return true;
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    };

    const postRegister = async () => {
        try
        {
            const body = {
                email: email,
                username: username,
                password: password,
                name: {
                    firstname: firstname,
                    lastname: lastname,
                },
                address: {
                    city: 'kilcoole',
                    street: '7835 new road',
                    number: 3,
                    zipcode: '12926-3874',
                    geolocation: {
                        lat: '-37.3159',
                        long: '81.1496',
                    },
                },
                phone: phone,
            };

            if (isValidPassword(password) && checkEmail(email))
            {
                const res = await axios.post(`${BASE_URL_FAKE}/users`, body, {
                    validateStatus: status => {
                        if (status <= 201)
                        {
                            navigation.navigate('Login');
                        } else if (status > 201)
                        {
                            Alert.alert('Pemberitahuan', 'Terdapat Kesalahan');
                        }
                    },
                });

                console.log(res);
            } else
            {
                Alert.alert('Pemberitahuan', 'Email atau Password Invalid');
            }
        } catch (error)
        {
            console.log(error);
        }
    };

    return (
        <ScrollView style={Styles.container}>
            <Image source={IL_Register} style={Styles.ilustrasi} />
            <Text style={Styles.title}>Register</Text>
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
            <Input
                placeholder="Email"
                leftIcon={{ type: 'ionicon', name: 'mail', color: '#79018C' }}
                onChangeText={text => {
                    setEmail(text);
                }}
                inputContainerStyle={Styles.input}
                style={Styles.inputText}
            />
            <Input
                placeholder="Firstname"
                leftIcon={{ type: 'ionicon', name: 'person-add', color: '#79018C' }}
                onChangeText={text => {
                    setFirstname(text);
                }}
                inputContainerStyle={Styles.input}
                style={Styles.inputText}
            />
            <Input
                placeholder="Lastname"
                leftIcon={{ type: 'ionicon', name: 'person-add', color: '#79018C' }}
                onChangeText={text => {
                    setLastname(text);
                }}
                inputContainerStyle={Styles.input}
                style={Styles.inputText}
            />
            <Input
                placeholder="Phone"
                leftIcon={{ type: 'ionicon', name: 'call', color: '#79018C' }}
                onChangeText={text => {
                    setPhone(text);
                }}
                style={Styles.inputText}
                inputContainerStyle={Styles.input}
                keyboardType={'phone-pad'}
            />
            <Button
                title={'Sign Up'}
                buttonStyle={Styles.buttonRegister}
                titleStyle={{ fontSize: scale(18) }}
                onPress={() => {
                    postRegister();
                }}
            />
            <Text style={{ color: 'white' }}>Have an Account ?</Text>
            <Button
                title={'Login'}
                buttonStyle={Styles.buttonLogin}
                titleStyle={{ fontSize: scale(18) }}
                onPress={() => navigation.navigate("Login")}
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
