import AstraPayQrisSdk

@objc(AstrapayQrisReactNative)
class AstrapayQrisReactNative: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }

  @objc(executeQris)
    func executeQris() -> Void {
        DispatchQueue.main.async {
            let currentVc = RCTPresentedViewController()!
            let qrisVc = QrisComponent()
            let vc = UINavigationController(rootViewController: qrisVc)
            vc.modalPresentationStyle = .fullScreen
            vc.modalTransitionStyle = .crossDissolve
            currentVc.present(vc , animated: true, completion: nil)
        }
    }
}
