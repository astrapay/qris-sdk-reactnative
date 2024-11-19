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
} from 'react-native';
import { initialize, startTransaction } from 'qris-sdk-reactnative';
import type { QrisSdkConfiguration } from '../../src/QrisSdkConfiguration';

const App = () => {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken: '',
      sdkToken: 'XTOKEN',
      environment: 'UAT',
      isSnap: true,
    };

    initialize(config);

    return () => {};
  }, []);

  const handleStartTransaction = () => {
    startTransaction();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Text>HomeScreen</Text>
        <AppButton
          title="Navigate to QRIS"
          buttonStyle={styles.marginTop50}
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
      style={StyleSheet.flatten([styles.buttonContainer, buttonStyle])}
      onPress={onPress}
    >
      <View>
        <Text style={StyleSheet.flatten([styles.buttonText, textStyle])}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  marginTop50: {
    marginTop: 50,
  },
  buttonContainer: {
    backgroundColor: '#42a5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default App;
