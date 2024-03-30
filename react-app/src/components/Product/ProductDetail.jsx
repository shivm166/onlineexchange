// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../Header/Header";
// import API_URL from "../../constants";
// import io from 'socket.io-client';
// import "./ProductDetail.css"; // Import your CSS file

// let socket;

// function ProductDetail() {
//     const [product, setProduct] = useState();
//     const [msg, setMsg] = useState('');
//     const [msgs, setMsgs] = useState([]);
//     const [user, setUser] = useState();
//     const [imageIndex, setImageIndex] = useState(0);

//     const params = useParams();

//     useEffect(() => {
//         socket = io(API_URL);

//         socket.on('connect', () => {
//             console.log('connected');
//         });

//         return () => {
//             socket.off();
//         };
//     }, []);

//     useEffect(() => {
//         socket.on('getMsg', (data) => {
//             const filteredData = data.filter((item) => item.productId === params.productId);
//             setMsgs(filteredData);
//         });
//     }, [params.productId]);

//     useEffect(() => {
//         const url = API_URL + '/get-product/' + params.productId;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setProduct(res.data.product);
//                     localStorage.setItem('productId', res.data.product._id);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Error');
//             });
//     }, [params.productId]);

//     const handleContact = (addedBy) => {
//         const url = API_URL + '/get-user/' + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setUser(res.data.user);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Error');
//             });
//     };

//     const handleSend = () => {
//         const data = { username: localStorage.getItem('userName'), msg, productId: localStorage.getItem('productId') };
//         socket.emit('sendMsg', data);
//         setMsg('');
//     };



//     const handleImageChange = (index) => {
//         setImageIndex(index);
//     };

//     return (
//         <>
//             <Header />
//             <div className="product-detail-container">
//                 {product && (
//                     <div className="product-details">
//                         <div className="image-slider">
//                             {product.pimage2 && (
//                                 <div className="slider-thumbnails">
//                                     {[product.pimage, product.pimage2].map((image, index) => (
//                                         <div
//                                             key={index}
//                                             className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
//                                             onClick={() => handleImageChange(index)}
//                                         >
//                                             <img src={API_URL + '/' + image} alt={`Thumbnail ${index}`} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                             <img
//                                 className="main-image"
//                                 src={API_URL + '/' + (imageIndex === 0 ? product.pimage : product.pimage2)}
//                                 alt="Product"
//                             />
//                         </div>
//                         <div className="product-info">
                            
//                             <h3 className="price-text">Rs. {product.price} /-</h3>
//                             <p>{product.pname} | {product.category}</p>
//                             <p className="text-success">{product.pdesc}</p>

                            
//                             {product.addedBy && (
//                                 <button onClick={() => handleContact(product.addedBy)}>
//                                     SHOW CONTACT DETAILS
//                                 </button>
//                             )}
                        
//                                               {user && user.username && <h4>{user.username}</h4>}
//                             {user && user.mobile && <h3>{user.mobile}</h3>}
//                             {user && user.email && <h6>{user.email}</h6>}    
//                         </div>
                        
//                     </div>
//                 )}
//                 <div className="chats">

//                     <h4>are you inters</h4>
//                     {msgs && msgs.length > 0 &&
//                         msgs.map((item, index) => (
//                             <p
//                                 key={item._id}
//                                 className={`chat-message ${item.username === localStorage.getItem('userName') ? 'self' : 'other'}`}
//                             >
//                                 {item.username} : {item.msg}
//                             </p>
//                         ))
//                     }
//                     <input value={msg} onChange={(e) => setMsg(e.target.value)} className="form-control" type="text" />
//                     <button onClick={handleSend} className="btn btn-primary">SEND</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import API_URL from "../../constants";
import "./ProductDetail.css"; // Import your CSS file
 import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetail() {
    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const [imageIndex, setImageIndex] = useState(0);

    const params = useParams();

    useEffect(() => {
        const url = API_URL + '/get-product/' + params.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem('productId', res.data.product._id);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    }, [params.productId]);

    const handleContact = (addedBy) => {
        // e.stopPropagation();
        // let userId = localStorage.getItem('userId');

        // if (!userId) {
        //     alert('Please Login first.')
        //     return;
        // }

    
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    };

    const handleImageChange = (index) => {
               
        setImageIndex(index);
    };

    return (
        <>
            <Header />
            <div className="product-detail-container">
                {product && (
                    <div className="product-details">
                        <div className="image-slider">
                            {product.pimage2 && (
                                <div className="slider-thumbnails">
                                    {[product.pimage, product.pimage2].map((image, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
                                            onClick={() => handleImageChange(index)}
                                        >
                                            <img src={API_URL + '/' + image} alt={`Thumbnail ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <img
                                className="main-image"
                                src={API_URL + '/' + (imageIndex === 0 ? product.pimage : product.pimage2)}
                                alt="Product"
                            />
                        </div>
                        <div className="product-info">
                            
                            <h3 className="text-3xl font-bold underline">Rs. {product.price} /-</h3>
                            <p>{product.pname} | {product.category}</p>
                            <p className="text-success">{product.pdesc}</p>

                            
                            {product.addedBy && (
                                <button onClick={() => handleContact(product.addedBy)}>
                                    SHOW CONTACT DETAILS
                                </button>
                            )}
                        
                            {user && user.username && <h4>{user.username}</h4>}
                            {user && user.mobile && <h3>{user.mobile}</h3>}
                            {user && user.email && <h6>{user.email}</h6>}    
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
