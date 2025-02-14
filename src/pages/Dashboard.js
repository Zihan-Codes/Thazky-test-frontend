import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Link to="/book">Book Appointment</Link>
            <Link to="/appointments">My Appointments</Link>
            <br />
            {/* Admin link to add slots */}
            <Link to="/add-slot">Add New Slot</Link>
        </div>
    );
};

export default Dashboard;
