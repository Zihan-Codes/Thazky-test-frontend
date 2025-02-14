import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Grid, Box, Alert } from "@mui/material";
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
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Book Appointment
            </Typography>

            {/* Displaying messages */}
            {message && (
                <Alert severity={message.includes("Error") ? "error" : "success"} sx={{ marginBottom: 2 }}>
                    {message}
                </Alert>
            )}

            {/* Available Slots Section */}
            <Typography variant="h6" gutterBottom>
                Available Slots
            </Typography>
            {slots.length > 0 ? (
                <Grid container spacing={2}>
                    {slots.map((slot) => (
                        <Grid item xs={12} sm={6} key={slot.id}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setSelectedSlot(slot)}
                                sx={{
                                    backgroundColor: selectedSlot?.id === slot.id ? "green" : "lightgray",
                                    color: selectedSlot?.id === slot.id ? "white" : "black",
                                    "&:hover": {
                                        backgroundColor: selectedSlot?.id === slot.id ? "darkgreen" : "gray",
                                    },
                                }}
                            >
                                {slot.date} - {slot.timeSlot}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                    No available slots
                </Typography>
            )}

            {/* Booking Button */}
            <Box sx={{ marginTop: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleBooking}
                    disabled={!selectedSlot}
                >
                    Book Appointment
                </Button>
            </Box>
        </Container>
    );
};

export default BookAppointment;
