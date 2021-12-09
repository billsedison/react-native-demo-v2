/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Button, View, NativeEventEmitter} from 'react-native';
import {Icon} from 'react-native-elements';
import Cidscan from 'react-native-cidscan';
import RNCIDScanView from 'react-native-cidscan/src/cidscanview';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

var isTorch = false;

function startDecode() {
  Cidscan.startDecoder();
}

function enableTorch() {
  if (!isTorch) {
    Cidscan.setTorch(true);
    isTorch = true;
  } else {
    Cidscan.setTorch(false);
    isTorch = false;
  }
}

const captureIDHandlerEmitter = new NativeEventEmitter(Cidscan);

const mKey =
  'c2lze2n2bGWrIBWtmOn4WxcyQsdRG1quc3dPCl2wyrs0+u+TM5g7xsRwe1f3wRiHh4zRctFxa2etQO27DDIBbfjQIPb11NwyKeam0AY7eBDxYP1OwMdYsqSeI+nfXAPDtVmmH8RGMdTHmKpObLjx06laDUiwUrboU9cfXn+yL5jeXYq/swNpNfUBYzIznSH5et3QKQGLP7Pg/OebMjL6kOsYPj81y9XWPlKbDWbUqAW2yuz5pQqJJsCtqe68/IUOFTKbOLaJsBliB0eRYBUfghe+N9Tj/Bc3LIulv/qxev05hbyumFOEnTlAaVlVCFBnyWch0SgwxvZ6IHy+T5IbKgw4k/zTz81ufqbn2I0bNusFW8wH0ZcpUOS2u0/9+ingSkqnoHWLU+LlWF44wYNIaA==';
const mCust = 'P4I082220190001';

var pp;

async function init() {
  const statuses = await requestMultiple([
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  const granted =
    statuses[PERMISSIONS.IOS.CAMERA] === 'granted' ||
    statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted';
  if (!granted) {
    console.log('You need to grant the camera permission first!');
    return;
  }
  await Cidscan.initCaptureID(callback);
  this.subscription = captureIDHandlerEmitter.addListener(
    'decoderEvent',
    data => {
      console.log(JSON.stringify(data));
      Cidscan.startDecoder();
      // pp.props.navigation.navigate('Home');
    },
  );
}

async function activate() {
  await Cidscan.activateEDKLicense(mKey, mCust, license);
  Cidscan.startDecoder();
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

export default class Scannerscreen extends Component {
  async componentDidMount() {
    await init();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(100, 100, 100, 0)',
        }}>
        <RNCIDScanView style={{height: '100%', width: '100%'}} />
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            flexDirection: 'row',
            height: 60,
            alignItems: 'center',
            padding: 10,
          }}>
          <View>
            <Button
              onPress={() => {
                startDecode();
              }}
              title="Decode"
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 100,
            right: 20,
            flexDirection: 'row',
            height: 30,
            alignItems: 'center',
            padding: 10,
          }}>
          <View>
            <Icon
              reverse
              name="flashlight-outline"
              type="ionicon"
              color="#517fa4"
              onPress={() => {
                enableTorch();
              }}
              title="Decode"
            />
          </View>
        </View>
      </View>
    );
  }
}
