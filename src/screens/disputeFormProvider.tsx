import React, { FC, useState }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Input } from '../components';
  
const App : FC = () => {

    const [selectedValue, setSelectedValue] = useState("java");

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 20}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Metro" value="metro" />
                <Picker.Item label="PromoCash" value="promocash" />
                <Picker.Item label="Brake" value="brake" />
                <Picker.Item label="Felix Potin" value="felixpotin" />
            </Picker>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})