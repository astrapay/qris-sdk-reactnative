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
  override fun initialize(authToken: String?, sdkToken: String?, environment: String?, isSnap: Boolean, refreshToken: String?, promise: Promise?) {
    try {
      val configuration = QRConfiguration.Builder(
        authToken = authToken ?: "",
        sdkToken = sdkToken ?: "",
        environment = environment ?: "",
        isSnap = isSnap,
        xRefreshToken = refreshToken ?: "",
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
  override fun checkTransactionStatus(id: String?) {
    currentActivity?.let {
      AstraPayQris.getInstance().checkStatus(it, id!!)
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

  override fun onTransactionForbidden() {
    sendEvent("onTransactionForbidden", null)
  }

  override fun onTransactionProcessing() {
    sendEvent("onTransactionProcessing", null)
  }

  override fun onTransactionCanceled() {
    sendEvent("onTransactionCanceled", null)
  }

  override fun onTransactionComplete() {
    sendEvent("onTransactionComplete", null)
  }

  override fun onTransactionFailed() {
    sendEvent("onTransactionFailed", null)
  }

  private fun TransactionHistoryResult.toWritableMap(): WritableMap {
    return Arguments.createMap().apply {
      putString("transactionId", transactionId)
      putString("transactionAt", transactionAt)
      putString("status", status)
      putString("transactionNumber", transactionNumber)
      putString("referenceNumber", referenceNumber)
      putString("merchantName", merchantName)
      putString("merchantCity", merchantCity)
      putString("discount", discount)
      putString("amount", amount)
      putString("totalAmount", totalAmount)
      putString("refMerchantId", merchantId)
    }
  }

  override fun checkStatusTransaction(transactionDetail: TransactionHistoryResult?) {
    sendEvent("onCompleteTransactionHistory", transactionDetail?.toWritableMap())
  }

  override fun onCompleteTransactionHistory(transactionHistoryResult: TransactionHistoryResult?) {
    sendEvent("onCompleteTransactionHistory", transactionHistoryResult?.toWritableMap())
  }

  override fun onShowTransactionHistory() {
    sendEvent("onShowTransactionHistory", null)
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
  }
}
