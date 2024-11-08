
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
  // Create a bridge without TurboModules
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  // Use the old bridge without TurboModules
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:self.moduleName
                                            initialProperties:self.initialProps];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;

  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
 }
```

For swift project, you need to add the following lines at Appdelegate.swift file:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  ...
  // Create a bridge without TurboModules
  let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)

  // Use the old bridge without TurboModules
  let rootView = RCTRootView(bridge: bridge, moduleName: moduleName, initialProperties: initialProps)

  // Set up the window and root view controller
  let rootViewController = UIViewController()
  rootViewController.view = rootView

  window = UIWindow(frame: UIScreen.main.bounds)
  window?.rootViewController = rootViewController
  window?.makeKeyAndVisible()

  return true
}
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
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { useEffect } from 'react';
import QrisSdk from '@astrapay/qris-react-native';

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    const config: QrisSdkConfiguration = {
      authToken: 'your-auth-token',
      sdkToken: 'your-sdk-token',
      environment: 'UAT', // or 'PROD'
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
      Alert.alert('Transaction Forbidden');
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
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Home Screen</Text>
        <AppButton title="Start QRIS Transaction" onPress={handleStartTransaction} />
      </View>
    </SafeAreaView>
  );
}

```
