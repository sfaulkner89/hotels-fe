import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { statesData } from "../../assets/us-states";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import StarsRating from "stars-rating";
import { Button } from "@mui/material";

let stateName;

export default function Map({
  setBounds,
  hotels,
  sendTrip,
  fullscreen,
  setFullscreen,
  setUSState,
}) {
  const map = useRef();
  const defCenter = [37, -96];
  const defZoom = 4;
  const [hovered, setHovered] = useState();
  const [center, setCenter] = useState(defCenter);
  const [zoom, setZoom] = useState(defZoom);
  const [hotelList, setHotelList] = useState([]);

  const hotelIcon = new Icon({
    iconUrl: icon,
    iconSize: [20, 30],
  });

  useEffect(() => {
    if (hotels) {
      setHotelList(hotels);
    }
  }, [hotels]);

  function style() {
    return {
      fillColor: "darkgreen",
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      width: "100%",
    };
  }

  const clickHandler = (feature, e) => {
    if (feature.properties.name) {
      if (feature.properties.name === stateName) {
        setUSState();
        map.current.panTo(defCenter);
        map.current.setZoom(defZoom);
        //map.current.popup().setContent();
      } else {
        setUSState(feature.properties.name);
        const stateBounds = e.target.getBounds();
        setBounds(stateBounds);
        map.current.fitBounds(stateBounds);
        stateName = feature.properties.name;
      }
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => setHovered(feature.properties.name),
      mouseout: () => setHovered(),
      click: (e) => clickHandler(feature, e),
    });
  };

  const fullscreenHandler = () => {
    setFullscreen(!fullscreen);
    map.current.panTo(defCenter);
    map.current.setZoom(defZoom);
  };
  return (
    <div className={fullscreen ? "mapHolderFullscreen" : "mapHolder"}>
      <MapContainer
        ref={map}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", minHeight: "450px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={statesData}
          style={style}
          onEachFeature={onEachFeature}
        />
        {hotelList.map((hotel, i) => {
          const avRating =
            hotel.stays.map((stay) => stay.rating).reduce((a, b) => a + b, 0) /
            hotel.stays.length;
          const avPrice =
            hotel.stays.map((stay) => stay.price).reduce((a, b) => a + b, 0) /
            hotel.stays.length;
          return (
            <Marker key={i} position={[hotel.lat, hotel.lng]} icon={hotelIcon}>
              <Popup>
                <p>
                  {hotel.name}
                  <Button
                    style={{
                      height: "0.5vh",
                      width: "0.5vw",
                      fontSize: "0.6em",
                    }}
                    onClick={() =>
                      sendTrip({
                        notes: "",
                        hotel: hotel.name,
                        city: hotel.city.name,
                        state: hotel.city.state.name,
                        price:
                          hotel.stays.length > 0
                            ? hotel.stays?.[hotel.stays.length - 1].price
                            : 0,
                        rating:
                          hotel.stays.length > 0
                            ? hotel.stays?.[hotel.stays.length - 1].rating
                            : 0,
                        date: new Date().toLocaleDateString(),
                      })
                    }
                  >
                    + Stay
                  </Button>
                </p>
                <p>Stays: {hotel.stays.length}</p>
                <p>
                  Average Rating:{" "}
                  <StarsRating
                    edit={false}
                    value={avRating}
                    count={5}
                  ></StarsRating>
                </p>
                <p>
                  Average Price:{" "}
                  <StarsRating
                    edit={false}
                    value={avPrice}
                    count={5}
                    char="£"
                  ></StarsRating>
                </p>
              </Popup>
            </Marker>
          );
        })}
        {/* <Control position="top-right">
          <button
            className="fullscreenButton"
            onClick={() => fullscreenHandler()}
          >
            <BsFullscreen style={{ fontSize: "1.2em", fontWeight: "bold" }} />
          </button>
        </Control> */}
      </MapContainer>
      <div className="stateHolder">
        <h3 style={{ color: "white" }}>{hovered}</h3>
      </div>
    </div>
  );
}
