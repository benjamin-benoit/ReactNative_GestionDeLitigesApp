import React, { FC, useState }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../components';
import HeaderForm from '../components/headerForm';
  
const App : FC = () => {

    const [selectedValue, setSelectedValue] = useState("java");

    return (
        <View style={styles.container}>
            <HeaderForm title="Première étape:" subtitle="Indiquez le nom de votre litige et sa description."/>
            <View style={styles.form}>
                <Input placeholder="nom"></Input>
                <Input placeholder="description"></Input>
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#70cce5'
    },
    form: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        paddingTop: 40
    }
})