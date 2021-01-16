import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, TextInput } from 'react-native';

const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    onChangeText: Function;
}

const Input : FC<Props> = ({placeholder, onChangeText}: Props) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={() => onChangeText()}></TextInput>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        backgroundColor: '#ededed',
        borderRadius: 5,
        margin: 5
    },
    input: {
        padding: 15
    }
})