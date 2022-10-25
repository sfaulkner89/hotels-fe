import React, { useState } from "react";
import { Input, Button, withStyles } from "@mui/material";
import InfoHolder from "../InfoHolder/InfoHolder";
import findHandler from "../../handlers/google/findHandler";
import changeHandler from "../../handlers/google/changeHandler";
import { stateHash } from "../../assets/states_hash";

export default function HotelAdder({
  bounds,
  listRefetch,
  hotelsByStateRefetch,
  selectedPlace,
  setSelectedPlace,
  info,
  setInfo,
}) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState();

  const clearSearch = () => {
    setQuery("");
    setPlaces([]);
  };

  const StyledButton = withStyles({
    root: {
      color: "#fff",
      "&:hover": {
        fontWeight: "bold",
      },
    },
  })(Button);

  const selectionHandler = async (place) => {
    setSelectedPlace(place);
    setPlaces([]);
    setInfo({
      hotel: place.terms[0].value,
      city: place.terms[2].value,
      state: stateHash[place.terms[3].value],
      date: undefined,
      notes: "",
    });
    setLocation(await findHandler(place.place_id));
  };

  const searchHandler = async () => {
    setPlaces(await changeHandler(query, bounds));
    setSelectedPlace();
  };

  return (
    <div className="hotelAdder">
      <div className="inputHolder">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginBottom: "3.2%", fontSize: "2em" }}
        />
        <Button
          variant="outlined"
          onClick={searchHandler}
          style={{ maxHeight: "50%" }}
        >
          Search
        </Button>
      </div>
      <div>
        {places.map((place) => {
          return (
            <div>
              <StyledButton
                onClick={() => selectionHandler(place)}
                style={{ color: "white" }}
              >
                {place.description}
              </StyledButton>
            </div>
          );
        })}
      </div>
      {selectedPlace ? (
        <InfoHolder
          place={selectedPlace}
          location={location}
          setSelectedPlace={setSelectedPlace}
          clearSearch={clearSearch}
          listRefetch={listRefetch}
          hotelsByStateRefetch={hotelsByStateRefetch}
          info={info}
          setInfo={setInfo}
        />
      ) : (
        <Button
          className="addManButton"
          style={{ color: "white", border: "1px solid white" }}
          onClick={() => setSelectedPlace({})}
        >
          Add Manually...
        </Button>
      )}
    </div>
  );
}
