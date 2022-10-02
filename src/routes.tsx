import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

import Inicio from './screens/inicio'
import Personagens from './screens/personagens';
import Infos from './screens/infos';

export default function Routes(){
    return(
        <NavigationContainer>
            <StatusBar hidden />
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Inicio} />
                <Stack.Screen name="Characters" component={Personagens} />
                <Stack.Screen name="Infos" component={Infos} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}