export default async function stateFindOrCreate(stateData, addState, info) {
  let stateId;
  const stateArray = stateData.states.map((state) => state.name);
  if (!stateArray.includes(info.state)) {
    stateId = await (
      await addState({ variables: { name: info.state } })
    ).data.addState.id;
  } else {
    stateId = stateData.states.filter((a) => a.name === info.state)[0].id;
  }
  return stateId;
}
