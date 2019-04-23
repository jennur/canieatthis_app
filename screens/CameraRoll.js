import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Permissions, FileSystem, ImagePicker } from "expo";
import postImage from '../scripts/postImage';
import resizeImage from '../scripts/resizeImage';

import { base } from "../styles/base";

export default class CameraRollView extends React.Component {
  static navigationOptions = {
    title: "CanIEatThis"
  };
  state = {
    hasCameraRollPermission: null,
    image: null,
    imageBase64: "",
    imageUri: "",
    imageResized: null,
    imageResizedBase64: "",
    imageResizedUri: "",
    ingredients: ""
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      this.setState({ hasCameraRollPermission: status === "granted" });
    } else {
      this.setState({ hasCameraPermission: status === false });
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1.0
    });

    if (!pickedImage.cancelled) {
      /* this.setState({
         image: pickedImage,
         imageBase64: pickedImage.base64,
         imageUri: pickedImage.uri
       });*/
      let resizedImage = await resizeImage(pickedImage.uri, 600);

      console.log("IMAGE:::: " + resizedImage.base64.length);
      this.setState({
        imageResized: resizedImage,
        imageResizedBase64: resizedImage.base64,
        imageResizedUri: resizedImage.uri
      });
      this.postImage(resizedImage.base64);
    }
  }
  render() {
    let { image } = this.state;
    let { imageUri } = this.state;

    const { hasCameraRollPermission } = this.state;

    if (hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraRollPermission === false) {
      return <Text>No access to camera roll</Text>;
    } else {
      let { ingredients } = this.state;
      return (
        <View style={base.container}>
          {image && (
            <View>
              <Image source={{ uri: imageUri }} />
            </View>
          )}
          <ScrollView>
            <Text style={base.text}>{ingredients}</Text>
          </ScrollView>
        </View>
      );
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
}
