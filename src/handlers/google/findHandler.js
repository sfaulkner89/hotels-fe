export default async function findHandler(placeId) {
  return await fetch(`http://localhost:2000/get-location/${placeId}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
}
