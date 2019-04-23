import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { base } from "../styles/base";
import { Font, AppLoading } from "expo";
import { FontAwesome } from "@expo/vector-icons";

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class Results extends React.Component {
  state = {
    isReady: false,
    fontLoaded: false
  };

  async _loadAssetAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all(...fontAssets);
  }

  render() {
    if (this.state.fontLoaded && this.state.isReady) {
      return (
        <View style={base.container}>
          <Text style={base.headline}>Detected ingredients</Text>
          <TouchableOpacity
            style={base.button}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={base.buttonText}>Scan again</Text>
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
    await Font.loadAsync({
      PacificoRegular: require("../assets/fonts/Pacifico-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }
}
