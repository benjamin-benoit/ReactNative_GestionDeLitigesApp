import { Datepicker } from "@ui-kitten/components";
import React, { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dispute } from "../dto/dispute";
import Input from "./input";
interface Props {
  data: Dispute;
  setData: Function;
}

const FormStepOne: FC<Props> = ({ data, setData }: Props) => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.form}>
      <Text style={styles.formText}>Renseignez le nom du litige:</Text>
      <Input
        placeholder="nom"
        value={data?.name}
        onChangeText={(text: string) => setData({ name: text })}
      ></Input>
      <Text style={styles.formText}>Renseignez une description:</Text>
      <Input
        placeholder="description"
        value={data?.description}
        onChangeText={(text: string) => setData({ description: text })}
      ></Input>
      <Text style={styles.formText}>Sélectionnez la date:</Text>
      <Datepicker date={date} onSelect={(nextDate) => setDate(nextDate)} />
    </View>
  );
};

export default FormStepOne;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    padding: 20,
  },
  formText: {
    color: "#aaaaaa",
  },
});
