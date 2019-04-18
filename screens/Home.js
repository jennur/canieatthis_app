import React from 'react';
import {Text, View, Button} from 'react-native';
import { navigate } from 'react-navigation';
import { base } from '../styles/base';
import { Font, AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import CameraView from './Camera';

function cacheFonts(fonts){
  return fonts.map(font => Font.loadAsync(font));
}

type Props = {};
export default class Home extends React.Component<Props> {
  state = {
    isReady: false,
    fontLoaded: false,
  };

  async _loadAssetAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all(...fontAssets);
  }
  
  render() {
    if( this.state.fontLoaded && this.state.isReady ){
      return (
        <View style={base.container}>
          <Text style={base.welcome}>CanIEatThis?</Text>
          <Button title="Check ingredient list" color="#7d9c51" onPress={() => navigate(CameraView)}></Button>
        </View>
      );
    }
    else{
      return (
        <AppLoading
          startAsync={this._loadAssetAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />);
    }
  }
  async componentDidMount() {
    await Font.loadAsync({'PacificoRegular': require('../assets/fonts/Pacifico-Regular.ttf')});
    this.setState({ fontLoaded: true })
  }
}