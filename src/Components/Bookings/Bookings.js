import React, { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./../../App";
import { useContext } from "react";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + loggedInUser.email)
    
      .then((res) => res.json())
      .then((data) => setBooking(data));
    },[])
 
  return (
    <div>
      <h3>room bookings: {booking.length}</h3>
      {booking.map((book) => (
        <li>
          name:{book.name} from: {(new Date(book.checkInDate).toDateString('dd/MM/yyyy'))} To: {(new Date(book.checkOutDate).toDateString('dd/MM/yyyy'))}
        </li>
      ))}
    </div>
  );
};


export default Bookings;
