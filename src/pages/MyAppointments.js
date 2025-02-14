import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardActions, Button, Alert, Grid } from "@mui/material";
import API from "../services/api";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await API.get("/appointments", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setAppointments(data);
            } catch (error) {
                setMessage("Failed to fetch appointments");
            }
        };

        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        try {
            await API.delete(`/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
            setMessage("Appointment canceled successfully!");
        } catch (error) {
            setMessage("Error canceling appointment");
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Appointments
            </Typography>

            {/* Displaying success/error messages */}
            {message && (
                <Alert severity={message.includes("Error") ? "error" : "success"} sx={{ marginBottom: 2 }}>
                    {message}
                </Alert>
            )}

            {/* Displaying appointments */}
            {appointments.length > 0 ? (
                <Grid container spacing={3}>
                    {appointments.map((appointment) => (
                        <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                            <Card sx={{ padding: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" color="primary">
                                        {appointment.date} - {appointment.timeSlot}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleCancel(appointment.id)}
                                        sx={{ width: "100%" }}
                                    >
                                        Cancel Appointment
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                    No appointments booked.
                </Typography>
            )}
        </Container>
    );
};

export default MyAppointments;
