import React from "react";
import { View, Dimensions, Image } from "react-native";
import { base } from "../styles/base";
const { width: newImageWidth } = Dimensions.get("window");

export default function renderTextBoxes(image, textContent) {
  let textContentArray = Object.entries(textContent);
  /*var resizePercentages = Image.getSize(
    image.uri,
    (width, height) => {
      let aspectRatio = height / width;
      let newImageHeight = aspectRatio * newImageWidth;
      return newImageWidth/newImageHeight;
    },
    error => {
      console.log(error);
      return [1,1];
    }
  );*/
  // console.log("RESIZE PERCENTAGES:::: " + resizePercentages);
  let squares = [];
  let key = 0;
  for (let i = 0; i < textContentArray.length; i++) {
    let vertices = textContentArray[i][1]["vertices"];

    let topPos = vertices[0][1];
    let leftPos = vertices[0][0];
    let width = vertices[2][0] - leftPos;
    let height = vertices[3][1] - topPos;
    //Aviv's code
    let num = newImageWidth / 600;
    width *= num;
    height *= num;
    topPos = topPos * num + 65;
    leftPos *= num;

    //Aviv's code

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
    <View>
      <Image resizeMode="contain" style={base.image} source={image} />
      {squares}
    </View>
  );
  return renderedImage;
}
