import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

import { Camera, Permissions } from "expo";
import Results from "../components/ResultsComponent";
import { base } from "../styles/base";
import resizeImage from "../scripts/resizeImage";
import postImage from "../scripts/postImage";
import renderTextBoxes from "../scripts/renderTextBoxes";
import detectAllergens from "../scripts/detectAllergens";

export default class CameraView extends React.Component {
  static navigationOptions = {
    title: "CanIEatThis"
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    beforeCapture: true,
    image: null,
    ingredients: "",
    allergens: null,
    imageWithBoxes: null,
    viewImage: false
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
          image => {
            let data = postImage(image.base64);
            this.setState({
              image: image
            });
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
            /* Add colored boxes to posted image */
            let imageWithBoxes = renderTextBoxes(
              this.state.image,
              data["image"]["text_full"]
            );
            this.setState({ imageWithBoxes: imageWithBoxes });
            /* End add colored boxes to posted image */
            return data["image"]["id"];
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 3"
            )
        )
        .then(
          imageID => {
            let allergens = detectAllergens(imageID);
            return allergens;
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 4"
            )
        )
        .then(
          allergens => {
            console.log("DETECTED ALLERGENS::::" + allergens + "::::END D.A.");
            this.setState({ allergens: allergens });
          },
          error =>
            console.log(
              error + " ::::Something went wrong in captureImage stage 5"
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
      let { allergens } = this.state;
      let { imageWithBoxes } = this.state;
      return beforeCapture ? (
        <View style={base.homeContainer}>
          <Camera
            type={this.state.type}
            ref={ref => {
              this.cameraview = ref;
            }}
            style={base.camera}
          >
            <View style={base.cameraView}>
              <TouchableOpacity
                style={base.buttonBottomScreen}
                onPress={() => {
                  this.captureImage();
                }}
              >
                <Text style={base.buttonText}>Detect ingredients</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <View style={base.container}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            <View>
              <Results
                navigation={this.props.navigation}
                ingredients={ingredients}
                allergens={allergens}
              />
              <TouchableOpacity
                style={base.button}
                onPress={() =>
                  this.setState({ viewImage: !this.state.viewImage })
                }
              >
                <Text style={base.buttonText}>See detected text</Text>
              </TouchableOpacity>
              {this.state.viewImage ? imageWithBoxes : null}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={base.buttonBottomScreen}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={base.buttonText}>Scan again</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
