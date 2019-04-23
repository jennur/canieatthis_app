import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { base } from "../styles/base";
import { Font, AppLoading } from "expo";
import { FontAwesome } from "@expo/vector-icons";

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class Home extends React.Component {
  state = {
    isReady: false
    //fontLoaded: false
  };

  /*  async _loadAssetAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all(...fontAssets);
  }
*/
  async _loadAssetAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all(...fontAssets);
  }
  render() {
    if (/*this.state.fontLoaded &&*/ this.state.isReady) {
      return (
        <View style={base.container}>
          <Text style={base.welcome}>CanIEatThis?</Text>
          <TouchableOpacity
            style={base.button}
            onPress={() => this.props.navigation.navigate("Camera")}
          >
            <Text style={base.buttonText}>Scan ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CameraRoll")}
          >
            <Text style={base.link}>Pick image from camera roll</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <AppLoading
          startAsync={this._loadAssetAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
  }
  async componentDidMount() {
    /* await Font.loadAsync({
      PacificoRegular: require("../assets/fonts/Pacifico-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
    */
  }
}
