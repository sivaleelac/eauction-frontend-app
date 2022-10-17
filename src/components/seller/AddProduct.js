import React, { Component } from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import axios from "axios";

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            shortDescription: "",
            detailedDescription: "",
            category: "",
            startingPrice: "",
            bidEndDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
        axios.post("http://3.84.148.234:8060/api/v1/seller/add-product",  this.state )
            .then(res => {
                this.setState({
                    productName: "",
                    shortDescription: "",
                    detailedDescription: "",
                    category: "",
                    startingPrice: "",
                    bidEndDate: ""
                });
            }) 
            .catch((error) => {
                console.log("Error "+error.response.data.details[0]);                
            }); 
    }
    
    render() {
        return ( 
            <div className="product-add">
                <Card className="border border-dark bg-light text-black product-width">
                    <Card.Header>Add Product</Card.Header>                    
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Body>
                           
                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" required name="productName" autoComplete="off" value={this.state.productName} onChange={this.handleChange} placeholder="Enter product name" />
                                </Form.Group>

                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control type="text" required name="shortDescription" autoComplete="off" value={this.state.shortDescription} onChange={this.handleChange} placeholder="Enter short description" />
                                </Form.Group>
                            
                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Detailed Description</Form.Label>
                                    <Form.Control type="text" required name="detailedDescription" autoComplete="off" value={this.state.detailedDescription} onChange={this.handleChange} placeholder="Enter detailed description" />
                                </Form.Group>

                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" required name="category" autoComplete="off" value={this.state.category} onChange={this.handleChange} placeholder="Enter category" />
                                </Form.Group>
                            
                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Starting Price</Form.Label>
                                    <Form.Control type="text" required name="startingPrice" autoComplete="off" value={this.state.startingPrice} onChange={this.handleChange} placeholder="Enter starting price" />
                                </Form.Group>

                                <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                    <Form.Label>Bid End Date</Form.Label>
                                    <Form.Control type="text" required name="bidEndDate" autoComplete="off" value={this.state.bidEndDate} onChange={this.handleChange} placeholder="Enter bid end date" />
                                </Form.Group>
                                                                       
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "center" }}>
                            <Button size="sl" variant="success" type="submit">
                                Submit
                            </Button>              
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default AddProduct;