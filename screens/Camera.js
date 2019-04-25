import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

import { Camera, Permissions } from "expo";
import { base } from "../styles/base";
import resizeImage from "../scripts/resizeImage";
import postImage from "../scripts/postImage";

export default class CameraView extends React.Component {
  static navigationOptions = {
    title: "CanIEatThis"
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    beforeCapture: true,
    ingredients: ""
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ hasCameraPermission: status === "granted" });
    } else {
      this.setState({ hasCameraPermission: status === false });
    }
  }
  async captureImage() {
    if (this.cameraview) {
      await this.cameraview
        .takePictureAsync({
          quality: 1,
          base64: true
        })
        .then(
          picture => {
            let resizedImage = resizeImage(picture["uri"], 600);
            this.setState({
              beforeCapture: false
            });
            return resizedImage;
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 1"
            )
        )
        .then(
          picture => {
            let data = postImage(picture.base64);
            return data;
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 2"
            )
        )
        .then(
          data => {
            this.setState({ ingredients: data["image"]["text"] });
            console.log(
              "DATA FROM CAMERA::::" + data["image"]["text"] + ":::END DATA"
            );
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 3"
            )
        );
    } else {
      console.log("Camera view undefined");
    }
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      let { beforeCapture } = this.state;
      let { ingredients } = this.state;
      return (
        <View style={base.container}>
          {beforeCapture ? (
            <Camera
              type={this.state.type}
              ref={ref => {
                this.cameraview = ref;
              }}
              style={{
                flex: 1,
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  style={base.captureButton}
                  onPress={() => {
                    this.captureImage();
                  }}
                >
                  <Text style={base.buttonText}>Detect ingredients</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <ScrollView>
              <Text style={base.text}>{ingredients}</Text>
            </ScrollView>
          )}
        </View>
      );
    }
  }
}
