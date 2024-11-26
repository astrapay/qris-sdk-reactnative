
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

if you are using new version of react-native, which is you using turbo module, you need to add the following lines at Appdelegate.mm (or Appdelegate.m for older version) file:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
 }

 - (BOOL)bridgelessEnabled
{
 return NO;
}
```
Additionally, you need to add permissions for gallery and camera access to your `.plist` file:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Permission to access the gallery</string>
<key>NSCameraUsageDescription</key>
<string>Permission to access the camera</string>
```

#### QrisSdkConfiguration

| Parameter     | Type     | Required     | Description|
| :--------     | :------- | :-------     | :----------|
| `authToken`   | `string` | Yes          | Authentication token provided by Custommer Astrapay |
| `sdkToken`   | `string` | Yes           | SDK token provided by registered client |
| `environment`   | `string` | Yes        | API environment (UAT for testing or PROD for production) |
| `isSnap`   | `boolean` | Yes        | Boolean flag to indicate if the client already use Snap |

#### Example

```javascript
const config: QrisSdkConfiguration = {
  authToken: 'your-auth-token',
  sdkToken: 'your-sdk-token',
  environment: 'UAT', // Use 'PROD' for production
  isSnap: true
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

## Example

```typescript
import QrisSdk, { QrisSdkConfiguration } from '@astrapay/qris-react-native';
import { useEffect } from 'react';
import {
  Alert,
  GestureResponderEvent,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyNTAwMDU0NiIsImFjY291bnRJZCI6MjExOSwiYWNjb3VudElkUG9pbnQiOjY2MiwibmJmIjoxNzI4NjE0MzA4LCJjYklkIjoiODQyNjg5ZmItNmFhNS00MDljLWEzNTMtMDA2YmY2ODU4NWEwIiwiaXNzIjoiQXN0cmFQYXktRGV2IiwiY2xhaW0iOiJTTkFQIiwiZXhwIjoxNzI5OTEwMzA4LCJpYXQiOjE3Mjg2MTQzMDgsImp0aSI6IjdiOGEwNmQ2LTk4ZTEtNGY4YS1hN2YzLWFiZDYwNDQyMzI5MCJ9.HUIyYEAEGDpR-qmZx6Kp5SBEh2qXA8Qifx9awZGqZ5Z2_znWNY0sCXwDgRyTN4UxmzOeueUoyNXSwnrxk1Y78PaOGAM-0lSTy4hu572PUi5_L48SlYog9vVUlZEK4QwA8Em7HcD4SE_xq3LfDLHHjdmHQ-shE0xMSPLFZmiPOzGxoxqw34C8R7XYbrqnx3X6kc5G39muQy2lBejeC73XEkCEXoJWKHi6YC_aM5FSlyP1UQvcjl8JG1HfS0MrTqT1qNItbyeSwi7-KAK3c2MZu7X88M413Ti0WbQeHTUT4TY54IKjUYW618ihyjgnmaLh_3QsX2SHoVVGSf50chj32A',
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

export default HomeScreen;


```
