import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, Alert } from "@mui/material";
import API from "../services/api";

const AddSlot = () => {
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState(""); // New state for time range
    const [message, setMessage] = useState("");

    const handleAddSlot = async (e) => {
        e.preventDefault();
        
        // Validate that the timeSlot contains a valid format (e.g., "6:00 AM - 7:00 AM")
        const timeSlotRegex = /^(\d{1,2}:\d{2} (AM|PM)) - (\d{1,2}:\d{2} (AM|PM))$/;
        
        if (!timeSlotRegex.test(timeSlot)) {
            setMessage("Please enter a valid time range in the format 'HH:MM AM/PM - HH:MM AM/PM'");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/slots",
                { date, timeSlot }, // Passing timeSlot as a single string
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage("Slot added successfully!");
            setDate("");
            setTimeSlot("");
        } catch (error) {
            setMessage("Error adding slot");
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add New Slot
            </Typography>

            {/* Displaying messages */}
            {message && (
                <Alert severity={message.includes("Error") ? "error" : "success"} sx={{ marginBottom: 2 }}>
                    {message}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleAddSlot}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    maxWidth: 400,
                    margin: "0 auto",
                }}
            >
                {/* Date Picker */}
                <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* Time Range Input */}
                <TextField
                    label="Time Range"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    helperText="e.g. 6:00 AM - 7:00 AM"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* Add Slot Button */}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2 }}
                    disabled={!date || !timeSlot} // Disable button if fields are empty
                >
                    Add Slot
                </Button>
            </Box>
        </Container>
    );
};

export default AddSlot;
