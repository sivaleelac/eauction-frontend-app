import React, { Component } from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import "./../../assets/css/Style.css";
import EAuctionToast from '../EAuctionToast';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          show: false,
          message: "",
          headMessage: ""
        };
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

    deleteProduct = (productId) => {
        axios
        .delete("http://3.84.148.234:8060/api/v1/seller/delete/" + productId)
        .then((response) => {
            console.log("Successfully deleted");
            this.setState({
                products: this.state.products.filter(product => product.id !== productId),
                show: true,
                message: "Product deleted successfully",
                headMessage: "Success"
            });
            setTimeout(() => this.setState({ show: false }), 3000);
        })
        .catch((error) => {
            console.log("Error "+error);
            this.setState({
                show: true,
                message: "Error "+error.response.data.details[0]
            });
            setTimeout(() => this.setState({ show: false }), 3000);
        });        
    };

    render() {
        return (
            <div>  
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <EAuctionToast children={{show: this.state.show, message: this.state.message, headMessage: this.state.headMessage}}/>
                </div>              
                <div className='list-div'>
                    <Card className="border border-dark bg-light text-black">
                        <Card.Header>Product List</Card.Header>
                        <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Short Description</th>
                                    <th>Detailed Description</th>
                                    <th>Category</th>
                                    <th>Starting Price</th>
                                    <th>Bid End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.length === 0 ? (
                                    <tr align="center">
                                    <td colSpan="8">No products available</td>
                                    </tr>
                                ) : (
                                    this.state.products.map((product, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.shortDescription}</td>
                                        <td>{product.detailedDescription}</td>
                                        <td>{product.category}</td>
                                        <td>{product.startingPrice} Rs</td>
                                        <td>{product.bidEndDate}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-danger" onClick={() => this.deleteProduct(product.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>                       
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default ProductList;