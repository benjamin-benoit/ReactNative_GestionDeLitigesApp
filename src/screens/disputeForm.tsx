import { Button, Datepicker, Text } from '@ui-kitten/components';
import React, { FC, useState }  from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Input } from '../components';
import HeaderForm from '../components/headerForm';
import { Picker } from '@react-native-community/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as firebase from 'firebase';
import { v5 as uuidv5 } from 'uuid';
import { Dispute } from '../dto/dispute';
import { disputes } from '../datas/disputes';

const { height, width } = Dimensions.get('screen');

const firebaseConfig = {
    apiKey: "AIzaSyA4RnIN3DEe_aJPxhxVkF58XiuU_HSMjhg",
    authDomain: "gestiondelitiges-95495.firebaseapp.com",
    databaseURL: "https://gestiondelitiges-95495-default-rtdb.firebaseio.com",
    projectId: "gestiondelitiges-95495",
    storageBucket: "gestiondelitiges-95495.appspot.com",
    messagingSenderId: "49747016637",
    appId: "1:49747016637:web:69d9cd5774bc3c1faaf0d4",
    measurementId: "G-5E9JLL628E"
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app();
}
  
const App : FC = () => {

    const uploadFile = async(uri: string, name: string) => {
        console.log(uri);
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref("documents/").child(uuidv5.URL);
        console.log(ref);
        return ref.put(blob);
    }

    const [selectedProvider, setSelectedProvider] = useState("metro");
    const [selectedOrder, setSelectedOrder] = useState("commande 1");
    const [step1, setStep1] = useState<boolean>(true);
    const [step2, setStep2] = useState<boolean>(false);
    const [step3, setStep3] = useState<boolean>(false);
    const [step4, setStep4] = useState<boolean>(false);
    const [document, setDocument] = useState();
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState<Partial <Dispute>>();

    return (
        <View style={styles.container}>
            {
                step1 === true && (
                    <View style={styles.body}>
                        <HeaderForm
                        title="Première étape:"
                        subtitle="Indiquez le nom de votre litige, sa description et la date."
                        progress={0}
                        stepForm={() => {
                                    setStep1(false)
                                    setStep2(true)
                                    setStep3(false)
                                    setStep4(false)
                                    console.log(data)}
                                }
                        />
                        <View style={styles.form}>
                            <Text style={styles.formText}>Renseignez le nom du litige:</Text>
                            <Input placeholder="nom" value={data?.name} onChangeText={(text: string) => setData({name: text})}></Input>
                            <Text style={styles.formText}>Renseignez une description:</Text>
                            <Input placeholder="description" value={data?.description} onChangeText={(text: string) => setData({description: text})}></Input>
                            <Text style={styles.formText}>Sélectionnez la date:</Text>
                            <Datepicker
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
                        <HeaderForm
                        title="Seconde étape:"
                        subtitle="Sélectionnez votre fournisseur."
                        progress={0.3}
                        stepForm={() => {
                                    setStep1(false)
                                    setStep2(false)
                                    setStep3(true)
                                    setStep4(false)}
                                }
                        stepFormBack={() => {
                                    setStep1(true)
                                    setStep2(false)
                                    setStep3(false)
                                    setStep4(false)}
                                }
                        />
                        <View style={styles.form}>
                            <Picker
                                selectedValue={selectedProvider}
                                style={{ height: 20}}
                                onValueChange={(provider, itemIndex) => setSelectedProvider(provider)}
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
            {
                step3 === true && (
                    <View style={styles.body}>
                        <HeaderForm
                        title="Troisième étape:"
                        subtitle="Ajoutez une photo et le bon de livraison."
                        progress={0.6}
                        stepForm={() => {
                                    setStep1(false)
                                    setStep2(false)
                                    setStep3(false)
                                    setStep4(true)}
                                }
                        stepFormBack={() => {
                                    setStep1(false)
                                    setStep2(true)
                                    setStep3(false)
                                    setStep4(false)}
                                }
                        />
                        <View style={styles.form}>
                            <Button style={styles.formButton} status='basic'>
                                Sélectionner une photo
                            </Button>
                            <Button style={styles.formButton} status='basic' onPress={() => DocumentPicker.getDocumentAsync({}).then(async(response) => {
                                try {
                                    uploadFile(response.uri, response.name)
                                } catch (e) {
                                    console.log(e)
                                }
                            })}>
                                Sélectionner un bon le livraison
                            </Button>
                        </View>
                    </View>
                )
            }
            {
                step4 === true && (
                    <View style={styles.body}>
                        <HeaderForm title="Quatrième étape:" subtitle="Sélectionnez la commande concernée." progress={1}
                        stepFormBack={() => {
                                    setStep1(false)
                                    setStep2(false)
                                    setStep3(true)
                                    setStep4(false)}
                                }
                        stepForm={() => {
                        }
                        }
                        />
                            <Picker
                                selectedValue={selectedOrder}
                                style={{ height: 20}}
                                onValueChange={(order, itemIndex) => setSelectedOrder(order)}
                            >
                                <Picker.Item label="Commande 1" value="commande1" />
                                <Picker.Item label="Commande 2" value="commande2" />
                                <Picker.Item label="Commande 3" value="commande3" />
                                <Picker.Item label="Commande 4" value="commande4" />
                            </Picker>
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
    formNav: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    body: {
        backgroundColor: '#70cce5'
    },
    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 30,
        paddingTop: 30,
        padding: 20
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderWidth: 0,
        width: width / 3
    },
    formButton: {
        margin: 10
    },
    formText: {
        color: '#aaaaaa'
    }
})