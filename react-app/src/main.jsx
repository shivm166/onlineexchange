import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddProduct from './components/Product/AddProduct';
import LikedProducts from './components/Product/LikedProducts';
import ProductDetail from './components/Product/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/Product/MyProducts';
import MyProfile from './components/MyProfile';
import EditProduct from './components/Product/EditProduct';
import Footer from './components/Footer';
import Admin from './components/Admin/Admin';
import DeleteProduct from './components/Admin/DeleteProduct';
import AHeader from './components/Admin/AHeader';
import User from './components/Admin/User';




const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },

  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/edit-product/:productId",
    element: (< EditProduct />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },
   {
    path: "/Footer",
    element: (<Footer />),
  },

   {
    path: "/admin",
    element: (<Admin />), 
  },
  {
    path: "/deleteproduct",
    element: (<DeleteProduct />), 
  },
   {
    path: "/aheader",
    element: (<AHeader />), 
  },
  {
    path: "/User",
    element: (<User />), 
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
