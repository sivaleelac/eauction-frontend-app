import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerPerson } from "../../services/index";

const RegisterComponent = (props) => {

   const initialState = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        password: "",
        classification: "",
        city: "",
        state: "",
        pincode: ""
    };

    const [person, setPerson] = useState(initialState);

    const registerChange = (event) => {
        const { name, value } = event.target;
        setPerson({ ...person, [name]: value });
    }

    const dispatch = useDispatch();

    const submitPerson = event => {
        event.preventDefault();
        dispatch(registerPerson(person))
            .then((response) => {
                resetRegisterForm();
                //setTimeout(() => {
                //return navigate("/login") 
                //}, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const resetRegisterForm = () => {
        setPerson(initialState);
    };
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">   
                    <form onSubmit={submitPerson}>
                        <h3>Register</h3>
                        <div className="mb-3">
                            <label className='form-label'>First name</label>
                            <input type="text" required name="firstName" autoComplete="off" value={person.firstName} onChange={registerChange} className="form-control" placeholder="First name" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Last name</label>
                            <input type="text" required name="lastName" autoComplete="off" value={person.lastName} onChange={registerChange}  className="form-control" placeholder="Last name" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Phone number</label>
                            <input type="text" required name="phoneNumber" autoComplete="off" value={person.phoneNumber} onChange={registerChange}  className="form-control" placeholder="Phone number" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Email address</label>
                            <input type="email" required name="emailAddress" autoComplete="off" value={person.emailAddress} onChange={registerChange}  className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Password</label>
                            <input type="password" required name="password" autoComplete="off" value={person.password} onChange={registerChange}  className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>City</label>
                            <input type="text" required name="city" autoComplete="off" value={person.city} onChange={registerChange}  className="form-control" placeholder="Enter city" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>State</label>
                            <input type="text" required name="state" autoComplete="off" value={person.state} onChange={registerChange}  className="form-control" placeholder="Enter state" />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Pincode</label>
                            <input type="text" required name="pincode" autoComplete="off" value={person.pincode}  onChange={registerChange} className="form-control" placeholder="Enter pincode" />
                        </div>
                        <div className="mb-3">                           
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="classification" value="seller" onChange={registerChange} id="classificationId1"/>
                                <label className="form-check-label" for="classificationId1">Seller</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="classification" value="buyer" onChange={registerChange} id="classificationId2"/>
                                <label className="form-check-label" for="classificationId2">Buyer</label>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary submit-button">Register</button>
                        </div>                       
                        <p className="msg-link-txt">
                            Already registered <Link to="/login">Login?</Link>
                        </p>
                    </form>
                </div>
            </div> 
        );
    }


export default RegisterComponent;