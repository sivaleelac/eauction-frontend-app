import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

import authToken from "../authToken";

class BuyerHome extends Component{
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
                        As a buyer you have the following options
                        <ul>
                            <li>
                                Bid a product
                            </li>
                            <li>
                                Update bid amount
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default BuyerHome;