import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

import authToken from "../authToken";

class SellerHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            person: ""
        };
    }
    
    componentDidMount() {
        axios.get("http://3.84.148.234:8060/api/v1/person/get")
        .then(res => {
            const person = res.data;
            console.log(person);
            this.setState({ person });
        })
    }
    render() {
        if (localStorage.jwtToken) {
            authToken(localStorage.jwtToken);
        }
        
        return (
            <div style={{padding: "10px"}}>
                <Card className="border border-dark bg-light text-black">
                    <Card.Header>Welcome {this.state.person.firstName} {this.state.person.lastName}</Card.Header>
                    <Card.Body>
                        As a seller you have the following options
                        <ul>
                            <li>
                                Add a product
                            </li>
                            <li>
                                View all your products
                            </li>
                            <li>
                                Delete a product
                            </li>
                            <li>
                                View the list of bids associated to the product
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SellerHome;