package com.qrissdkreactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class QrisSdkReactnativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initialize(config: ReadableMap?, promise: Promise?)

  abstract fun start()

  abstract fun addListener(eventType: String?)

  abstract fun removeListeners(count: Double)
}
