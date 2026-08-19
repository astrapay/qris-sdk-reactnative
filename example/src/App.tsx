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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxOTk5NDkiLCJ1c2VySWRNZXJjaGFudCI6MCwiYWNjb3VudElkU2V0dGxlbWVudCI6MCwiaXNzIjoiQXN0cmFQYXktRGV2IiwiYWNjb3VudElkIjo1MzksImFjY291bnRJZFBvaW50IjowLCJuYmYiOjE3ODcxMjM4ODEsImNiSWQiOiJhZDRiNGNmMy1jZjc2LTRjN2QtOGNhMy1jY2Q5NTY0NmUxZjEiLCJjbGFpbSI6IlNOQVAiLCJjcmVkZW50aWFsSWQiOjAsImV4cCI6MTc4ODQxOTg4MSwiaWF0IjoxNzg3MTIzODgxLCJqdGkiOiIxOGJkYWE0NC01MjNiLTRlYTMtOWQzNS1lMTkzYTRlNTQyYWUifQ.Dgb2LZsDE5Vp87qPGQ16hKr5Wt_531wQqFlHj2myXYPxGL2QL0oIUNj1ceQ6M1Szba5676ZWnixKSjZTZ0hXVN7COn2OUmjowDeVfIlI0NBmvA_OPjPmsabCbJv44-UG40dJQxdFGWtKJLkQuxsX4Di_nLxDwNt-p2ROO3dJaI8VwBUtwUJPEQliA-1Oy-EqI7-DqHBR4QEEtLYRLHnxrMrXIK57i-jVwn_CMh5aazK5mLsUQIrmlYXYxRso7eUZCqoslmCKhBZIzRIvAsJUfjlNSGJoWDz-L13vGEthbxftiFhTKcYuZGX8Rkd7ndaCuPWeedPqokDun1LK4_JZ6A',
      sdkToken: 'eee0cb6a-2480-48d5-bc78-989ccfdd99d4',
      environment: 'UAT',
      isSnap: true,
      refreshToken: '7502dbd5-17f1-4537-bc2a-37afd8594bfc',
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
      Alert.alert('onCompleteTransactionHistory', JSON.stringify(data));
    });

    QrisSdk.onCheckTransactionStatus((data) => {
      Alert.alert('onCheckTransactionStatus', JSON.stringify(data));
    });

    return () => {
      QrisSdk.removeListener();
    };
  }, []);

  const handleStartTransaction = () => {
    QrisSdk.startTransaction();
  };
  const handleCheckTransactionStatus = (id: string) => {
    Alert.alert('Check Transaction Status', id);
    QrisSdk.checkTransactionStatus(id);
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
        <AppButton
          title="Check Transaction Status"
          buttonStyle={{ marginTop: 50 }}
          onPress={() => handleCheckTransactionStatus('4708')}
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
