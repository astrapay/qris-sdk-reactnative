import { NativeModules, Platform } from 'react-native';
import type { QrisSdkConfiguration } from './QrisSdkConfiguration';

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

const QrisSdkReactnative = QrisSdkReactnativeModule
  ? QrisSdkReactnativeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return QrisSdkReactnative.multiply(a, b);
}

export function initialize(config: QrisSdkConfiguration): Promise<string> {
  return QrisSdkReactnative.initialize(config);
}

export function startTransaction(): void {
  return QrisSdkReactnative.start();
}
