import AstraPayQrisSdk

@objc(AstrapayQrisReactNative)
class AstrapayQrisReactNative: AstrapayQrisReactNativeEventEmitter, AstraPayQrisSdk.QRProtocolSdk {
    var hasListener = false
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
    
    func onForbidden(viewController: UIViewController) {
        sendEvent(withName: "onTransactionForbidden", body: nil)
    }

    func onComplete(viewController: UIViewController) {
        sendEvent(withName: "onTransactionComplete", body: nil)
    }

    func onFailed(viewController: UIViewController) {
        sendEvent(withName: "onTransactionFailed", body: nil)
    }

    func onShowHistory(viewController: UIViewController) {
        sendEvent(withName: "onShowTransactionHistory", body: nil)
    }

    func onProcessing(viewController: UIViewController) {
        sendEvent(withName: "onTransactionProcessing", body: nil)
    }

    func onCancel(viewController: UIViewController) {
        sendEvent(withName: "onTransactionCanceled", body: nil)
    }
    
    override func startObserving() {
        super.startObserving()
        hasListener = true
    }
    
    override func stopObserving() {
        super.stopObserving()
        hasListener = false
    }
    
    override func sendEvent(withName name: String!, body: Any!) {
        if hasListener {
            super.sendEvent(withName: name, body: body)
        }
    }
}
