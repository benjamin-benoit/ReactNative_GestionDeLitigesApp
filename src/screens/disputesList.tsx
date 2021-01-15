import React, { FC }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';

const App : FC = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Disputes List View</Text>
            <Button style={styles.button} onPress={() => {navigation.navigate('disputeForm')}}>
                <Icon
                    style={styles.icon}
                    fill='#fff'
                    name='plus-outline'
                />
            </Button>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        height: 75,
        width: 75,
        margin: 30,
        backgroundColor: '#70cce5',
        borderWidth: 0,
        borderRadius: 50,
    }
})