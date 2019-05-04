import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { base } from "../styles/base";

class Results extends React.Component {
  render() {
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
  }
}

export default Results;
