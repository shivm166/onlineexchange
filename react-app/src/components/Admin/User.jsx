import React, { useState, useEffect } from "react";
import AHeader from "./AHeader";
import axios from "axios";
import API_URL from "../../constants";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error
        }
    };

    return (
        <>
            <AHeader />
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="p-3 text-left bg-gray-100 border-b border-gray-200">Name</th>
                            <th className="p-3 text-left bg-gray-100 border-b border-gray-200">Email</th>
                            <th className="p-3 text-left bg-gray-100 border-b border-gray-200">Mobile</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b border-gray-200">{user.username}</td>
                                <td className="p-3 border-b border-gray-200">{user.email}</td>
                                <td className="p-3 border-b border-gray-200">{user.mobile}</td>
                                {/* Render additional fields as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default User;
