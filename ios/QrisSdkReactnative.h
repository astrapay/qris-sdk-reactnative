#import "AstraPayQrisSdk/AstraPayQrisSdk-Swift.h"
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNQrisSdkReactnativeSpec.h"

@interface QrisSdkReactnative : RCTEventEmitter <NativeQrisSdkReactnativeSpec, QRProtocolSdk>
#else
#import <React/RCTBridgeModule.h>

@interface QrisSdkReactnative : RCTEventEmitter <RCTBridgeModule, QRProtocolSdk>
#endif
@end
