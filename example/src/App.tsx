import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  TouchableOpacity,
  Alert,
} from 'react-native';

import type { QrisSdkConfiguration } from '@astrapay/qris-react-native';
import QrisSdk from '@astrapay/qris-react-native';

const App = () => {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken:
        '1eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyNTAwMDU0NiIsImFjY291bnRJZCI6MjExOSwiYWNjb3VudElkUG9pbnQiOjY2MiwibmJmIjoxNzMyNjk4NzI5LCJjYklkIjoiODQyNjg5ZmItNmFhNS00MDljLWEzNTMtMDA2YmY2ODU4NWEwIiwiaXNzIjoiQXN0cmFQYXktRGV2IiwiY2xhaW0iOiJTTkFQIiwiZXhwIjoxNzMzOTk0NzI5LCJpYXQiOjE3MzI2OTg3MjksImp0aSI6IjI4Zjk4ZGQ5LTljZWItNDNjOC1iZDFmLTMyYmRkNzc2M2RjMiJ9.CQIfCBTetGDfISoe38X3TpwsY8XAD0ZAkyaX2JfGlcRUeg2ZAoOm6k7p4DX_uvbzK_6Oo5bXKywA01ibGjTqPpR_ouHSpLRvrY-YrOWlUgzFMa-E8Nzi_PMNHeQhLM_eaCRwtJdY3ERsyNSiAgGQRRfCCD-v1gZgPylHQtB06xnejpYmkZIerOJe0bdt_DfKXi_SCi8gZ9bZ41hr0xZv2tu8TcMJtvAUaXuxWbx4_bWPYJNUh4ytBdQtA6YJWjXWw7pdjhUVkUhd5fAXmSEkHj6Xg3-fEDEoPLb3VqtKJ8IqA6glHG0S1Km1w9jgbQRjxJTyM0aSRxZh3xUVPBWTtw',
      sdkToken: 'XTOKEN',
      environment: 'UAT',
      isSnap: true,
      refreshToken: '538ae165-c83f-49dd-948b-b87e29da4703',
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

    QrisSdk.onCompleteTransactionHistory((data) => {
      Alert.alert('Transaction onCompleteTransaction', JSON.stringify(data));
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
          title="Navigate to QRIS"
          buttonStyle={{ marginTop: 50 }}
          onPress={handleStartTransaction}
        />
      </View>
    </SafeAreaView>
  );
};

type AppButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
const AppButton: React.FC<AppButtonProps> = (props) => {
  const { onPress, title, buttonStyle, textStyle } = props;
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.container, buttonStyle])}
      onPress={onPress}
    >
      <View>
        <Text style={StyleSheet.flatten([styles.text, textStyle])}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#42a5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: 'white' },
});

export default App;
