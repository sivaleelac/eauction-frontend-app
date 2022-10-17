import React, { Component } from 'react';
import {Card, Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

import axios from "axios";

import "./../../assets/css/Style.css";
import EAuctionToast from '../EAuctionToast';

class ProductBidsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          productBid: "",
          products: [],
          bids: [],
          show: false,
          message: "",
          headMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        axios.get("http://3.84.148.234:8060/api/v1/seller/get-product/all?classification=seller")
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
        axios.get("http://3.84.148.234:8060/api/v1/seller/show-bids/"+event.target.value)
        .then(res => {
            const productBidData = res.data;
            console.log(productBidData);
            this.setState({ 
                productBid: productBidData.product,
                bids: productBidData.bids
            });
        })
        .catch((error) => {
            this.setState({ 
                productBid: "",
                bids: []
            });
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
                        <Card className="border border-dark bg-light text-black">
                            <Card.Header>Product Details</Card.Header>
                            <Card.Body>
                                {this.state.productBid === "" ? (
                                    <div>Product data not available</div>
                                ) : (
                                    <dl className="row">
                                        <dt className="col-sm-2">Product Name</dt>
                                        <dd className="col-sm-10">{this.state.productBid.productName}</dd>

                                        <dt className="col-sm-2">Short Description</dt>
                                        <dd className="col-sm-10">{this.state.productBid.shortDescription}</dd>

                                        <dt className="col-sm-2">Detailed Description</dt>
                                        <dd className="col-sm-10">{this.state.productBid.detailedDescription}</dd>

                                        <dt className="col-sm-2">Category</dt>
                                        <dd className="col-sm-10">{this.state.productBid.category}</dd>

                                        <dt className="col-sm-2">Starting Price</dt>
                                        <dd className="col-sm-10">{this.state.productBid.startingPrice} Rs</dd>

                                        <dt className="col-sm-2">Bid End Date</dt>
                                        <dd className="col-sm-10">{this.state.productBid.bidEndDate}</dd>
                                    </dl> 
                                )  }                
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='list-div'>
                        <Card className="border border-dark bg-light text-black">
                            <Card.Header>Bids</Card.Header>
                            <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Bid  Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.bids.length === 0 ? (
                                    <tr align="center">
                                    <td colSpan="6">No Bids Available</td>
                                    </tr>
                                ) : (
                                    this.state.bids.map((bid, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{bid.person.firstName} {bid.person.lastName}</td>
                                        <td>{bid.person.emailAddress}</td>
                                        <td>{bid.bidAmount} Rs</td>
                                    </tr>
                                    ))
                                )}
                                </tbody>
                            </Table>                       
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
/*
const mapStateToProps = (state) => {
    return {
        sellerProductBids: state.seller,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductBidsDetails: () => dispatch(fetchProductBidsDetails()),
    };
  };
*/
//export default connect(mapStateToProps, mapDispatchToProps) (ProductBidsList);
export default ProductBidsList;