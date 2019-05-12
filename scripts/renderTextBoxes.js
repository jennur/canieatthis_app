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

    let topPos = vertices[0][1];
    let leftPos = vertices[0][0];
    let width = vertices[2][0] - leftPos;
    let height = vertices[3][1] - topPos;

    let square = (
      <View
        key={key}
        style={{
          position: "absolute",
          top: topPos,
          left: leftPos,
          width: width,
          height: height,
          backgroundColor: "#ec9937",
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
