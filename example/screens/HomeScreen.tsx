import { View, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import QrisSdk, { QrisSdkConfiguration } from '@astrapay/qris-react-native';

const HomeScreen = () => {
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
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
