#import "QrisSdkReactnative.h"

@implementation QrisSdkReactnative
RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios

RCT_EXPORT_METHOD(initialize:(JS::NativeQrisSdkReactnative::QrisSdkConfigurationSpec &)config resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    QRConfigurationSdk.AUTH_TOKEN = config.authToken();
    if ([config.environment()  isEqual: @"SIT"]) {
        QRConfigurationSdk.BUILD_MODE = BuildModeSit;
    } else if([config.environment()  isEqual: @"UAT"]) {
        QRConfigurationSdk.BUILD_MODE = BuildModeUat;
    } else {
        QRConfigurationSdk.BUILD_MODE = BuildModeProd;
    }
    QRConfigurationSdk.SDK_TOKEN = config.sdkToken();
    QRNewRouter.sharedInstance.delegate = self;
    QRConfigurationSdk.isSnap = config.isSnap();
    QRConfigurationSdk.REFRESH_TOKEN = config.refreshToken();
}

RCT_EXPORT_METHOD(start) {
    dispatch_async(dispatch_get_main_queue(), ^{
            // Get the current view controller
        UIViewController *currentVc = RCTPresentedViewController();
        
        // Use the current view controller to present the QR scan
        [[QRNewRouter sharedInstance] presentQrScanFrom:currentVc];
    });

}


// Implement the delegate methods
#pragma mark - QRProtocolSdk Methods
- (NSArray<NSString *> *)supportedEvents {
    return @[@"onTransactionForbidden", @"onTransactionComplete", @"onTransactionFailed", @"onShowTransactionHistory", @"onTransactionProcessing", @"onTransactionCanceled", @"onCompleteTransaction", @"onCompleteTransactionHistory"];
}

- (void)onForbiddenWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onTransactionForbidden" body:@[]];
    }];
}

- (void)onCompleteWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onTransactionComplete" body:@[]];
    }];
}

- (void)onFailedWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onTransactionFailed" body:@[]];
    }];
}

- (void)onShowHistoryWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onShowTransactionHistory" body:@[]];
    }];
}

- (void)onProcessingWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onTransactionProcessing" body:@[]];
    }];
}

- (void)onCancelWithViewController:(UIViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
        [self sendEventWithName:@"onTransactionCanceled" body:@[]];
    }];
}

- (NSDictionary *)transactionHistoryToDictionary:(QrisTransactionHistorySummary *)history {
    return @{
        @"transactionAt": history.transactionAt ?: @"",
        @"status": history.status ?: @"",
        @"transactionNumber": history.transactionNumber ?: @"",
        @"referenceNumber": history.referenceNumber ?: @"",
        @"merchantName": history.merchantName ?: @"",
        @"merchantCity": history.merchantCity ?: @"",
        @"amount": history.amount ?: @"",
        @"discountAmount": history.discountAmount ?: @"",
        @"merchantId": history.merchantId ?: @""
    };
}

- (void)onCompleteTransactionWithHistory:(QrisTransactionHistorySummary *)history {
    NSDictionary *historyDict = [self transactionHistoryToDictionary:history];
    [self sendEventWithName:@"onCompleteTransactionHistory" body:historyDict];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeQrisSdkReactnativeSpecJSI>(params);
}
#endif

@end
