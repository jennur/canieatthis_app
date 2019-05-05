import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { base } from "../styles/base";

const eggsIcon = require("../assets/allergy-icons/eggs.png");
const fishIcon = require("../assets/allergy-icons/fish.png");
const glutenIcon = require("../assets/allergy-icons/wheat.png");
const milkIcon = require("../assets/allergy-icons/milk.png");
const mustardIcon = require("../assets/allergy-icons/mustard.png");
const nutIcon = require("../assets/allergy-icons/treenut.png");
const peanutIcon = require("../assets/allergy-icons/peanut.png");
const sesameIcon = require("../assets/allergy-icons/sesame.png");
const soyIcon = require("../assets/allergy-icons/soya.png");
const sulphitesIcon = require("../assets/allergy-icons/sulphurdioxide.png");

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.props.ingredients = "";
    this.props.allergens = [];
    this.renderAllergens = this.renderAllergens.bind(this);

    this.state = {
      allergens: null
    };
  }
  renderAllergens() {
    let detectedAllergens = this.props.allergens;
    let allergens = [];
    let key = 0;

    for (let i = 0; i < detectedAllergens.length; i++) {
      key += 1;
      switch (detectedAllergens[i][0]) {
        case "Eggs":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={eggsIcon} />{" "}
              <Text style={base.text}>Eggs</Text>
            </Text>
          );
          break;
        case "Fish":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={fishIcon} />{" "}
              <Text style={base.text}>Fish</Text>
            </Text>
          );
          break;
        case "Gluten":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={glutenIcon} />{" "}
              <Text style={base.text}>Gluten</Text>
            </Text>
          );
          break;
        case "Milk":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={milkIcon} />{" "}
              <Text style={base.text}>Milk</Text>
            </Text>
          );
          break;
        case "Mustard":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={mustardIcon} />{" "}
              <Text style={base.text}>Mustard</Text>
            </Text>
          );
          break;

        case "Nuts":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={nutIcon} />{" "}
              <Text style={base.text}>Nuts</Text>
            </Text>
          );
          break;

        case "Peanuts":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={peanutIcon} />
              <Text style={base.text}>Peanuts</Text>
            </Text>
          );
          break;

        case "Sesame":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={sesameIcon} />{" "}
              <Text style={base.text}>Sesame</Text>
            </Text>
          );
          break;

        case "Soy":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={soyIcon} />{" "}
              <Text style={base.text}>Soy</Text>
            </Text>
          );
          break;

        case "Sulphites":
          allergens.push(
            <Text style={base.allergenText} key={key}>
              <Image style={base.allergyIcon} source={sulphitesIcon} />{" "}
              <Text style={base.text}>Sulphites</Text>
            </Text>
          );
          break;
      }
    }
    allergens = allergens.length ? allergens : "No allergens detected";
    return allergens;
  }

  render() {
    return (
      <View style={base.maxWidthContainer}>
        <Text style={base.headline}>
          {this.props.allergens
            ? "Detected allergens"
            : "Looking for allergens..."}
        </Text>
        {this.props.allergens ? this.renderAllergens() : null}
      </View>
    );
  }
}

export default Results;
