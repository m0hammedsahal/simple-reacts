import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [booking_date, setBookingDate] = useState('');
  const [booking_time, setBookingTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/booking/bookingset/', {
        name,
        email,
        phone_number,
        booking_date,
        booking_time,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Phone Number:
        <input type="text" value={phone_number} onChange={(event) => setPhoneNumber(event.target.value)} />
      </label>
      <label>
        Booking Date:
        <input type="date" value={booking_date} onChange={(event) => setBookingDate(event.target.value)} />
      </label>
      <label>
        Booking Time:
        <input type="time" value={booking_time} onChange={(event) => setBookingTime(event.target.value)} />
      </label>
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;
