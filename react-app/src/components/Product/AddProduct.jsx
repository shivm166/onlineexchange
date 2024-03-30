
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Header/Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "../CategoriesList";
import API_URL from "../../constants";
import "./AddProduct.css";
function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    const handleApi = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Form is valid, proceed with API call
            navigator.geolocation.getCurrentPosition((position) => {
                const formData = new FormData();
                formData.append('plat', position.coords.latitude)
                formData.append('plong', position.coords.longitude)
                formData.append('pname', pname)
                formData.append('pdesc', pdesc)
                formData.append('price', price)
                formData.append('category', category)
                formData.append('pimage', pimage)
                formData.append('pimage2', pimage2)
                formData.append('userId', localStorage.getItem('userId'))

                const url = API_URL + '/add-product';
                axios.post(url, formData)
                    .then((res) => {
                        if (res.data.message) {
                            alert(res.data.message);
                            navigate('/')
                        }
                    })
                    .catch((err) => {
                        alert('server err')
                    })
            })
        } else {
            // Display validation errors using Toastify
            Object.values(errors).forEach(error => toast.error(error));
        }
    }

    const validateForm = () => {
        let errors = {};

        if (!pname.trim()) {
            errors.pname = "Product name is required";
        }

        if (!pdesc.trim()) {
            errors.pdesc = "Product description is required";
        }

        if (!price.trim()) {
            errors.price = "Product price is required";
        } else if (isNaN(price) || +price <= 0) {
            errors.price = "Enter a valid positive number for price";
        }

        if (!category.trim()) {
            errors.category = "Product category is required";
        }

        if (!pimage) {
            errors.pimage = "Product image is required";
        }

        return errors;
    };

    return (
        
        <div className="new-container">
            <Header />
            <div className="p-3">
                <h2> ADD PRODUCT HERE : </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Price</label>
                <input className="form-control" type="text" value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Bikes </option>
                    {
                        categories && categories.length > 0 &&
                        categories.map((item, index) => {
                            return (
                                <option key={'option' + index}> {item} </option>
                            )
                        })
                    }
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file"
                    files={pimage}
                    onChange={(e) => {
                        setpimage(e.target.files[0])
                    }} />
                <label> Product Second Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0])
                    }} />
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
                <ToastContainer />
            </div>
            {/*<Footer/>*/}
        </div>
    );
}

export default AddProduct;
