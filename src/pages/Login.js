import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";  // Import Material-UI components
import API from "../services/api";
import { loginSuccess } from "../redux/slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", { email, password });
            dispatch(loginSuccess({ user: data.user, token: data.token }));
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
        }
    };

    const handleRegisterRedirect = () => {
        navigate("/register"); // Redirect to register page
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Login
                </Button>
                <Button fullWidth variant="outlined" color="secondary" onClick={handleRegisterRedirect} sx={{ mt: 2 }}>
                    Don't have an account? Register
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
