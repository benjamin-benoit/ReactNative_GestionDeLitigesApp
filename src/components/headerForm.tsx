import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';

const { height, width } = Dimensions.get('screen');

interface Props {
    title: string;
    subtitle: string;
}

const HeaderForm : FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
    )
}

export default HeaderForm;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        marginTop: height / 20,
        marginBottom: height / 30
    },
    title: {
        fontSize: 25,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 12,
        textAlign: "center"
    }
})