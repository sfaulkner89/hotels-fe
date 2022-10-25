export default async function cityFindOrCreate(
  getCitiesByState,
  addCity,
  info,
  stateId
) {
  const citiesArray = await getCitiesByState({
    variables: { stateId: stateId },
  });
  console.log(stateId, citiesArray);
  const citiesFiltered =
    citiesArray.data.state?.cities.map((city) => city.name) ?? [];
  if (!citiesFiltered.includes(info.city)) {
    const mutationData = await addCity({
      variables: { name: info.city, stateId },
    });
    return mutationData.data.addCity.id;
  }
  return citiesArray.data.state?.cities.filter(
    (city) => city.name === info.city
  )[0].id;
}
