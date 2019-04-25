export default function detectAllergens(imageId) {
  let allergens = fetch(
    "https://canieatthis.appspot.com/resources/images/" +
      (imageId - 1) +
      "/allergens"
  ).then(response => {
    let responseObject = JSON.stringify(response);
    console.log(responseObject);
    return responseObject;
  });
}
