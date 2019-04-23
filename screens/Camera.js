import React from "react";
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";

import { Camera, Permissions, takeSnapshotAsync } from "expo";
import { base } from "../styles/base";
import resizeImage from '../scripts/resizeImage';

export default class CameraView extends React.Component {
  static navigationOptions = {
    title: "CanIEatThis"
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageBase64: "",
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
      await this.cameraview.takePictureAsync({
        quality: 1,
        base64: true
      })
        .then(
          picture => {
            this.setState({ imageUri: picture["uri"] });
            console.log("CAMERA IMAGE URI:::: " + picture["uri"]);
            let imageUri = picture["uri"];
            let resizedImage = resizeImage(imageUri, 600);
            this.setState({ imageBase64: resizedImage.base64, beforeCapture: false });
            return resizedImage;
          },
          error => console.log(error + " ::::Something went wrong in captureImage")
        )
        .then(picture => {
          console.log("CAMERA IMAGE URI:::: " + picture.base64.length);
          this.postImage(picture.base64);
        });
    } else {
      console.log("Camera view undefined");
    }
  }
  postImage(imageString) {
    fetch("https://canieatthis.appspot.com/resources/images/add", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": "New image",
        "user": "Jenny",
        "image": imageString
      })
    }).then(response => {
      let body = JSON.parse(response["_bodyInit"]);
      this.setState({ ingredients: body["image"]["text"] })
      console.log("BODY::::" + body["image"]["text"] + ":::END BODY");
    });
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
        <View style={base.container} >
          {beforeCapture ?
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
                  onPress={() => { this.captureImage() }}
                >
                  <Text style={base.buttonText}>Detect ingredients</Text>
                </TouchableOpacity>
              </View>
            </Camera> :
            <ScrollView>
              <Text style={base.text}>
                {ingredients}
              </Text>
            </ScrollView>

          }
        </View>
      );
    }
  }

}
