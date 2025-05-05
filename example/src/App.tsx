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
      authToken: 'auth-token',
      sdkToken: 'XTOKEN',
      environment: 'UAT',
      isSnap: true,
      refreshToken: 'refresh-token',
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

    QrisSdk.onCheckTransactionStatus((data) => {
      Alert.alert('Transaction onCheckTransactionStatus', JSON.stringify(data));
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
