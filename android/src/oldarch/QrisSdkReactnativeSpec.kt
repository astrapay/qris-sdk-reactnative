package com.qrissdkreactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReactMethod

abstract class QrisSdkReactnativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initialize(authToken: String?, sdkToken: String?, environment: String?, isSnap: Boolean, refreshToken: String?, promise: Promise?)

  abstract fun start()

  abstract fun addListener(eventType: String?)

  abstract fun removeListeners(count: Double)
}
