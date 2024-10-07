import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';
import QrisScreen from './QrisScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome home' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Welcome To Profile' }}
        />

        <Stack.Screen
          name="Qris"
          component={QrisScreen}
          options={{ title: 'QRIS Transaction' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
