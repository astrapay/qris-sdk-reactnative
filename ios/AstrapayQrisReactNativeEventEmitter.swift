//
//  AstrapayQrisReactNativeEventEmitter.swift
//  astrapay-qris-react-native
//
//  Created by Ahmad Nabil on 08/10/24.
//

import Foundation

class AstrapayQrisReactNativeEventEmitter: RCTEventEmitter {
    override init() {
            super.init()
            EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
        }
    /// Base overide for RCTEventEmitter.
        ///
        /// - Returns: all supported events
        @objc open override func supportedEvents() -> [String] {
            return EventEmitter.sharedInstance.allEvents
        }
}
