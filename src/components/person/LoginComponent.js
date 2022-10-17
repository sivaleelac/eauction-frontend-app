import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authenticatePerson } from "../../services/index";
import { useNavigate } from 'react-router-dom'

const LoginComponent = (props) => {
    
    const initialState = {
        userName: "",
        password: "",
    };

    const [person, setPerson] = useState(initialState);

    const credentialChange = (event) => {
        const { name, value } = event.target;
        setPerson({ ...person, [name]: value });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const validatePerson = event => {
        event.preventDefault();
        dispatch(authenticatePerson(person.userName, person.password))
        .then((response) => { 
            if(response.classification === "seller"){
                return navigate("/seller");
            }else{
                return navigate("/buyer");
            }
        })
        .catch((error) => {
            console.log(error.message);
            resetLoginForm();
        });
    };

    const resetLoginForm = () => {
        setPerson(initialState);
    };

        return (
            
            <div className="auth-wrapper">                   
                <div className="auth-inner">        
                    <form onSubmit={validatePerson}>
                        <h3>Login</h3>
                        <div className="msg-link-txt">
                            Not registered yet? <Link className="link-primary" to='/register'>Register</Link>                            
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Email address</label>
                            <input type="email" required name="userName" id="userName" value={person.userName} onChange={credentialChange} className="form-control" placeholder="Enter email"/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Password</label>
                            <input type="password" required name="password" id="password" value={person.password} onChange={credentialChange} className="form-control" placeholder="Enter password"/>
                        </div>                
                        <div className="d-grid">
                            <button type="submit" id="loginSubmit" className="btn btn-primary">Submit</button>
                        </div>  
                    </form>                  
                </div>
            </div> 
        );
    
}

export default LoginComponent;