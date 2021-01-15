import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

const { height, width } = Dimensions.get('screen');

interface Props {
    title: string;
    subtitle: string;
    progress: number;
}

const HeaderForm : FC<Props> = ({title, subtitle, progress}:Props) => {
    return (
        <View style={styles.container}>
            <ProgressBar style={styles.progress} progress={progress} color={Colors.white} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

export default HeaderForm;

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        margin: 'auto',
        marginTop: height / 20,
        marginBottom: height / 30,
        textAlign: 'center',
    },
    progress: {
        margin: 20
    },
    title: {
        fontSize: 28,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 10
    }
})