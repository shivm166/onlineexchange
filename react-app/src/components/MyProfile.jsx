import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import axios from "axios";
import API_URL from "../constants";

function MyProfile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
        let url = API_URL + '/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <div>
        <center>
            <Header />
            <div className="m-3 p-3">
                <h3 className="text-center mt-2 text-2xl font-bold">USER PROFILE</h3>
                <table className="table-auto border border-collapse border-gray-800 mx-auto mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-800 px-4 py-2">USERNAME</th>
                            <th className="border border-gray-800 px-4 py-2">EMAIL ID</th>
                            <th className="border border-gray-800 px-4 py-2">MOBILE</th>
                            <th className="border border-gray-800 px-4 py-2">LOGOUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="border border-gray-800 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-800 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-800 px-4 py-2">{user.mobile}</td>
                            <td className="border border-gray-800 px-4 py-2">
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </center>
        </div>
    );
}

export default MyProfile;
