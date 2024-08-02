#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AstrapayQrisReactNative, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(executeQris)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
