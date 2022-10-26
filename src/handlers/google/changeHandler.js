export default async function changeHandler(query, bounds) {
  const lat = (bounds?._southWest.lat + bounds?._northEast.lat) / 2;
  const lng = (bounds?._southWest.lng + bounds?._northEast.lng) / 2;
  const url = `${process.env.REACT_APP_API_URL}/get-places/${query}/${lat}/${lng}`;
  const places = await fetch(url).then((data) => data.json());
  return places.predictions;
}
