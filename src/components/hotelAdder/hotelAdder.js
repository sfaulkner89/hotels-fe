import React, { useState } from "react";
import { Input, Button } from "@mui/material";
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
  mapState,
}) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState();
  const [notVisible, setNotVisible] = useState(false);

  const clearSearch = () => {
    setQuery("");
    setPlaces([]);
  };

  // const StyledButton = withStyles({
  //   root: {
  //     color: "#fff",
  //     "&:hover": {
  //       fontWeight: "bold",
  //     },
  //   },
  // })(Button);

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
      <div className="inputContainer">
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
        {notVisible ? (
          <div className="warningHolder">
            <p style={{ color: "white" }}>
              Your entry is not visible below because your map selection does
              not cover it, please click on the map again to see all entries.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {places.map((place) => {
          return (
            <div>
              <Button
                onClick={() => selectionHandler(place)}
                style={{ color: "white" }}
              >
                {place.description}
              </Button>
            </div>
          );
        })}
      </div>
      {selectedPlace ? (
        <InfoHolder
          place={selectedPlace}
          location={location}
          setLocation={setLocation}
          setSelectedPlace={setSelectedPlace}
          clearSearch={clearSearch}
          listRefetch={listRefetch}
          hotelsByStateRefetch={hotelsByStateRefetch}
          info={info}
          setInfo={setInfo}
          mapState={mapState}
          setNotVisible={setNotVisible}
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
