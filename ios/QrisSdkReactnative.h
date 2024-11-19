
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNQrisSdkReactnativeSpec.h"

@interface QrisSdkReactnative : NSObject <NativeQrisSdkReactnativeSpec>
#else
#import <React/RCTBridgeModule.h>

@interface QrisSdkReactnative : NSObject <RCTBridgeModule>
#endif

@end
