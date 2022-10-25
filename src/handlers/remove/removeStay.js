export const deleteHandler = async (
  stayId,
  hotelId,
  removeStay,
  refetches,
  setCheck
) => {
  setCheck(false);
  await removeStay({ variables: { stayId, hotelId } });
  await refetches.hotelsByStateRefetch().catch((err) => console.log(err));
  await refetches.listRefetch();
};
