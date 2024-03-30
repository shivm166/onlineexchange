

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "../Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../../constants";
import './AddProduct.css';

function MyProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch(() => {
                alert('Server Err.')
            })
    }, [refresh])

    const handleSearch = (value) => {
        setSearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setCProducts(filteredProducts);
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category === value) {
                return item;
            }
        })
        setCProducts(filteredProducts);
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.')
                }
            })
            .catch(() => {
                alert('Server Err.')
            })
    }

    const handleDelete = (pid) => {
        if (!localStorage.getItem('userId')) {
            alert('Please Login First')
            return;
        }
        const url = API_URL + '/delete-product';
        const data = {
            pid,
            userId: localStorage.getItem('userId')
        }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Delete Success.')
                    setRefresh(!refresh)
                }
            })
            .catch(() => {
                alert('Server Err.')
            })
    }

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <h5>ALL RESULTS</h5>

            <div className="container">
                <div className="col">
                    {products && products.length > 0 &&
                        products.map((item, index) => (
                            <div key={item._id} className="col-md-4">
                                <div className="card mb-3">
                                    
                                    <img src={API_URL + '/' + item.pimage} alt={item.pname} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{item.pname} | {item.category}</p>
                                        <h3 className="text-danger">RS/- {item.price}</h3>
                                        <p className="text-success">
                                            <Link to={`/edit-product/${item._id}`} className="btn btn-success">Edit Product</Link>
                                        </p>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>



            <h5>FOUND  RESULTS</h5>


            <div className="container">
                <div className="col">
                    {cProducts && cProducts.length > 0 &&
                        cProducts.map((item, index) => (
                            <div key={item._id} className="col-md-4">
                                <div className="card mb-3">
                                   
                                    <img src={API_URL + '/' + item.pimage} alt={item.pname} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{item.pname} | {item.category}</p>
                                        <h3 className="text-danger">RS/- {item.price}</h3>
                                          <p className="text-success">
                                            <Link to={`/edit-product/${item._id}`} className="btn btn-success">Edit Product</Link>
                                        </p>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete Product</button>
                                    
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}

export default MyProducts;
