import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import type {
  QrisSdkConfiguration,
  QrisTransactionHistorySummaryAndroid,
  QrisTransactionHistorySummaryIos,
} from './QrisSdkConfiguration';
import type { Spec } from './NativeQrisSdkReactnative';

const LINKING_ERROR =
  `The package 'qris-sdk-reactnative' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const QrisSdkReactnativeModule = isTurboModuleEnabled
  ? require('./NativeQrisSdkReactnative').default
  : NativeModules.QrisSdkReactnative;

const QrisSdkReactnative: Spec =
  QrisSdkReactnativeModule ??
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
export const eventEmitter = (function () {
  if (Platform.OS === 'android') {
    return DeviceEventEmitter;
  } else if (Platform.OS === 'ios') {
    return new NativeEventEmitter(QrisSdkReactnative);
  }
  return DeviceEventEmitter;
})();

class QrisSdk {
  static async initialize(config: QrisSdkConfiguration) {
    try {
      return QrisSdkReactnative.initialize(
        config.authToken,
        config.sdkToken,
        config.environment.toString(),
        config.isSnap,
        config.refreshToken
      );
    } catch (error) {
      console.error('Error initializing the sdk', error);
      return;
    }
  }

  static async startTransaction() {
    try {
      return QrisSdkReactnative.start();
    } catch (error) {
      console.error('Transaction Start Error:', error);
    }
  }

  static async checkTransactionStatus(id: string) {
    try {
      return QrisSdkReactnative.checkTransactionStatus(id);
    } catch (error) {
      console.error('Check status Error:', error);
    }
  }

  static onTransactionComplete(callback: () => void): void {
    eventEmitter.addListener('onTransactionComplete', callback);
  }

  static onTransactionFailed(callback: () => void): void {
    eventEmitter.addListener('onTransactionFailed', callback);
  }

  static onTransactionForbidden(callback: () => void): void {
    eventEmitter.addListener('onTransactionForbidden', callback);
  }

  static onTransactionCanceled(callback: () => void): void {
    eventEmitter.addListener('onTransactionCanceled', callback);
  }

  static onTransactionProcessing(callback: () => void): void {
    eventEmitter.addListener('onTransactionProcessing', callback);
  }

  static onShowTransactionHistory(callback: () => void): void {
    eventEmitter.addListener('onShowTransactionHistory', callback);
  }

  static onCompleteTransaction(callback: () => void): void {
    eventEmitter.addListener('onShowTransactionHistory', callback);
  }

  static onCompleteTransactionHistory(
    callback: (summary: QrisTransactionHistorySummary) => void
  ): void {
    eventEmitter.addListener('onCompleteTransactionHistory', callback);
  }

  static onCheckTransactionStatus(
    callback: (summary: QrisTransactionHistorySummary) => void
  ): void {
    eventEmitter.addListener('onCheckTransactionStatus', callback);
  }

  static removeListener() {
    eventEmitter.removeAllListeners('onTransactionComplete');
    eventEmitter.removeAllListeners('onTransactionFailed');
    eventEmitter.removeAllListeners('onTransactionForbidden');
    eventEmitter.removeAllListeners('onTransactionCanceled');
    eventEmitter.removeAllListeners('onTransactionProcessing');
    eventEmitter.removeAllListeners('onShowTransactionHistory');
    eventEmitter.removeAllListeners('onCompleteTransactionHistory');
  }
}

type QrisTransactionHistorySummary = Platform['OS'] extends 'android'
  ? QrisTransactionHistorySummaryAndroid
  : QrisTransactionHistorySummaryIos;

export type {
  QrisSdkConfiguration,
  QrisTransactionHistorySummaryIos,
  QrisTransactionHistorySummaryAndroid,
};
export default QrisSdk;
