import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutPerson } from "../services/index";

import logo from '../image/eauction.jpeg';

const NavigationBar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
      dispatch(logoutPerson());
    };

    const anonymousLinks = (
        <>
          <Navbar expand="lg" bg="primary" variant="primary">
              <img className="logoimg" alt="" src={logo} />{"   "} <h1 className="txt">E-Auction</h1>
              <Nav className="ml-auto">
                <Link to={"login"} className="nav-link">Login</Link>
                <Link to={"register"} className="nav-link">Register</Link>
              </Nav>
          </Navbar>         
        </>
      );
      const loggedInLinks = (
        <>
          <Navbar expand="lg" bg="primary" variant="primary">
              <img className="logoimg" alt="" src={logo} />{"   "} <h1 className="txt">E-Auction</h1>
              <Nav className="ml-auto">
                <Link to={"login"} className="nav-link" onClick={logout}>Logout</Link>
              </Nav>
          </Navbar>          
        </>
      );
      const sellerLinks = (
        <>
          <Navbar expand="lg" bg="secondary" variant="secondary">
            <Nav className="mr-auto">
                <Link to={"/seller"} className="nav-link">
                    Home
                </Link>
                <Link to={"/seller/addproduct"} className="nav-link">
                    Add Product
                </Link>
                <Link to={"/seller/products"} className="nav-link">
                    Product List
                </Link>
                <Link to={"/seller/productbids"} className="nav-link">
                    Product Bids List
                </Link>
            </Nav>
          </Navbar>         
        </>
      );
      const buyerLinks = (
        <>
          <Navbar expand="lg" bg="secondary" variant="secondary">
            <Nav className="mr-auto">
                <Link to={"/buyer"} className="nav-link">
                    Home
                </Link>
                <Link to={"/buyer/bidproduct"} className="nav-link">
                    Bid product
                </Link>
                <Link to={"/buyer/updatebidproduct"} className="nav-link">
                    Update Bid Amount
                </Link>
            </Nav>
          </Navbar>          
        </>
      );

        return (
          <div>
            {auth.isLoggedIn ? loggedInLinks : anonymousLinks}
            {auth.classification === "seller" && (
              sellerLinks
            )}
            {auth.classification === "buyer" && (
              buyerLinks
            )}
          </div>                    
        );
    
}

export default NavigationBar;