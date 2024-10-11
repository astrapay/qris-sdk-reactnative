export interface QrisSdkConfiguration {
  authToken: string;
  sdkToken: string;
  environment: 'SIT' | 'UAT' | 'PROD';
  isSnap: boolean;
}
