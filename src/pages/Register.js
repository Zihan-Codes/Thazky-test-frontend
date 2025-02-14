import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";  // Material-UI components
import API from "../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            alert("Registration successful. Please log in.");
            navigate("/");  // Navigate to login page after successful registration
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Register
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    margin="normal"
                />
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
