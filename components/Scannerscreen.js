/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Cidscan from 'react-native-cidscan';
import RNCIDScanView from 'react-native-cidscan/src/cidscanview';

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

export default class Scannerscreen extends Component {
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
