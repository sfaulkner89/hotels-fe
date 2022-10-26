import React, { useState } from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import StarsRating from "stars-rating";
import { TiDelete } from "react-icons/ti";
import { useMutation } from "@apollo/client";
import { STAY_REMOVE } from "../../handlers/gql/mutations";
import { deleteHandler } from "../../handlers/remove/removeStay";

export default function HotelPopOut({ stay, hotelId, refetches, setExpand }) {
  const [check, setCheck] = useState(false);
  const [removeStay] = useMutation(STAY_REMOVE);
  return (
    <TableRow>
      <TableCell>{stay.date}</TableCell>
      <TableCell>
        {stay?.rating > 0 ? (
          <StarsRating value={stay.rating} count={5} edit={false} />
        ) : (
          "Not Rated"
        )}
      </TableCell>
      <TableCell>
        {stay?.price > 0 ? (
          <StarsRating value={stay?.price} count={5} char="£" edit={false} />
        ) : (
          "No Price Given"
        )}
      </TableCell>
      <TableCell style={{ maxWidth: "40vw", overflow: "scroll" }}>
        <Typography variant="body3" style={{ maxWidth: "100%" }}>
          {stay.notes}
        </Typography>
      </TableCell>
      <TableCell style={{ maxWidth: "10vw", maxHeight: "5vh" }}>
        {check ? (
          <div
            style={{
              display: "flex",
              border: "1px solid red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Are you sure?</p>
            <button
              className="emptyButton"
              style={{ textDecoration: "underline" }}
              onClick={() =>
                deleteHandler(
                  stay.id,
                  hotelId,
                  removeStay,
                  refetches,
                  setCheck,
                  setExpand
                )
              }
            >
              Yes
            </button>
            <button
              className="emptyButton"
              style={{ textDecoration: "underline" }}
              onClick={() => setCheck(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <button className="emptyButton" onClick={() => setCheck(true)}>
              <TiDelete size={20} />
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
