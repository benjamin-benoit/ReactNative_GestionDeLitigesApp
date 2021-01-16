import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { DisputeForm, DisputesList, Home } from '../screens';
import { NavigationContainer } from '@react-navigation/native';

const { Navigator, Screen } = createStackNavigator();

const MainNav : FC = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Accueil" component={Home}/>
                <Screen name="disputeForm" component={DisputeForm} options={{ title: 'Ajouter un litige' }}/>
                <Screen name="disputesList" component={DisputesList} options={{ title: 'Liste des litiges' }}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default MainNav;