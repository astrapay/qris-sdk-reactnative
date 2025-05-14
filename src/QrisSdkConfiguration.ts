export interface QrisSdkConfiguration {
  authToken: string;
  sdkToken: string;
  environment: 'SIT' | 'UAT' | 'PROD';
  isSnap: boolean;
  refreshToken: string;
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
  transactionId?: string;
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
