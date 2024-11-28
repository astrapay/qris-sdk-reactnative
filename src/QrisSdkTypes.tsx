export interface QrisSdkConfiguration {
  authToken: string;
  sdkToken: string;
  refreshToken: string;
  environment: 'SIT' | 'UAT' | 'PROD';
  isSnap: boolean;
}

export interface QrisTransactionHistorySummaryIos {
  transactionAt?: string;
  status?: string;
  transactionNumber?: string;
  referenceNumber?: string;
  merchantName?: string;
  merchantCity?: string;
  amount?: string;
  discountAmount?: string;
  merchantId?: string;
}

export interface QrisTransactionHistorySummaryAndroid {
  transactionAt?: string;
  status?: string;
  transactionNumber?: string;
  referenceNumber?: string;
  merchantName?: string;
  merchantCity?: string;
  amount?: string;
  discount?: string;
  totalAmount?: string;
  refMerchantId?: string;
}
