export default function postImage(imageString) {
  let result = fetch("https://canieatthis.appspot.com/resources/images/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "New image",
      user: "Jenny",
      image: imageString
    })
  }).then(response => {
    let body = JSON.parse(response["_bodyInit"]);
    console.log("BODY IN CONTROLLER::::" + body["image"]["id"] + ":::END BODY");
    return body;
  });

  return result;
}
