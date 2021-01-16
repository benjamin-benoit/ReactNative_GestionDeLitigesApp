import React, { FC } from 'react';

const FormStepOne: FC = () => {
    return (
        <View style={styles.form}>
            <Text style={styles.formText}>Renseignez le nom du litige:</Text>
            <Input placeholder="nom"></Input>
            <Text style={styles.formText}>Renseignez une description:</Text>
            <Input placeholder="description"></Input>
            <Text style={styles.formText}>Sélectionnez la date:</Text>
            <Datepicker
                date={date}
                onSelect={nextDate => setDate(nextDate)}
            />
        </View>
    );
};

export default FormStepOne;