import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import type { QrisSdkConfiguration, QrisSdkModule } from './QrisSdkTypes';

const LINKING_ERROR =
  `The package 'astrapay-qris-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({
    ios: "- You have run 'pod install' or 'npx pod-install'\n",
    default: '',
  }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AstrapayQrisReactNative = NativeModules.AstraPayQrisReactNative
  ? NativeModules.AstraPayQrisReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const QrisModule = AstrapayQrisReactNative;
export const eventEmitter = (function () {
  if (Platform.OS === 'android') {
    return DeviceEventEmitter;
  } else if (Platform.OS === 'ios') {
    return new NativeEventEmitter(NativeModules.AstraPayQrisReactNative);
  }
  return DeviceEventEmitter;
})();

class QrisSdk implements QrisSdkModule {
  async initialize(config: QrisSdkConfiguration) {
    try {
      await NativeModules.AstraPayQrisReactNative.initializeQris(
        config.authToken,
        config.sdkToken,
        config.environment,
        config.isSnap
      );
    } catch (error) {}
  }

  async startTransaction() {
    try {
      await QrisModule.start();
    } catch (error) {
      console.error('Transaction Start Error:', error);
    }
  }

  onTransactionComplete(callback: () => void): void {
    eventEmitter.addListener('onTransactionComplete', callback);
  }

  onTransactionFailed(callback: () => void): void {
    eventEmitter.addListener('onTransactionFailed', callback);
  }

  onTransactionForbidden(callback: () => void): void {
    eventEmitter.addListener('onTransactionForbidden', callback);
  }

  onTransactionCanceled(callback: () => void): void {
    eventEmitter.addListener('onTransactionCanceled', callback);
  }

  onTransactionProcessing(callback: () => void): void {
    eventEmitter.addListener('onTransactionProcessing', callback);
  }

  onShowTransactionHistory(callback: () => void): void {
    eventEmitter.addListener('onShowTransactionHistory', callback);
  }

  removeListener() {
    eventEmitter.removeAllListeners('onTransactionComplete');
    eventEmitter.removeAllListeners('onTransactionFailed');
    eventEmitter.removeAllListeners('onTransactionForbidden');
    eventEmitter.removeAllListeners('onTransactionCanceled');
    eventEmitter.removeAllListeners('onTransactionProcessing');
    eventEmitter.removeAllListeners('onShowTransactionHistory');
  }
}

export default new QrisSdk();
