import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/Home";
import CameraView from "./screens/Camera";
import CameraRollView from "./screens/CameraRoll";
import { Font, AppLoading } from "expo";
import { FontAwesome } from "@expo/vector-icons";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Camera: { screen: CameraView },
    CameraRoll: { screen: CameraRollView }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#001E32",
        elevation: 0,
        shadowColor: "transparent"
      },
      headerTitleStyle: {
        color: "#ec9937",
        fontFamily: "PacificoRegular"
      }
    }
  }
);
const AppContainer = createAppContainer(MainNavigator);

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

class App extends React.Component {
  state = {
    isReady: false,
    fontLoaded: false
  };
  async _loadAssetAsync() {
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all(...fontAssets);
  }
  render() {
    if (this.state.isReady && this.state.fontLoaded) {
      return <AppContainer />;
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
      PacificoRegular: require("./assets/fonts/Pacifico-Regular.ttf"),
      QuicksandRegular: require("./assets/fonts/Quicksand-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }
}

export default App;
