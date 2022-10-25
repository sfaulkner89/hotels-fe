export default async function hotelFindOrCreate(
  getHotelsByCity,
  addHotel,
  addStay,
  info,
  cityId,
  location
) {
  const hotels = await getHotelsByCity({ variables: { cityId } }).catch((err) =>
    console.log(err)
  );
  console.log(cityId);
  const hotelsArray = hotels.data.city?.hotels.map((hotel) => hotel.name) || [];
  if (!hotelsArray.includes(info.hotel)) {
    console.log("addhotel");
    const mutationData = await addHotel({
      variables: {
        name: info.hotel,
        cityId,
        rating: info.rating,
        price: info.price,
        lat: location?.result.geometry.location.lat,
        lng: location?.result.geometry.location.lng,
        firstStay: info.date,
        lastStay: info.date,
        notes: info.notes,
      },
    }).catch((err) => console.error(err));
    return mutationData.data.addHotel.id;
  }
  const hotelId = hotels.data.city?.hotels.filter(
    (hotel) => info.hotel === hotel.name
  )[0].id;
  console.log("addstay");
  await addStay({
    variables: {
      hotelId,
      date: info.date,
      notes: info.notes,
      rating: info.rating,
      price: info.price,
    },
  });
  return hotelId;
}
