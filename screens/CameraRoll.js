import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Results from '../components/ResultsComponent';
import { Permissions, ImagePicker } from "expo";
import postImage from "../scripts/postImage";
import resizeImage from "../scripts/resizeImage";
import detectAllergens from "../scripts/detectAllergens";
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
      let resizedImage = await resizeImage(pickedImage.uri, 600);

      console.log("IMAGE URI AFTER CAPTURE:::: " + resizedImage.uri);
      this.setState({
        image: resizedImage,
        imageUri: resizedImage.uri
      });
      let data = await postImage(resizedImage.base64);
      this.setState({ ingredients: data["image"]["text"] });
      let allergens = await detectAllergens(data["image"]["id"]);
      console.log("DATA RECEIVED::::" + data["image"]["text"] + ":::END DATA");
    }
  }
  render() {
    var { image } = this.state;
    var imageUri = this.state.imageUri;

    const { hasCameraRollPermission } = this.state;

    if (hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraRollPermission === false) {
      return <Text>No access to camera roll</Text>;
    } else {
      let { ingredients } = this.state;
      return (
        <View style={base.container}>
          <ScrollView>
            {image && (
              <View>
                <Image source={{ uri: imageUri }} />
              </View>
            )}
            <Results style={} ingredients={ ingredients } />
          </ScrollView>
        </View>
      );
    }
  }
}
