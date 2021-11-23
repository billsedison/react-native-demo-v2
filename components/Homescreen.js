/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Button, View, NativeEventEmitter, ScrollView} from 'react-native';
import Cidscan from 'react-native-cidscan';

const captureIDHandlerEmitter = new NativeEventEmitter(Cidscan);

const mKey =
  'HetpZ4Bk0ivwF6dhHIHmbQH5ALUMOb/cQB5+I3fdD2LV5Yrm1sxkbrVL1X8vL4S55O7hmCQhGPCemfH/mUTz5yy3ip3TQDJU2pCeU3Zjbb3kyVdPYGdn59dPGFdv+aXdrIIRQHizRtbsC8NamuxWaRAGTfTGCM/IhEKvxkQO0ONSneBYSrY8OHpcEK7EVKCDSl3JQNJwHVWbpJDcIoR/WRVMSlJ/e9/qFOM3mPhwVJ1FCDF+e94mKpHQzOlRffJ/Zm2Mv1+UKJwriC/VpWK7+N1KJ9EZChf8U0MSdrMxSTGCxVZzZbTbt+pflWv2jUD9yFxHGbuyHVvpqnk0PUpFxF5VLIZy9kIesTg3ZSiho6kGTOY1bdGfqW3NppYmh1H0eCxQquhn5RitL74LwuLmKw==';
const mCust = 'P4I082220190001';

var pp;

async function init() {
  await Cidscan.initCaptureID(callback);
  this.subscription = captureIDHandlerEmitter.addListener(
    'decoderEvent',
    data => {
      console.log(JSON.stringify(data));
      pp.props.navigation.navigate('Home');
    },
  );
}

async function activate() {
  await Cidscan.activateEDKLicense(mKey, mCust, license);
}

function callback(error, result) {
  if (error) {
    // Funktion eurer Wahl
  } else {
    activate();
  }
}

function license(error, result) {
  if (error) {
    // Funktion eurer Wahl
  } else {
    // Funktion eurer Wahl
  }
}

async function startscanner(viewid) {
  Cidscan.enableAllBarcodes(true);
  await Cidscan.startCameraPreview(camera);
  Cidscan.startDecoder();
}

function camera(error, result) {
  if (error) {
    // do something in case of an error
  } else {
    Cidscan.closeCamera();
    // Handle success
  }
}

export default class Homescreen extends Component {
  render() {
    pp = this;
    return (
      <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(100, 100, 100, 0)',
          }}>
          <Button
            title="Initialize"
            onPress={() => {
              init();
            }}
          />
          <Button
            title="StartScan"
            onPress={() => {
              startscanner();
            }}
          />
          <Button
            title="Scanner Page"
            onPress={() => this.props.navigation.navigate('Scanner')}
          />
        </View>
      </ScrollView>
    );
  }
}
