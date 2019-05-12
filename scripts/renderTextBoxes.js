import React from "react";
import { View, ImageBackground } from "react-native";
import { base } from "../styles/base";

export default function renderTextBoxes(
  image,
  imageWidth,
  imageHeight,
  textContent
) {
  let textContentArray = Object.entries(textContent);

  let squares = [];
  let key = 0;
  for (let i = 0; i < textContentArray.length; i++) {
    let vertices = textContentArray[i][1]["vertices"];
    let allergen = textContentArray[i][1]["allergens"][0];
    let topPos = vertices[0][1];
    let leftPos = vertices[0][0];
    let width = vertices[2][0] - leftPos;
    let height = vertices[3][1] - topPos;
    let color = null;
    switch (allergen) {
      case "Eggs":
        color = "#FFF2C1";
        break;
      case "Fish":
        color = "#C7E7ED";
        break;
      case "Gluten":
        color = "#FF7A00";
        break;
      case "Milk":
        color = "#F2FDF9";
        break;
      case "Mustard":
        color = "#FFCF48";
        break;
      case "Nuts":
        color = "#AF5100";
        break;
      case "Peanuts":
        color = "#B3845B";
        break;
      case "Sesame":
        color = "#FDDDAD";
        break;
      case "Soy":
        color = "#EDDC98";
        break;
      case "Sulphites":
        color = "#F3AABA";
        break;
      default:
        color = "#888";
    }

    let square = (
      <View
        key={key}
        style={{
          position: "absolute",
          top: topPos,
          left: leftPos,
          width: width,
          height: height,
          backgroundColor: color,
          opacity: 0.5
        }}
      />
    );
    squares.push(square);
    key += 1;
  }

  const renderedImage = (
    <View style={base.imageContainer}>
      <ImageBackground
        resizeMode="cover"
        style={[base.image, { width: imageWidth, height: imageHeight }]}
        source={image}
      >
        {squares}
      </ImageBackground>
    </View>
  );
  return renderedImage;
}
