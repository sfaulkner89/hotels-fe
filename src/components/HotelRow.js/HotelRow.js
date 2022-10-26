import React, { useState } from "react";
import StarsRating from "stars-rating";
import {
  TableRow,
  TableCell,
  Table,
  Box,
  Collapse,
  Typography,
  TableBody,
  TableHead,
  Button,
} from "@mui/material";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import HotelPopOut from "../HotelPopOut.js/HotelPopOut";

export default function HotelRow({ hotel, sendTrip, refetches }) {
  const [expand, setExpand] = useState(false);
  const lastStay = hotel.stays.length - 1;
  const winWidth = window.innerWidth > 1000;

  const addHandler = () => {
    sendTrip({
      notes: "",
      hotel: hotel.name,
      city: hotel.city.name,
      state: hotel.city.state.name,
      price: hotel.stays.length > 0 ? hotel.stays?.[lastStay].price : 0,
      rating: hotel.stays.length > 0 ? hotel.stays?.[lastStay].rating : 0,
      date: new Date().toLocaleDateString(),
    });
  };
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{hotel.name}</TableCell>
        <TableCell>{hotel.city.name}</TableCell>
        <TableCell>{hotel.city.state.name}</TableCell>
        {winWidth ? (
          <React.Fragment>
            <TableCell>
              {hotel.stays.length > 0 && hotel.stays[lastStay]?.rating > 0 ? (
                <StarsRating value={hotel.stays[lastStay]?.rating} count={5} />
              ) : (
                "Not Rated"
              )}
            </TableCell>
            <TableCell>
              {hotel.stays.length > 0 && hotel.stays[lastStay]?.price > 0 ? (
                <StarsRating
                  value={hotel.stays[lastStay]?.price}
                  count={5}
                  char="£"
                />
              ) : (
                "No Price Given"
              )}
            </TableCell>
          </React.Fragment>
        ) : (
          <></>
        )}
        <TableCell>
          <button
            className="dropDownButton"
            onClick={() => setExpand((expand) => !expand)}
          >
            {expand ? <SlArrowUp /> : <SlArrowDown />}
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={expand} unmountOnExit>
            <Box sx={{ margin: winWidth ? 3 : 0 }}>
              <Typography variant="h6" gutterBottom component="div">
                {hotel.name}
                <Button style={{ marginLeft: "1%" }} onClick={addHandler}>
                  + Stay
                </Button>
              </Typography>
              <Typography variant="body1">
                Last Visited: {hotel.lastStay ?? " Not Added"}
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Price</TableCell>
                    {winWidth ? <TableCell>Notes</TableCell> : <></>}
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotel.stays.map((stay, i) => {
                    return (
                      <HotelPopOut
                        setExpand={setExpand}
                        key={i}
                        stay={stay}
                        hotelId={hotel.id}
                        refetches={refetches}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
