import React, { useState, useEffect } from "react";
import API from "../services/api";

const BookAppointment = () => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const { data } = await API.get("/slots");
                setSlots(data);
            } catch (error) {
                setMessage("Failed to fetch available slots");
            }
        };

        fetchSlots();
    }, []);

    const handleBooking = async () => {
        try {
            if (!selectedSlot) {
                setMessage("Please select a slot to book.");
                return;
            }

            await API.post(
                "/appointments",
                { date: selectedSlot.date, timeSlot: selectedSlot.timeSlot },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setMessage("Appointment booked successfully!");
        } catch (error) {
            setMessage("Error booking appointment");
        }
    };

    return (
        <div>
            <h2>Book Appointment</h2>
            <div>
                {message && <p>{message}</p>}
                <div>
                    <h3>Available Slots</h3>
                    {slots.length > 0 ? (
                        <div>
                            {slots.map((slot) => (
                                <div key={slot.id}>
                                    <button
                                        onClick={() => setSelectedSlot(slot)}
                                        style={{
                                            backgroundColor:
                                                selectedSlot?.id === slot.id ? "green" : "lightgray",
                                        }}
                                    >
                                        {slot.date} - {slot.timeSlot}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No available slots</p>
                    )}
                </div>
                <button onClick={handleBooking}>Book Appointment</button>
            </div>
        </div>
    );
};

export default BookAppointment;
