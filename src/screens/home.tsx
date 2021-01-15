import React, { FC, useState }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '../components';
import HeaderForm from '../components/headerForm';
import { Button, Icon } from '@ui-kitten/components';
  
const App : FC = ({navigation}) => {

    const [selectedValue, setSelectedValue] = useState("java");
    const [counter, setCounter] = React.useState(0);

    return (
        <View style={styles.container}>
            <Button style={styles.button} onPress={() => {navigation.navigate('disputesList')}}>
                <Icon
                    style={styles.icon}
                    fill='#fff'
                    name='edit-2-outline'
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
        backgroundColor: '#fff'
    },
    form: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        paddingTop: 30
    },
    button: {
        height: 100,
        width: 100,
        margin: 30,
        backgroundColor: '#70cce5',
        borderWidth: 0,
        borderRadius: 50,
    }
})