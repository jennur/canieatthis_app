import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Results from "../components/ResultsComponent";
import { Permissions, ImagePicker } from "expo";

import postImage from "../scripts/postImage";
import resizeImage from "../scripts/resizeImage";
import detectAllergens from "../scripts/detectAllergens";
import renderTextBoxes from "../scripts/renderTextBoxes";

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
    ingredients: "",
    allergens: null,
    imageWithBoxes: null,
    viewImage: false
  };

  async componentDidMount() {
    /* Check and ask for permissions to access cameraroll */
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      this.setState({ hasCameraRollPermission: status === "granted" });
    } else {
      this.setState({ hasCameraPermission: status === false });
    }
    /* End check and ask for permissions to access cameraroll */

    /* Pick image from cameraroll */
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1.0
    });

    if (!pickedImage.cancelled) {
      let resizedImage = await resizeImage(pickedImage.uri, 600);

      this.setState({
        image: resizedImage,
        imageUri: resizedImage.uri
      });
      /* End pick image from cameraroll */

      /* Post image and receive allergy data */
      let data = await postImage(resizedImage.base64);
      /* End post image and receive allergy data */

      /* Add colored boxes to posted image */
      let imageWithBoxes = renderTextBoxes(
        resizedImage,
        data["image"]["text_full"]
      );
      this.setState({ imageWithBoxes: imageWithBoxes });
      /* End add colored boxes to posted image */

      /* Get list of allergens detected */
      let allergens = await detectAllergens(data["image"]["id"]);
      this.setState({
        ingredients: data["image"]["text"],
        allergens: allergens
      });
      /* End get list of allergens detected */
    }
  }

  render() {
    var { image } = this.state;
    //var imageUri = this.state.imageUri;
    var { imageWithBoxes } = this.state;

    var { hasCameraRollPermission } = this.state;

    if (hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraRollPermission === false) {
      return <Text>No access to camera roll</Text>;
    } else {
      let { ingredients } = this.state;
      let { allergens } = this.state;

      return (
        <View style={base.container}>
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {image && (
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
            )}
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
