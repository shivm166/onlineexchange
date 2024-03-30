import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoHome } from "react-icons/io5";
import axios from 'axios';
import User from "./User";
import DeleteProduct from "./DeleteProduct";


function AHeader(props) {
    const [userDetails, setUserDetails] = useState({});
    const [productCount, setProductCount] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <div className="header">
            <Link className='links' to="/admin/"> <IoHome /> HOME </Link>
            <Link className='links' to="/User">User Details</Link>

            <Link className='links' to="/DeleteProduct">Products</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AHeader;
