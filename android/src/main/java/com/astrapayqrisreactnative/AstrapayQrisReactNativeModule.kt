package com.astrapayqrisreactnative

import com.astrapay.qris.sdk.AstraPayQris
import com.astrapay.qris.sdk.QRConfiguration
import com.astrapay.qris.sdk.QrisTransactionListener
import com.astrapay.qris.sdk.internal.data.models.TransactionHistoryResult
import com.facebook.react.bridge.Arguments
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
  fun initializeQris(authToken: String, sdkToken: String, refreshToken: String, environment: String, isSnap: Boolean, promise: Promise) {
    try {
      val configuration = QRConfiguration.Builder(
        authToken = authToken,
        sdkToken = sdkToken,
        environment = environment,
        isSnap = isSnap,
        xRefreshToken = refreshToken
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

  private fun TransactionHistoryResult.toWritableMap(): WritableMap {
    return Arguments.createMap().apply {
      putString("transactionAt", transactionAt)
      putString("status", status)
      putString("transactionNumber", transactionNumber)
      putString("referenceNumber", referenceNumber)
      putString("merchantName", merchantName)
      putString("merchantCity", merchantCity)
      putString("discount", discount)
      putString("amount", amount)
      putString("totalAmount", totalAmount)
      putString("refMerchantId", refMerchantId)
    }
  }

  override fun onTransactionComplete(transactionHistoryResult: TransactionHistoryResult) {
    sendEvent("onCompleteTransactionHistory", transactionHistoryResult.toWritableMap())
  }

  override fun onTransactionFailed(transactionHistoryResult: TransactionHistoryResult?) {
    sendEvent("onTransactionFailed", null)
  }

  override fun onTransactionForbidden() {
    sendEvent("onTransactionForbidden", null)
  }

  override fun onTransactionCanceled() {
    sendEvent("onTransactionCanceled", null)
  }

  override fun onTransactionProcessing(transactionHistoryResult: TransactionHistoryResult) {
    sendEvent("onTransactionProcessing", null)
  }

  override fun onShowTransactionHistory() {
    sendEvent("onShowTransactionHistory", null)
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
  }
}
