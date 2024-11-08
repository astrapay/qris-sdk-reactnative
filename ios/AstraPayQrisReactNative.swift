import AstraPayQrisSdk

@objc(AstraPayQrisReactNative)
class AstraPayQrisReactNative: RCTEventEmitter {
    var hasListener = false
    
    @objc(initializeQris:sdkToken:environment:isSnap:resolve:reject:)
    func initializeQris(authToken: String, sdkToken: String, environment: String, isSnap: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
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
            AstraPayQrisSdk.QRNewRouter.sharedInstance.delegate = self
            AstraPayQrisSdk.QRConfigurationSdk.isSnap = isSnap
            resolve("SDK Initialized")
        }
        
    }
    
    @objc(start)
    func start() {
        DispatchQueue.main.async {
            let currentVc = RCTPresentedViewController()!
            AstraPayQrisSdk.QRNewRouter.sharedInstance.presentQrScan(from: currentVc)
        }
    }
    
    
    @objc
    override func startObserving() {
        super.startObserving()
        hasListener = true
    }
    
    @objc
    override func stopObserving() {
        super.stopObserving()
        hasListener = false
    }
    
    @objc
    override func sendEvent(withName name: String!, body: Any!) {
        if hasListener {
            super.sendEvent(withName: name, body: body)
        }
    }
    
    override func supportedEvents() -> [String]! {
        return ["onTransactionForbidden", "onTransactionComplete", "onTransactionFailed", "onShowTransactionHistory", "onTransactionProcessing", "onTransactionCanceled"]
    }
}

extension AstraPayQrisReactNative: AstraPayQrisSdk.QRProtocolSdk {
    func onForbidden(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onTransactionForbidden", body: [])
        }
    }

    func onComplete(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onTransactionComplete", body: [])
        }
    }

    func onFailed(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onTransactionFailed", body: [])
        }
    }

    func onShowHistory(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onShowTransactionHistory", body: [])
        }
    }

    func onProcessing(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onTransactionProcessing", body: [])
        }
    }

    func onCancel(viewController: UIViewController) {
        viewController.dismiss(animated: true) {
            self.sendEvent(withName: "onTransactionCanceled", body: [])
        }
    }
}
