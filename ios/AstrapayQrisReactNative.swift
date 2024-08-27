import AstraPayQrisSdk

@objc(AstrapayQrisReactNative)
class AstrapayQrisReactNative: NSObject, AstraPayQrisSdk.QRProtocolSdk {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }

  @objc(executeQris)
    func executeQris() -> Void {
        DispatchQueue.main.async {
            let currentVc = RCTPresentedViewController()!
            
            AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .uat
            AstraPayQrisSdk.QRConfigurationSdk.SDK_TOKEN = "XTOKEN"
            AstraPayQrisSdk.QRConfigurationSdk.otpVersion = true
            AstraPayQrisSdk.QRConfigurationSdk.loproVersion = 21
            AstraPayQrisSdk.QRConfigurationSdk.isSnap = true
            AstraPayQrisSdk.QRConfigurationSdk.qrisConfirmationVersion = 1
//            AstraPayQrisSdk.QRConfigurationSdk.topupViewController = TopUpVc()
            AstraPayQrisSdk.QRNewRouter.sharedInstance.delegate = self
            AstraPayQrisSdk.QRNewRouter.sharedInstance.presentQrScan(from: currentVc)
            

//            let qrisVc = QrisComponent()
//            let vc = UINavigationController(rootViewController: qrisVc)
//            vc.modalPresentationStyle = .fullScreen
//            vc.modalTransitionStyle = .crossDissolve
//            currentVc.present(vc , animated: true, completion: nil)
        }
    }
    
    func onForbidden(viewControler: UIViewController) {
        
    }
    
    func onForbidden(viewController: UIViewController) {
        
    }
    
    func onComplete(viewController: UIViewController) {
        
    }
    
    func onFailed(viewController: UIViewController) {
        
    }
    
    func onShowHistory(viewController: UIViewController) {
        
    }
    
    func onProcessing(viewController: UIViewController) {
        
    }
    
    func onCancel(viewController: UIViewController) {
        
    }
    
    func onPaylaterActivate(viewController: UIViewController) {
        
    }
}
