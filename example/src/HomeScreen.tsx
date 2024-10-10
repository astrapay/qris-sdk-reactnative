import { View, Text, SafeAreaView, Alert } from 'react-native';
import AppButton from './component/AppButton';
import { useEffect } from 'react';
import type { QrisSdkConfiguration } from '../../src/QrisSdkTypes';
import QrisSdk from '../../src';

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyNTAwMDU0NiIsImFjY291bnRJZCI6MjExOSwiYWNjb3VudElkUG9pbnQiOjY2MiwibmJmIjoxNzI4NTQxNTMwLCJjYklkIjoiODQyNjg5ZmItNmFhNS00MDljLWEzNTMtMDA2YmY2ODU4NWEwIiwiaXNzIjoiQXN0cmFQYXktRGV2IiwiY2xhaW0iOiJTTkFQIiwiZXhwIjoxNzI5ODM3NTMwLCJpYXQiOjE3Mjg1NDE1MzAsImp0aSI6ImFkNDUxZjFiLTU0MWQtNGNhNS1hMDhhLTY0Y2I4MTQ0ZDIyOCJ9.RJmZavzV2FZSbFQWQ-yf9IG6b1cOqUp09-EvC25mzUExFlDeBigIYg0UgrrK1fnnCaplAA-bwH8W5CHLDCdehvOlwWptFEYhjCdGe11zlHhrxljNYoCDrq3QY4dyWeTFIng7rHOcXN4E0_Q8cnp87vWvm8EH5-xOlKya1xA_yYYh7dfxMQPfaSiIgtV_pjPT30G9ThI25q8QIjfZ0nUoQ4DcO7TlY3F0RuiBlPt74Ch5QGpfSgWOrkyDeO21hdGvy_P--Pm7Ouh63HJEcBUFyD7VNxq45SEA6imx-F32zBH1G_B_7lSzvEWn_vogze4UdYFY8JqLc2ynm86ROyKq2A',
      sdkToken: 'XTOKEN',
      environment: 'UAT',
      isSnap: true,
    };

    QrisSdk.initialize(config);

    QrisSdk.onTransactionComplete(() => {
      Alert.alert('Transaction Complete');
    });

    QrisSdk.onTransactionFailed(() => {
      Alert.alert('Transaction Failed');
    });

    QrisSdk.onTransactionForbidden(() => {
      Alert.alert('onTransactionForbidden Called');
    });

    QrisSdk.onTransactionCanceled(() => {
      Alert.alert('Transaction Canceled');
    });

    return () => {
      QrisSdk.removeListener();
    };
  }, []);

  const handleStartTransaction = () => {
    QrisSdk.startTransaction();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 30,
        }}
      >
        <Text>HomeScreen</Text>
        <AppButton
          title="Navigate to profile"
          buttonStyle={{ marginTop: 50 }}
          onPress={() => navigation.navigate('Profile')}
        />

        <AppButton
          title="Navigate to QRIS"
          buttonStyle={{ marginTop: 50 }}
          onPress={handleStartTransaction}
        />
      </View>
    </SafeAreaView>
  );
}
