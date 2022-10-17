import React, { Component } from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';

import axios from "axios";

import "./../../assets/css/Style.css";
import EAuctionToast from '../EAuctionToast';

class BidProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product: "",
          products: [],
          bidAmountMessage: "Please select a product",
          showBidAmount: false,
          bidAmount: "",
          show: false,
          message: "",
          headMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBidAmount = this.handleBidAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        axios.get("http://3.84.148.234:8060/api/v1/seller/get-product/all?classification=buyer")
        .then(res => {
            const products = res.data;
            console.log(products);
            this.setState({ 
                products: res.data
            });
        })
        .catch((error) => {
            console.log("Error "+error.response.data);
            if(error.response.status === 403){
                this.setState({
                    show: true,
                    message: "Session expired, please login again",
                    headMessage: "Error"
                });
            }            
            setTimeout(() => this.setState({ show: false }), 3000);
        }); 
    }

    handleChange(event) {
        console.log(event.target.value);
        axios.get("http://3.84.148.234:8060/api/v1/seller/get-product/"+event.target.value)
        .then(res => {
            const product = res.data;
            console.log(product);
            this.setState({ 
                product: product
            });
        })
        .catch((error) => {
            this.setState({ 
                product: ""
            });
        });

        axios.get("http://3.84.148.234:8060/api/v1/buyer/get-bids/"+event.target.value)
        .then(res => {
            const productBidData = res.data;
            console.log(productBidData);
            this.setState({ 
                bidAmountMessage: "",
                showBidAmount: true
            });
        })
        .catch((error) => {
            this.setState({ 
                bidAmountMessage: "Bid already placed"
            });
        });
    }

    handleBidAmount = event => {
        this.setState({
            bidAmount: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.product.id);
        console.log(this.state.bidAmount);

        const data = {
            "product": {
                "id": this.state.product.id
            },
            "bidAmount": this.state.bidAmount
        };
        
        console.log(data);

        axios.post("http://3.84.148.234:8060/api/v1/buyer/place-bid",  data )
            .then(res => {
                this.setState({
                    bidAmount: "",
                    bidAmountMessage: "Bid successfully placed, please select other product"
                });
            }) 
            .catch((error) => {
                console.log("Error "+error.response.data.details[0]);                
            }); 
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <EAuctionToast children={{show: this.state.show, message: this.state.message, headMessage: this.state.headMessage}}/>
                </div>  
                <div className='list-div-select'>
                    <dl className="row">
                        <dt className="col-sm-1">Select Product: </dt>
                        <dd className="col-sm-10">
                            <Form.Select className="select-box" onChange={this.handleChange}>
                                <option value="">-- Please select --</option>
                                {
                                    this.state.products
                                    .map(product =>
                                        <option value={product.id}>{product.productName}</option>
                                    )
                                }
                            </Form.Select>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className='list-div'>
                        <Card style={{ width: '50rem' }} className="border border-dark bg-light text-black">
                            <Card.Header>Product Details</Card.Header>
                            <Card.Body>
                                {this.state.product === "" ? (
                                    <div>Product data not available</div>
                                ) : (
                                    <dl className="row">
                                        <dt className="col-sm-3">Product Name</dt>
                                        <dd className="col-sm-9">{this.state.product.productName}</dd>

                                        <dt className="col-sm-3">Short Description</dt>
                                        <dd className="col-sm-9">{this.state.product.shortDescription}</dd>

                                        <dt className="col-sm-3">Detailed Description</dt>
                                        <dd className="col-sm-9">{this.state.product.detailedDescription}</dd>

                                        <dt className="col-sm-3">Category</dt>
                                        <dd className="col-sm-9">{this.state.product.category}</dd>

                                        <dt className="col-sm-3">Starting Price</dt>
                                        <dd className="col-sm-9">{this.state.product.startingPrice} Rs</dd>

                                        <dt className="col-sm-3">Bid End Date</dt>
                                        <dd className="col-sm-9">{this.state.product.bidEndDate}</dd>
                                    </dl> 
                                )  }                
                            </Card.Body>
                        </Card>
                    </div>                    
                </div>
                <div>
                    <div className='list-div'>
                        <Card style={{ width: '50rem' }} className="border border-dark bg-light text-black">
                            <Card.Header>Bid for a product</Card.Header>
                            {this.state.bidAmountMessage !== "" ? (
                                <Card.Body>{this.state.bidAmountMessage}</Card.Body>
                            ) : (
                                <Form onSubmit={this.handleSubmit}>                                        
                                    <Card.Body>
                                        <div className="bid-amount-div">
                                            <Form.Group as={Col} style={{ paddingTop : "2px"}}>
                                                <Form.Label>Bid Amount</Form.Label>
                                                <Form.Control type="text" required name="bidAmount" autoComplete="off" value={this.state.bidAmount} onChange={this.handleBidAmount} placeholder="Enter bid amount" />
                                            </Form.Group>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer style={{ textAlign: "center" }}>
                                        <Button size="sl" variant="success" type="submit">
                                            Submit
                                        </Button>              
                                    </Card.Footer>
                                </Form> 
                            )}
                        </Card>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default BidProduct;