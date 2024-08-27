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
            
            AstraPayQrisSdk.QRConfigurationSdk.AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxOTk5NDkiLCJhY2NvdW50SWQiOjUzOSwiYWNjb3VudElkUG9pbnQiOjAsIm5iZiI6MTcyNDcyOTQ2OCwiY2JJZCI6ImUyNTc0NzYzLWE1M2MtNGMxYy1iNjZiLTNkMmQwMDkzZTNjYSIsImlzcyI6IkFzdHJhUGF5LURldiIsImNsYWltIjoiU05BUCIsImV4cCI6MTcyNjAyNTQ2OCwiaWF0IjoxNzI0NzI5NDY4LCJqdGkiOiJjZmI1Zjk4Ni04YWJjLTQ5MWMtOGVkZi0wZjNiMWJkOGY3NTEifQ.j80ID5YfUiTMKKSHgD-VtVkRJOmVV49bpwUKXYArcXokXvsfPokC9MiOy8NKbfRXkPFyw9s_vFqAMDQrpjVj6eEIOUHpgcKIa-3b382LJspfB2jvQK8Zn_8crlihTeF7YBuch9EZbMncYV-8fMPkNmvPJ3YGYZ2x9DLZp5-O8ls-RMIcnf7HNmzPtDSC786bU63R4Esa5kCuUixH8tMDs-63DeZ48Yv3Sc6DrFT_DYte8sRqGeoTnaeBwAKoDthas24SILSkSrUJjm_1PYQLpUpz69j0meg9UVuPuorLUcjqu3CkrXqTiQd_W08M7J8LQ0EWkFK5YHX10oqJIvbHuA"
            AstraPayQrisSdk.QRConfigurationSdk.BUILD_MODE = .uat
            AstraPayQrisSdk.QRConfigurationSdk.SDK_TOKEN = "XTOKEN"
            AstraPayQrisSdk.QRConfigurationSdk.otpVersion = true
            AstraPayQrisSdk.QRConfigurationSdk.loproVersion = 21
            AstraPayQrisSdk.QRConfigurationSdk.isSnap = true
            AstraPayQrisSdk.QRConfigurationSdk.qrisConfirmationVersion = 1
            AstraPayQrisSdk.QRConfigurationSdk.topupViewController = UIViewController()
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
