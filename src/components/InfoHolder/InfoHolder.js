import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Input,
  Button,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import StarsRating from "stars-rating";
import { ALL_STATES } from "../../handlers/gql/queries/getAllStates";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  STATE_ADD,
  CITY_ADD,
  HOTEL_ADD,
} from "../../handlers/gql/mutations/index";
import { CITIES_BY_STATE } from "../../handlers/gql/queries/citiesByState";
import { HOTELS_BY_CITY } from "../../handlers/gql/queries/hotelsByCity";
import { STAY_ADD } from "../../handlers/gql/mutations/addStay";
import {
  stateFindOrCreate,
  cityFindOrCreate,
  hotelFindOrCreate,
} from "../../handlers/findOrCreate/index";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
export const headerStyle = { fontWeight: "bold", fontSize: "1em" };

export default function InfoHolder({
  setSelectedPlace,
  clearSearch,
  listRefetch,
  hotelsByStateRefetch,
  location,
  setLocation,
  info,
  setInfo,
  mapState,
  setNotVisible,
}) {
  const { data: stateData, refetch: statesRefetch } = useQuery(ALL_STATES);
  const [getHotelsByCity, { refetch: hotelsRefetch }] =
    useLazyQuery(HOTELS_BY_CITY);
  const [getCitiesByState, { refetch: citiesRefetch }] =
    useLazyQuery(CITIES_BY_STATE);
  const [addState] = useMutation(STATE_ADD);
  const [addCity] = useMutation(CITY_ADD);
  const [addHotel] = useMutation(HOTEL_ADD);
  const [addStay] = useMutation(STAY_ADD);

  const changeHandler = (key, value) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };
  const refetchAll = async () => {
    await statesRefetch();
    await citiesRefetch().catch((err) => console.log(err));
    await hotelsRefetch();
    await listRefetch();
    await hotelsByStateRefetch().catch((err) => console.log(err));
  };
  const cancelHandler = async () => {
    setSelectedPlace();
    setLocation();
    clearSearch();
    setInfo({
      hotel: "",
      city: "",
      state: "",
      date: undefined,
      notes: "",
    });
  };

  const submitHandler = async () => {
    if (mapState && info.state !== mapState) {
      setNotVisible(true);
      setTimeout(() => {
        setNotVisible(false);
      }, 3000);
    }
    const stateId = await stateFindOrCreate(stateData, addState, info);
    const cityId = await cityFindOrCreate(
      getCitiesByState,
      addCity,
      info,
      stateId
    );
    await hotelFindOrCreate(
      getHotelsByCity,
      addHotel,
      addStay,
      info,
      cityId,
      location
    );
    await refetchAll();

    cancelHandler();
    setInfo({
      hotel: "",
      city: "",
      state: "",
      date: undefined,
      notes: "",
    });
  };

  return window.innerWidth > 600 ? (
    <div className="newHotelContainer">
      <TableContainer component={Paper} style={{ padding: "0.5vw" }}>
        <Typography variant="h5">Add New Stay</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerStyle} width={120} padding="normal">
                Hotel
              </TableCell>
              <TableCell style={headerStyle} width={130}>
                City
              </TableCell>
              <TableCell style={headerStyle} width={80}>
                State
              </TableCell>
              <TableCell style={headerStyle} width={60}>
                Price
              </TableCell>
              <TableCell style={headerStyle} width={100}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  value={info.hotel}
                  onChange={(e) => changeHandler("hotel", e.target.value)}
                  sx={{ width: 200 }}
                ></Input>
              </TableCell>
              <TableCell>
                <Input
                  value={info.city}
                  onChange={(e) => changeHandler("city", e.target.value)}
                  sx={{ width: 120 }}
                ></Input>
              </TableCell>
              <TableCell>
                <Input
                  sx={{ width: 100, padding: 0 }}
                  value={info.state}
                  onChange={(e) => changeHandler("state", e.target.value)}
                ></Input>
              </TableCell>
              <TableCell>
                <StarsRating
                  count={5}
                  value={info.price}
                  onChange={(e) => changeHandler("price", e)}
                  char="£"
                  size={20}
                />
              </TableCell>
              <TableCell>
                <StarsRating
                  count={5}
                  value={info.rating}
                  onChange={(e) => changeHandler("rating", e)}
                  size={20}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="tableFooter">
          <p style={{ verticalAlign: "bottom", paddingLeft: "0.5vw" }}>
            Notes:
          </p>
          <Input
            value={info.notes}
            style={{
              width: "65%",
              marginLeft: "0.5vw",
            }}
            fullWidth={true}
            onChange={(e) => changeHandler("notes", e.target.value)}
          />
          <CalendarContainer>
            <DatePicker
              onChange={(e) => changeHandler("date", e.toLocaleDateString())}
              value={info.date}
              customInput={
                <div style={{ marginLeft: "50%" }}>
                  <p>Date:</p>
                  {info.date ? (
                    <p className="dateDisplay">{info.date}</p>
                  ) : (
                    <AiOutlineCalendar size={30} />
                  )}
                </div>
              }
            />
          </CalendarContainer>
        </div>
        <div className="submitButton">
          <Button
            variant="contained"
            style={{ margin: "0.5%" }}
            onClick={submitHandler}
          >
            Add Hotel
          </Button>
          <Button variant="outlined" onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </TableContainer>
    </div>
  ) : (
    <div className="mobileNewContainer">
      <Typography variant="h5">Add New Stay</Typography>
      <Input
        value={info.hotel}
        onChange={(e) => changeHandler("hotel", e.target.value)}
        sx={{ width: "70vw" }}
        placeholder="Hotel"
      ></Input>
      <Input
        value={info.city}
        onChange={(e) => changeHandler("city", e.target.value)}
        sx={{ width: "70vw" }}
        placeholder="City"
      ></Input>
      <Input
        sx={{ width: "70vw" }}
        value={info.state}
        onChange={(e) => changeHandler("state", e.target.value)}
        placeholder="State"
      ></Input>
      <div className="starsRatingMobile">
        <p>Price:</p>
        <StarsRating
          count={5}
          value={info.price}
          onChange={(e) => changeHandler("price", e)}
          char="£"
          size={20}
        />
      </div>
      <div className="starsRatingMobile">
        <p>Rating:</p>
        <StarsRating
          count={5}
          value={info.rating}
          onChange={(e) => changeHandler("rating", e)}
          size={20}
        />
      </div>
      <Input
        value={info.notes}
        style={{
          width: "70vw",
        }}
        placeholder="Notes"
        fullWidth={true}
        onChange={(e) => changeHandler("notes", e.target.value)}
      />
      <CalendarContainer>
        <DatePicker
          onChange={(e) => changeHandler("date", e.toLocaleDateString())}
          value={info.date}
          customInput={
            <div>
              <p>Date:</p>
              {info.date ? (
                <p className="dateDisplay">{info.date}</p>
              ) : (
                <AiOutlineCalendar size={30} />
              )}
            </div>
          }
        />
      </CalendarContainer>
      <div className="submitButton">
        <Button
          variant="contained"
          style={{ margin: "0.5%" }}
          onClick={submitHandler}
        >
          Add Hotel
        </Button>
        <Button variant="outlined" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
