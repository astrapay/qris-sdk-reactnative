
# Astrapay QRIS SDK for React Native

A React Native SDK to integrate Astrapay QRIS payment services into your mobile application.

## Installation

To add the Astrapay QRIS SDK to your project:

#### Using yarn:

```bash
yarn add @astrapay/qris-react-native
```

#### Using npm:

```bash
npm install @astrapay/qris-react-native
```

## Configuration

Before starting any QRIS transaction, initialize the SDK with a valid configuration object.

```typescript
QrisSdk.initialize(config)
```

### Android

If you have not enabled view binding in your Android Gradle file, add the following lines at android/app/build.gradle:

```gradle
android {
    ...
    viewBinding {
        enabled = true
    }
}
```
### iOS
Additionally, you need to add permissions for gallery and camera access to your `.plist` file:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Permission to access the gallery</string>
<key>NSCameraUsageDescription</key>
<string>Permission to access the camera</string>
```

#### QrisSdkConfiguration

| Parameter     | Type     | Required     | Description                                              |
| :--------     | :------- | :-------     |:---------------------------------------------------------|
| `authToken`   | `string` | Yes          | Authentication token provided by Customer Astrapay       |
| `sdkToken`   | `string` | Yes           | SDK token provided by registered client                  |
| `environment`   | `string` | Yes        | API environment (UAT for testing or PROD for production) |
| `isSnap`   | `boolean` | Yes        | Boolean flag to indicate if the client already use Snap  |
| `refreshToken`   | `string` | Yes        | Refresh token provided by Customer Astrapay              |

#### Example

```javascript
const config: QrisSdkConfiguration = {
  authToken: 'your-auth-token',
  sdkToken: 'your-sdk-token',
  environment: 'UAT', // Use 'PROD' for production
  isSnap: true,
  refreshToken: 'your-sdk-token'
};

QrisSdk.initialize(config);

```

## Usage

Once the SDK is initialized, you can start a QRIS transaction:

```javascript
QrisSdk.startTransaction()
```

Call this method to start a new QRIS transaction.

## Methods

* QrisSdk.initialize(config): Initializes the SDK with configuration parameters.
* QrisSdk.startTransaction(): Starts the QRIS transaction process

## Listeners

The SDK provides several listeners for handling transaction events:

* onTransactionComplete: Triggered when a transaction is completed successfully.
* onTransactionFailed: Triggered when a transaction fails.
* onTransactionForbidden: Triggered if the transaction is forbidden.
* onTransactionCanceled: Triggered if the user cancels the transaction.
* onCompleteTransactionHistory: Triggered if the user completed the transaction.
* onCheckTransactionStatus: Triggered if the user wants to check the transaction status.

## Example

```typescript
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



```
