export default async function findHandler(placeId) {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/get-location/${placeId}`,
    {
      method: "GET",
    }
  )
    .then((data) => data.json())
    .catch((err) => console.log(err));
}
