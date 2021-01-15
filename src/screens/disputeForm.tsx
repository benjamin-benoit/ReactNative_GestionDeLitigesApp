import { Button, Datepicker, Text } from '@ui-kitten/components';
import React, { FC, useState }  from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../components';
import HeaderForm from '../components/headerForm';
import { Picker } from '@react-native-community/picker';
  
const App : FC = () => {

    const [selectedValue, setSelectedValue] = useState("java");
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = useState({
        name: ""
    });

    return (
        <View style={styles.container}>
            {
                step1 === true && (
                    <View style={styles.body}>
                        <HeaderForm title="Première étape:" subtitle="Indiquez le nom de votre litige et sa description." progress='0.5'/>
                        <Button style={styles.button} status='basic' onPress={() => {
                            setStep2(true)
                            setStep1(false)}}>
                            Suivant
                        </Button>
                        <View style={styles.form}>
                            <Input placeholder="nom"></Input>
                            <Input placeholder="description"></Input>
                            <Datepicker
                                style={styles.datePicker}
                                date={date}
                                onSelect={nextDate => setDate(nextDate)}
                            />
                        </View>
                    </View>
                )
            }
            {
                step2 === true && (
                    <View style={styles.body}>
                        <HeaderForm title="Seconde étape:" subtitle="Sélectionnez votre fournisseur." progress='1'/>
                        <Button style={styles.button} status='basic' onPress={() => {
                            setStep2(false)
                            setStep1(true)}}>
                            Précédent
                        </Button>
                        <View style={styles.form}>
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
                    </View>
                )
            }
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        backgroundColor: '#70cce5'
    },
    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        paddingTop: 30,
        padding: 20
    },
    button: {
        margin: 30,
        backgroundColor: '#fff',
        borderWidth: 0
    }
})