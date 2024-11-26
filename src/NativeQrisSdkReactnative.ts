import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

interface QrisSdkConfigurationSpec {
  authToken: string;
  sdkToken: string;
  environment: string;
  isSnap: boolean;
  refreshToken: string;
}
export interface Spec extends TurboModule {
  initialize(config: QrisSdkConfigurationSpec): Promise<string>;
  start(): void;
  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('QrisSdkReactnative');
