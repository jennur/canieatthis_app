export default function postImage(imageString) {
  fetch("https://canieatthis.appspot.com/resources/images/add", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "title": "New image",
      "user": "Jenny",
      "image": imageString
    })
  }).then(response => {
    let body = JSON.parse(response["_bodyInit"]);
    this.setState({ ingredients: body["image"]["text"] })
    console.log("BODY::::" + body["image"]["text"] + ":::END BODY");
  });
}