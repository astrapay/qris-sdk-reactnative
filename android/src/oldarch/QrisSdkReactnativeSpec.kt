package com.qrissdkreactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class QrisSdkReactnativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initialize(config: ReadableMap?, promise: com.facebook.react.bridge.Promise?)

  abstract fun start()

  abstract fun addListener(eventType: String?)

  abstract fun removeListeners(count: Double)
}
