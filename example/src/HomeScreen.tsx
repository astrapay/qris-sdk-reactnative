import { View, Text, SafeAreaView, Alert } from 'react-native';
import AppButton from './component/AppButton';
import { useEffect } from 'react';
import type { QrisSdkConfiguration } from '../../src/QrisSdkTypes';
import QrisSdk from '../../src/QrisSdkModule';

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyNTAwMDU0NiIsImFjY291bnRJZCI6MjExOSwiYWNjb3VudElkUG9pbnQiOjY2MiwibmJmIjoxNzI4MDMyMjA4LCJjYklkIjoiODQyNjg5ZmItNmFhNS00MDljLWEzNTMtMDA2YmY2ODU4NWEwIiwiaXNzIjoiQXN0cmFQYXktRGV2IiwiY2xhaW0iOiJTTkFQIiwiZXhwIjoxNzI5MzI4MjA4LCJpYXQiOjE3MjgwMzIyMDgsImp0aSI6ImRlNzg4NjI1LTBjYjUtNGI1NS1hYTUzLTNlMTAyZmEzODA5YSJ9.ahvEMDNejeACqrACueByPbk3ybOGdR9k-eKDSLy53gGI1I3p9i7UIi15oqjtqsMm7OwhhbUV0PFiKk4p3yUPMuuhdAs0-rOqqDv6jyTIM26a8ARxE3zElFGj2X7Zhd519tqHPr5vhWck1k9SCg-Jrcj3cGZyxbjyGGKi0DK6nd0mXwKZPhBJSrr-qyBY_Qv9i-hFE3YtbtKKXuWK8BOl9FrS8ZcHBoBsO6UkewggtM7qVlczfp_S3MNQctHa554BFtcr0iPw20AV3mR2brZYzJMqXMi_SsvpWD8EVSOgBk8KxoDr8nLDkuViVpALU-iVCg0F3THwEBrs0VauwXworw',
      sdkToken: 'b983e0e72dd81d804262b9f1a7973ea11a2149df',
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
