package com.eagleconnect;

import com.facebook.react.ReactActivity;
import android.content.Intent;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "EagleConnect";
    }
    
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
}
}