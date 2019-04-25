import postImage from "./postImage";
import resizeImage from "./resizeImage";

export default async function captureImageHandle(cameraview) {
  if (cameraview) {
    var result = await cameraview
      .takePictureAsync({
        quality: 1,
        base64: true
      })
      .then(
        picture => {
          //let imageUri = picture["uri"];
          //this.setState({ imageUri: picture["uri"] });
          console.log("CAMERA IMAGE URI:::: " + picture["uri"]);
          //let imageUri = picture["uri"];
          let resizedImage = resizeImage(picture["uri"], 600);

          /*
          this.setState({
            imageBase64: resizedImage.base64,
            beforeCapture: false
          });
          */
          return resizedImage;
        },
        error =>
          console.log(error + " ::::Something went wrong in captureImageHandle")
      )
      .then(picture => {
        let data = postImage(picture.base64);
        return data;
      })
      .then(data => {
        //this.setState({ ingredients: data["image"]["text"] });
        console.log(
          "DATA FROM CAMERA::::" + data["image"]["text"] + ":::END DATA"
        );
        return data["image"]["text"];
      });

    return result;
  } else {
    console.log("Camera view undefined");
    return null;
  }
}
