import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button, Card, CardContent, CardActions } from "@mui/material";  // Import Material UI components

const Dashboard = () => {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
                Welcome to the Dashboard
            </Typography>

            {/* Main Dashboard Cards */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Book Appointment</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Schedule your appointments here.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/book"
                                variant="contained"
                                color="primary"
                                sx={{ width: "100%" }}
                            >
                                Book Now
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">My Appointments</Typography>
                            <Typography variant="body2" color="textSecondary">
                                View your upcoming and past appointments.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/appointments"
                                variant="contained"
                                color="secondary"
                                sx={{ width: "100%" }}
                            >
                                View Appointments
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Admin Section - Add Slot */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3, textAlign: "center", padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Add New Slot</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Admins can add new available slots here.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to="/add-slot"
                                variant="contained"
                                color="success"
                                sx={{ width: "100%" }}
                            >
                                Add Slot
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
