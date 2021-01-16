import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

const { height, width } = Dimensions.get('screen');

interface Props {
    icon: string;
    title: string;
    nav: string;
}

const HomeButton : FC<Props> = ({icon, title, navigation, nav}:Props) => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {navigation.navigate(nav)}}
        >
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
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
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        padding: 20
    },
    icon: {
        width: 50,
        height: 50,
    },
    title: {
        flex: 1,
        textAlign: 'center'
    }
})