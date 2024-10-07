import QrisSdkModule from './QrisSdkModule';

export interface QrisSdkConfiguration {
  authToken: string;
  sdkToken: string;
  environment: 'SIT' | 'UAT' | 'PROD';
  isSnap: boolean;
}

export interface QrisSdkModule {
  initialize(config: QrisSdkConfiguration): void;
  startTransaction(): void;
}
