import { ImageManipulator } from 'expo';

export default async function resizeImage(imageUri, imageWidth) {
  var imageResult = null;
  await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: imageWidth } }], { base64: true })
    .then(resizedImage => {
      console.log("RESIZED::::" + resizedImage.base64.length);
      imageResult = resizedImage;
    })
    .catch(err => {
      console.log(err + ":::: Something went wrong in resizeImage");
    });
  return imageResult;
}