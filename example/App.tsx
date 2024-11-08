/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './screens/HomeScreen';
import QrisSdk, { QrisSdkConfiguration } from '@astrapay/qris-react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // useEffect(() => {
  //   const config: QrisSdkConfiguration = {
  //     authToken:
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyNTAwMDU0NiIsImFjY291bnRJZCI6MjExOSwiYWNjb3VudElkUG9pbnQiOjY2MiwibmJmIjoxNzI4NjE0MzA4LCJjYklkIjoiODQyNjg5ZmItNmFhNS00MDljLWEzNTMtMDA2YmY2ODU4NWEwIiwiaXNzIjoiQXN0cmFQYXktRGV2IiwiY2xhaW0iOiJTTkFQIiwiZXhwIjoxNzI5OTEwMzA4LCJpYXQiOjE3Mjg2MTQzMDgsImp0aSI6IjdiOGEwNmQ2LTk4ZTEtNGY4YS1hN2YzLWFiZDYwNDQyMzI5MCJ9.HUIyYEAEGDpR-qmZx6Kp5SBEh2qXA8Qifx9awZGqZ5Z2_znWNY0sCXwDgRyTN4UxmzOeueUoyNXSwnrxk1Y78PaOGAM-0lSTy4hu572PUi5_L48SlYog9vVUlZEK4QwA8Em7HcD4SE_xq3LfDLHHjdmHQ-shE0xMSPLFZmiPOzGxoxqw34C8R7XYbrqnx3X6kc5G39muQy2lBejeC73XEkCEXoJWKHi6YC_aM5FSlyP1UQvcjl8JG1HfS0MrTqT1qNItbyeSwi7-KAK3c2MZu7X88M413Ti0WbQeHTUT4TY54IKjUYW618ihyjgnmaLh_3QsX2SHoVVGSf50chj32A',
  //     sdkToken: 'XTOKEN',
  //     environment: 'UAT',
  //     isSnap: true,
  //   };

  //   QrisSdk.initialize(config);

  //   QrisSdk.onTransactionComplete(() => {
  //     Alert.alert('Transaction Complete');
  //   });

  //   QrisSdk.onTransactionFailed(() => {
  //     Alert.alert('Transaction Failed');
  //   });

  //   QrisSdk.onTransactionForbidden(() => {
  //     Alert.alert('onTransactionForbidden Called');
  //   });

  //   QrisSdk.onTransactionCanceled(() => {
  //     Alert.alert('Transaction Canceled');
  //   });

  //   return () => {
  //     QrisSdk.removeListener();
  //   };
  // }, []);

  // const handleStartTransaction = () => {
  //   QrisSdk.startTransaction();
  // };

  // return (
  //   <SafeAreaView>
  //     <View>
  //       <Text>Anjaay</Text>
  //     </View>
  //   </SafeAreaView>
  // );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome home' }}
        />
        {/* <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Welcome To Profile' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
