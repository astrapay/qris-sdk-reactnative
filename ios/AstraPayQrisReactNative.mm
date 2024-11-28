#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AstraPayQrisReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initializeQris:(NSString *)authToken
                  sdkToken:(NSString *)sdkToken
                  refreshToken:(NSString *)refreshToken
                  environment:(NSString *)environment
                  isSnap:(BOOL)isSnap
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start)
RCT_EXTERN_METHOD(supportedEvents)
RCT_EXTERN_METHOD(startObserving)
RCT_EXTERN_METHOD(stopObserving)
RCT_EXTERN_METHOD(sendEvent)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
