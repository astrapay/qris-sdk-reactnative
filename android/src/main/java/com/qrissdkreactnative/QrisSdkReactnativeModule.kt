package com.qrissdkreactnative

import com.astrapay.qris.sdk.AstraPayQris
import com.astrapay.qris.sdk.QRConfiguration
import com.astrapay.qris.sdk.QrisTransactionListener
import com.astrapay.qris.sdk.internal.data.models.TransactionHistoryResult
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class QrisSdkReactnativeModule internal constructor(val context: ReactApplicationContext) :
  QrisSdkReactnativeSpec(context), QrisTransactionListener {

  override fun getName(): String {
    return NAME
  }
  companion object {
    const val NAME = "QrisSdkReactnative"
  }

  @ReactMethod
  override fun initialize(config: ReadableMap?, promise: Promise?) {
    try {
      val configuration = QRConfiguration.Builder(
        authToken = config?.getString("authToken") ?: "",
        sdkToken = config?.getString("sdkToken") ?: "",
        environment = config?.getString("environment") ?: "",
        isSnap = config?.getBoolean("isSnap") ?: true,
        xRefreshToken = config?.getString("refreshToken") ?: "",
      )
        .setEventListener(this)
        .build()

      AstraPayQris.initialize(configuration)
      promise?.resolve("SDK Initialized")
    } catch (e: Exception) {
      promise?.reject("InitializationError", e)
    }
  }

  @ReactMethod
  override fun start() {
    currentActivity?.let {
      AstraPayQris.getInstance().start(it)
    }
  }

  @ReactMethod
  override fun addListener(type: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  override fun onTransactionComplete(transactionHistoryResult: TransactionHistoryResult) {
//    sendEvent("onTransactionComplete", transactionHistoryResult.toWritableMap())
    sendEvent("onCompleteTransactionHistory", transactionHistoryResult.toWritableMap()) // kenapa namanya ini? di ios gini
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

  override fun onShowTransactionHistory() {
    sendEvent("onShowTransactionHistory", null)
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
  }
}
