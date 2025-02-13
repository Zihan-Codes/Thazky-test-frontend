import React, { useEffect, useState } from "react";
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
        } catch (error) {
            setMessage("Error canceling appointment");
        }
    };

    return (
        <div>
            <h2>My Appointments</h2>
            {message && <p>{message}</p>}
            <div>
                {appointments.length > 0 ? (
                    <div>
                        {appointments.map((appointment) => (
                            <div key={appointment.id}>
                                <p>
                                    {appointment.date} - {appointment.timeSlot}
                                </p>
                                <button onClick={() => handleCancel(appointment.id)}>
                                    Cancel Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No appointments booked</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
