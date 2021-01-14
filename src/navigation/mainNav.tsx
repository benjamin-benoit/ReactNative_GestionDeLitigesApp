import React, { FC } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { DisputeForm, DisputesList } from '../screens';
import { NavigationContainer } from '@react-navigation/native'

const { Navigator, Screen } = createStackNavigator();

const MainNav : FC = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="disputeForm" component={DisputeForm}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default MainNav;