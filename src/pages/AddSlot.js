import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import API from "../services/api";

const AddSlot = () => {
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [message, setMessage] = useState("");

    const handleAddSlot = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/slots",
                { date, timeSlot },
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
        <Container>
            <Typography variant="h5" gutterBottom>
                Add New Slot
            </Typography>
            {message && <Typography color="error">{message}</Typography>}
            <form onSubmit={handleAddSlot}>
                <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Time Slot"
                    type="text"
                    variant="outlined"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Add Slot
                </Button>
            </form>
        </Container>
    );
};

export default AddSlot;
