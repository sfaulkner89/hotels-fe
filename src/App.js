import "./App.css";
import Map from "./components/map/map";
import Hotels from "./components/hotels/hotels";
import { useState, useEffect } from "react";
import HotelAdder from "./components/hotelAdder/hotelAdder";
import { useLazyQuery, useQuery } from "@apollo/client";
import { HOTELS_QUERY } from "./handlers/gql/queries/allHotels";
import { HOTELS_BY_STATE } from "./handlers/gql/queries/hotelsByState";

function App() {
  const [bounds, setBounds] = useState();
  const { data, loading, error, refetch: listRefetch } = useQuery(HOTELS_QUERY);
  const [getHotelsByState, { refetch: hotelsByStateRefetch }] =
    useLazyQuery(HOTELS_BY_STATE);
  const [hotels, setHotels] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();
  const [fullscreen, setFullscreen] = useState(false);
  const [USState, setUSState] = useState();
  const [info, setInfo] = useState({
    hotel: "",
    city: "",
    state: "",
    date: undefined,
    notes: "",
  });

  const refetches = { hotelsByStateRefetch, listRefetch, USState };

  useEffect(() => {
    console.log("poop");
    if (USState) {
      const getStateHotels = async (state) => {
        const hoteldata = await getHotelsByState({ variables: { state } });
        if (hoteldata.data && hoteldata.data.stateByName) {
          var stateHotels = [];
          for (let city of hoteldata.data.stateByName.cities) {
            stateHotels = [...stateHotels, ...city.hotels];
          }
          setHotels(stateHotels);
        } else {
          setHotels([]);
        }
      };
      getStateHotels(USState);
    } else {
      if (data) {
        setHotels(data.hotels);
      }
    }
  }, [loading, data, USState, selectedPlace]);

  if (error) {
    console.log(error);
  }

  const newTripHandler = (tripData) => {
    setInfo({
      hotel: tripData.hotel,
      city: tripData.city,
      state: tripData.state,
      date: tripData.date,
      notes: tripData.notes,
    });
    setSelectedPlace({});
  };

  return (
    <div className="App">
      <div className="topRow">
        <Map
          setBounds={setBounds}
          hotels={data?.hotels}
          sendTrip={newTripHandler}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          USState={USState}
          setUSState={setUSState}
        />
        {fullscreen ? (
          ""
        ) : (
          <HotelAdder
            info={info}
            setInfo={setInfo}
            bounds={bounds}
            listRefetch={listRefetch}
            hotelsByStateRefetch={hotelsByStateRefetch}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        )}
      </div>
      <Hotels
        bounds={bounds}
        hotels={hotels}
        style={{ zIndex: 10 }}
        sendTrip={newTripHandler}
        refetches={refetches}
      />
    </div>
  );
}

export default App;
