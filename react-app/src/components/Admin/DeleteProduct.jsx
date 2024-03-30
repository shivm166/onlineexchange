import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../constants";

function DeleteProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const fetchProducts = () => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Error. Failed to fetch products.');
            });
    };

    const handleDelete = (productId) => {
        const url = API_URL + '/delete-product';
        axios.post(url, { productId })
            .then((res) => {
                if (res.data.message === 'Product deleted successfully') {
                    // Refresh the product list after deletion
                    setRefresh(!refresh);
                    alert('Product deleted successfully.');
                } else {
                    alert('Failed to delete product.');
                }
            })
            .catch((err) => {
                alert('Server Error. Failed to delete product.');
            });
    };

    return (
        <div>
            <div className="d-flex justify-content-center flex-wrap">
                {products.map((item) => (
                    <div key={item._id} className="card m-3">
                        <img width="300px" height="200px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">{item.price}</h3>
                        <button onClick={() => handleDelete(item._id)}>Delete Product as Admin</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeleteProduct;
