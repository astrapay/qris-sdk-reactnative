import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

interface QrisSdkConfigurationSpec {
  authToken: string;
  sdkToken: string;
  environment: string;
  isSnap: boolean;
}
export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  initialize(config: QrisSdkConfigurationSpec): Promise<string>;
  start(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('QrisSdkReactnative');
