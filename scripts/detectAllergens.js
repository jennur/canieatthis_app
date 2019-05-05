export default function detectAllergens(imageId) {
  let allergensList = fetch(
    "https://canieatthis.appspot.com/resources/images/" + imageId + "/allergens"
  )
    .then(response => {
      let responseObject = JSON.parse(response["_bodyInit"]);
      return responseObject.allergens;
    })
    .then(allergensObject => {
      let allergensArray = Object.entries(allergensObject);
      let allergensList = [];

      for (let i = 0; i < allergensArray.length; i++) {
        if (allergensArray[i][1] === true) {
          allergensList.push(allergensArray[i]);
        }
      }

      return allergensList;
    });

  return allergensList;
}
