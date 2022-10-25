import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from "@mui/material";
import HotelRow from "../HotelRow.js/HotelRow";
import { headerStyle } from "../InfoHolder/InfoHolder";

export default function Hotels({ hotels, sendTrip, refetches }) {
  return (
    <div className="hotelsContainer">
      <div>
        <TableContainer component={Card} color="primary" sx={{ width: "95vw" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Hotel</TableCell>
                <TableCell style={headerStyle}>Latest Rating</TableCell>
                <TableCell style={headerStyle}>Price</TableCell>
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
