import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import React from "react";
import HotelRow from "../HotelRow.js/HotelRow";
import { headerStyle } from "../InfoHolder/InfoHolder";

export default function Hotels({ hotels, sendTrip, refetches }) {
  const winWidth = window.innerWidth > 1000;
  return (
    <div className="hotelsContainer">
      <div>
        <TableContainer component={Card} color="primary" sx={{ width: "95vw" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Hotel</TableCell>
                <TableCell style={headerStyle}>City</TableCell>
                <TableCell style={headerStyle}>State</TableCell>
                {winWidth ? (
                  <React.Fragment>
                    <TableCell style={headerStyle}>Latest Rating</TableCell>
                    <TableCell style={headerStyle}>Price</TableCell>
                  </React.Fragment>
                ) : (
                  <></>
                )}
                <TableCell style={headerStyle}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel, i) => {
                return (
                  <HotelRow
                    key={i}
                    hotel={hotel}
                    sendTrip={sendTrip}
                    refetches={refetches}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
