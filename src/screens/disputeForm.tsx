import { Button, Datepicker } from "@ui-kitten/components";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import HeaderForm from "../components/headerForm";
import { Picker } from "@react-native-community/picker";
import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase";
import { v5 as uuidv5 } from "uuid";
import { Dispute } from "../dto/dispute";
import { Input, PhotoCamera } from "../components";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context";

const { height, width } = Dimensions.get("screen");

const firebaseConfig = {
  apiKey: "AIzaSyA4RnIN3DEe_aJPxhxVkF58XiuU_HSMjhg",
  authDomain: "gestiondelitiges-95495.firebaseapp.com",
  databaseURL: "https://gestiondelitiges-95495-default-rtdb.firebaseio.com",
  projectId: "gestiondelitiges-95495",
  storageBucket: "gestiondelitiges-95495.appspot.com",
  messagingSenderId: "49747016637",
  appId: "1:49747016637:web:69d9cd5774bc3c1faaf0d4",
  measurementId: "G-5E9JLL628E",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App: FC = () => {
  const navigation = useNavigation();
  const { disputes, addDispute } = useContext(AppContext);
  const [data, setData] = useState<Partial<Dispute>>();
  const [cameraView, setCameraView] = useState<boolean>(false);

  // Step display
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  // Step 1 data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  // Step 2 data
  const [selectedProvider, setSelectedProvider] = useState("metro");
  //Step 3 data
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState("");
  const [fileUri, setFileUri] = useState("");
  //Step 4 data
  const [selectedOrder, setSelectedOrder] = useState("commande 1");

  function handleChangeCameraView(value: boolean = cameraView) {
    setCameraView(value);
  }

  function handleChangeSetPhotoUri(uri: string = photoUri) {
    setPhotoUri(uri);
  }

  const uploadFile = async (uri: string, folder: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(folder).child(uuidv5.URL);
    return ref.put(blob);
  };

  const stepOneCheck = () => {
    return name.trim() === "" || description.trim() === "" ? false : true;
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: cameraView ? false : true });
  }, [cameraView]);

  return (
    <>
      {cameraView ? (
        <PhotoCamera
          setCameraView={(value: boolean) => handleChangeCameraView(value)}
          setPhotoUri={(uri: string) => handleChangeSetPhotoUri(uri)}
        />
      ) : (
        <View style={styles.container}>
          {step.step1 === true && (
            <View style={styles.body}>
              <HeaderForm
                title="Première étape:"
                subtitle="Indiquez le nom de votre litige, sa description et la date."
                progress={0}
                stepForm={() => {
                  stepOneCheck() &&
                    setStep({
                      step1: false,
                      step2: true,
                      step3: false,
                      step4: false,
                    });
                }}
              />
              <View style={styles.form}>
                <Text style={styles.formText}>
                  Renseignez le nom du litige:
                </Text>
                <Input
                  placeholder="nom"
                  value={name}
                  onChangeText={(text: string) => setName(text)}
                ></Input>
                {name === "" && (
                  <Text style={styles.error}>
                    * Renseignez le nom du litige
                  </Text>
                )}
                <Text style={styles.formText}>Renseignez une description:</Text>
                <Input
                  placeholder="description"
                  value={description}
                  onChangeText={(text: string) => setDescription(text)}
                ></Input>
                {description.trim() === "" && (
                  <Text style={styles.error}>
                    * Renseignez la description du litige
                  </Text>
                )}
                <Text style={styles.formText}>Sélectionnez la date:</Text>
                <Datepicker
                  date={date}
                  onSelect={(nextDate) => setDate(nextDate)}
                />
              </View>
            </View>
          )}
          {step.step2 === true && (
            <View style={styles.body}>
              <HeaderForm
                title="Seconde étape:"
                subtitle="Sélectionnez votre fournisseur."
                progress={0.3}
                stepForm={() => {
                  setStep({
                    step1: false,
                    step2: false,
                    step3: true,
                    step4: false,
                  });
                }}
                stepFormBack={() => {
                  setStep({
                    step1: true,
                    step2: false,
                    step3: false,
                    step4: false,
                  });
                }}
              />
              <View style={styles.form}>
                <Picker
                  selectedValue={selectedProvider}
                  style={{ height: 20 }}
                  onValueChange={(provider) => setSelectedProvider(provider)}
                >
                  <Picker.Item label="Metro" value="metro" />
                  <Picker.Item label="PromoCash" value="promocash" />
                  <Picker.Item label="Brake" value="brake" />
                  <Picker.Item label="Felix Potin" value="felixpotin" />
                </Picker>
              </View>
            </View>
          )}
          {step.step3 === true && (
            <View style={styles.body}>
              <HeaderForm
                title="Troisième étape:"
                subtitle="Ajoutez une photo et le bon de livraison."
                progress={0.6}
                stepForm={() => {
                  setStep({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: true,
                  });
                }}
                stepFormBack={() => {
                  setStep({
                    step1: false,
                    step2: true,
                    step3: false,
                    step4: false,
                  });
                }}
              />
              <View style={styles.form}>
                <Button
                  style={styles.formButton}
                  status="basic"
                  onPress={() => {
                    setCameraView(true);
                  }}
                >
                  Sélectionner une photo
                </Button>
                {photoUri.trim() !== "" && (
                  <Text style={styles.fileText}>
                    La photo à bien été ajoutée !
                  </Text>
                )}
                <Button
                  style={styles.formButton}
                  status="basic"
                  onPress={() =>
                    DocumentPicker.getDocumentAsync({}).then(
                      async (response) => {
                        if (response.type == "success") {
                          try {
                            setFileUri(response.uri);
                          } catch (e) {
                            console.log(e);
                          }
                        }
                      }
                    )
                  }
                >
                  Sélectionner un bon le livraison
                </Button>
                {fileUri.trim() !== "" && (
                  <Text style={styles.fileText}>
                    Le document à bien été ajouté !
                  </Text>
                )}
              </View>
            </View>
          )}
          {step.step4 === true && (
            <View style={styles.body}>
              <HeaderForm
                title="Quatrième étape:"
                subtitle="Sélectionnez la commande concernée."
                progress={1}
                stepFormBack={() => {
                  setStep({
                    step1: false,
                    step2: false,
                    step3: true,
                    step4: false,
                  });
                }}
                stepForm={() => {
                  uploadFile(photoUri, "/photos");
                  uploadFile(fileUri, "/documents");
                  const newDispute: any = {
                    id: uuidv5.URL,
                    name: name,
                    description: description,
                    provider: selectedProvider,
                    photo: photoUri,
                    file: fileUri,
                    order: selectedOrder,
                  };
                  addDispute(newDispute);
                  navigation.goBack();
                }}
                stepFormName="Terminer"
              />
              <Picker
                selectedValue={selectedOrder}
                style={{ height: 20 }}
                onValueChange={(order, itemIndex) => setSelectedOrder(order)}
              >
                <Picker.Item label="Commande 1" value="commande1" />
                <Picker.Item label="Commande 2" value="commande2" />
                <Picker.Item label="Commande 3" value="commande3" />
                <Picker.Item label="Commande 4" value="commande4" />
              </Picker>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    backgroundColor: "#70cce5",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    padding: 20,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderWidth: 0,
    width: width / 3,
  },
  formButton: {
    margin: 10,
  },
  formText: {
    color: "#aaaaaa",
    marginTop: 10,
  },
  fileText: {
    marginLeft: 15,
    marginRight: 15,
    color: "#aad5e0",
  },
  error: {
    marginLeft: 15,
    marginRight: 15,
    color: "#c49797",
  },
});
