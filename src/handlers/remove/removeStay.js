export const deleteHandler = async (
  stayId,
  hotelId,
  removeStay,
  refetches,
  setCheck
) => {
  setCheck(false);
  const stayData = await removeStay({ variables: { stayId, hotelId } });
  console.log(stayData);
  await refetches.hotelsByStateRefetch().catch((err) => console.log(err));
  await refetches.listRefetch();
};
