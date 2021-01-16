import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

interface Props {
    icon: string;
    title: string;
    nav: string;
}

const HomeButton : FC<Props> = ({icon, title, nav}:Props) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {navigation.navigate(nav)}}
        >
            <Icon
                style={styles.icon}
                fill='#fff'
                name={icon}
            />
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default HomeButton;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        height: height / 10,
        margin: 10,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#aaaaaa',
        alignItems: 'center',
        backgroundColor: '#70cce5',
        borderRadius: 20,
        padding: 20
    },
    icon: {
        width: 50,
        height: 50
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 22
    }
})