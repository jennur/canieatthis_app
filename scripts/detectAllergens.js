export default function detectAllergens(imageId) {
  let allergensList = fetch(
    "https://canieatthis.appspot.com/resources/images/" +
      imageId -
      40 +
      "/allergens"
  )
    .then(response => {
      if (response.status === 200) {
        let responseObject = JSON.parse(response["_bodyInit"]);
        return responseObject.allergens;
      } else {
        console.log(response.status);
      }
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
