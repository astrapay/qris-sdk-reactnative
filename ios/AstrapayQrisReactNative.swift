import AstraPayQrisSdk

@objc(AstrapayQrisReactNative)
class AstrapayQrisReactNative: NSObject, AstraPayQrisSdk.QRProtocolSdk {
    
    @objc(authToken:sdkToken:environment:isSnap:withResolver:withRejecter:)
    func initializeQris(authToken: String, sdkToken: String, environment: String, isSnap: Bool, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        AstraPayQrisSdk.QRConfigurationSdk.AUTH_TOKEN = authToken
        switch environment {
            case "SIT":
                AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .sit
            case "UAT":
                AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .uat
            case "PROD":
                AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .prod
            default:
                AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .prod
        }
        AstraPayQrisSdk.QRConfigurationSdk.SDK_TOKEN = sdkToken
        AstraPayQrisSdk.QRConfigurationSdk.otpVersion = true
        AstraPayQrisSdk.QRConfigurationSdk.loproVersion = 21
        AstraPayQrisSdk.QRConfigurationSdk.isSnap = isSnap
        AstraPayQrisSdk.QRConfigurationSdk.qrisConfirmationVersion = 1
        resolver("SDK Initialized")
    }
    
    @objc(start)
    func start() {
        DispatchQueue.main.async {
            let currentVc = RCTPresentedViewController()!
            AstraPayQrisSdk.QRNewRouter.sharedInstance.delegate = self
            AstraPayQrisSdk.QRNewRouter.sharedInstance.presentQrScan(from: currentVc)
        }
    }
    
    func onForbidden(viewControler: UIViewController) {
        print("onForbidden1")
    }
    
    func onForbidden(viewController: UIViewController) {
        print("onForbidden2")
    }
    
    func onComplete(viewController: UIViewController) {
        print("onComplete")
    }
    
    func onFailed(viewController: UIViewController) {
        print("onFailed")
    }
    
    func onShowHistory(viewController: UIViewController) {
        print("onShowHistory")
    }
    
    func onProcessing(viewController: UIViewController) {
        print("onProcessing")
    }
    
    func onCancel(viewController: UIViewController) {
        print("onCancel")
    }
    
    func onPaylaterActivate(viewController: UIViewController) {
        print("onPaylaterActivate")
    }
}