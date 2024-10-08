#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AstrapayQrisReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initializeQris:(NSString)authToken:
                  (NSString)sdkToken:
                  (NSString)environment:
                  (BOOL)isSnap:
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start)
RCT_EXTERN_METHOD(supportedEvents)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
