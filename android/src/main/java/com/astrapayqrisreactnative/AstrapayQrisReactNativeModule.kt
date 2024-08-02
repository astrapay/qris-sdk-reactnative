package com.astrapayqrisreactnative

import com.astrapay.apqrisscanner.ApQrisScanner
import com.astrapay.apqrisscanner.ApScannerListener
import com.astrapay.apqrisscanner.ApScannerSetup
import com.astrapay.apqrisscanner.EventType
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class AstrapayQrisReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ApScannerListener {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

    @ReactMethod
  fun executeQris() {
    val setup = ApScannerSetup(currentActivity,this)
    ApQrisScanner.execute(setup)
//    promise.resolve(a * b)
  }

  override fun onComplete(type: EventType) {
  }

  override fun onQrisScanned(data: String) {
  }


  companion object {
    const val NAME = "AstrapayQrisReactNative"
  }
}
