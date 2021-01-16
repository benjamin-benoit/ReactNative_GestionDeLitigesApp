import React, { FC }  from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, List } from '@ui-kitten/components';
import DisputeItem from '../components/disputeItem';

const App : FC = ({navigation}) => {

    const jsonData = require('../datas/disputes.json');

    const renderItem = ({ item, index }) => (
        <DisputeItem name={item.name} description={item.description}></DisputeItem>
    );

    return (
        <View style={styles.container}>
            <List
                style={styles.list}
                data={jsonData.disputes}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('disputeForm')}}>
                <Icon
                    style={styles.icon}
                    fill='#fff'
                    name='plus-outline'
                />
            </TouchableOpacity>
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
        backgroundColor: '#fff'
    },
    list: {
        backgroundColor: '#fff'
    },
    button: {
        padding: 20,
        backgroundColor: '#70cce5',
        borderWidth: 0,
        borderRadius: 50,                                    
        position: 'absolute',                                          
        bottom: 40,                                                    
        right: 40, 
    }
})