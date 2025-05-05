import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initialize(
    authToken: string,
    sdkToken: string,
    environment: string,
    isSnap: boolean,
    refreshToken: string
  ): Promise<string>;
  start(): void;
  checkTransactionStatus(id: string): void;
  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('QrisSdkReactnative');
