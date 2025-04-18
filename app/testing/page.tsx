'use client'
import { useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io("http://localhost:3001", {
            withCredentials: true, // Include credentials (if needed)
        });

        // Handle connection
        socket.on("connect", () => {
            console.log("Connected to the server");

            // Send a message to the server
            socket.emit("message", "Hello from the client!");
        });

        // Handle server response
        socket.on("response", (data) => {
            console.log("Received response from server:", data);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return <div>Socket.IO Client</div>;
}