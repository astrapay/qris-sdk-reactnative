package com.astrapayqrisreactnative

import com.astrapay.qris.sdk.AstraPayQris
import com.astrapay.qris.sdk.QRConfiguration
import com.astrapay.qris.sdk.QrisTransactionListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class AstrapayQrisReactNativeModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), QrisTransactionListener {

  override fun getName(): String {
    return "AstraPayQrisReactNative"
  }

  @ReactMethod
  fun initializeQris(authToken: String, sdkToken: String, environment: String, isSnap: Boolean, promise: Promise) {
    try {
      val configuration = QRConfiguration.Builder(
        authToken = authToken,
        sdkToken = sdkToken,
        environment = environment,
        isSnap = isSnap
      )
        .setEventListener(this)
        .build()

      AstraPayQris.initialize(configuration)
      promise.resolve("SDK Initialized")
    } catch (e: Exception) {
      promise.reject("InitializationError", e)
    }
  }

  @ReactMethod
  fun start() {
    currentActivity?.let {
      AstraPayQris.getInstance().start(it)
    }
  }

  @ReactMethod
  fun addListener(type: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(type: Int?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  override fun onTransactionComplete() {
    sendEvent("onTransactionComplete", null)
  }

  override fun onTransactionFailed() {
    sendEvent("onTransactionFailed", null)
  }

  override fun onTransactionForbidden() {
    sendEvent("onTransactionForbidden", null)
  }

  override fun onTransactionCanceled() {
    sendEvent("onTransactionCanceled", null)
  }

  override fun onTransactionProcessing() {
    sendEvent("onTransactionProcessing", null)
  }

  override fun onShowTransactionHistory() {
    sendEvent("onShowTransactionHistory", null)
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
  }
}
