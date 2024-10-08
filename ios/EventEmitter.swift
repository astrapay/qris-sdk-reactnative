//
//  EventEmitter.swift
//  astrapay-qris-react-native
//
//  Created by Ahmad Nabil on 08/10/24.
//

import Foundation

class EventEmitter {
    /// Shared Instance.
        public static var sharedInstance = EventEmitter()

        // ReactNativeEventEmitter is instantiated by React Native with the bridge.
        private static var eventEmitter: AstrapayQrisReactNativeEventEmitter!

        private init() {}

        // When React Native instantiates the emitter it is registered here.
        func registerEventEmitter(eventEmitter: AstrapayQrisReactNativeEventEmitter) {
            EventEmitter.eventEmitter = eventEmitter
        }

        func dispatch(name: String, body: Any?) {
            EventEmitter.eventEmitter.sendEvent(withName: name, body: body)
        }

        /// All Events which must be support by React Native.
        lazy var allEvents: [String] = {
            var allEventNames: [String] = []

            // Append all events here
            
            return allEventNames
        }()
}
