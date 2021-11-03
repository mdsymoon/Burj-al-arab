import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import Grid from "@material-ui/core/Grid";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { bedType } = useParams();

  const handleBooking = () => {
    const newBooking = { ...loggedInUser, checkInDate, checkOutDate };
    fetch("http://localhost:5000/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        Hello, {loggedInUser.name}! Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="dd/MM/yyyy"
            value={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={handleBooking} variant="contained" color="primary">
          Book Now
        </Button>
      </MuiPickersUtilsProvider>
      <Bookings></Bookings>
    </div>
  );
};

export default Book;
