import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "../Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../../constants";  
import './AddProduct.css'


function LikedProducts() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [likedproducts, setlikedproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const url = API_URL + '/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])






    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.')
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    // alert('Liked.')
                    setrefresh(!refresh)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.')
            return;
        }

        const url = API_URL + '/dislike-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    // alert('DisLiked.')
                    setrefresh(!refresh)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }



    const handleProduct = (id) => {
        navigate('/product/' + id)
    }


    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            <h5> SEARCH RESULTS </h5>
            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                      <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div className="icon-con">
                                    {
                                        likedproducts.find((likedItem) => likedItem._id == item._id) ?
                                            <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                            <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />

                                    }
                                </div>
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage} />
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                
                            </div>
                        )

                    })}
            </div>

            <h5> ALL RESULTS  </h5>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div className="icon-con">
                                    {
                                        likedproducts.find((likedItem) => likedItem._id == item._id) ?
                                            <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                            <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />

                                    }
                                </div>
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage} />
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                
                            </div>
                        )

                    })}
            </div>



        </div>
    )
}

export default LikedProducts;