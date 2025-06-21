package com.mynewapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView
import com.facebook.react.ReactRootView
import org.devio.rn.splashscreen.SplashScreen // ✅ Import SplashScreen

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this) // ✅ Show the splash screen
    super.onCreate(null)    // ✅ Required for react-native-screens
  }

  override fun getMainComponentName(): String = "MyNewApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      override fun createRootView(): ReactRootView {
        return RNGestureHandlerEnabledRootView(this@MainActivity)
      }
    }
  }
}
