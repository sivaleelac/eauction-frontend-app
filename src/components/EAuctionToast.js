import React, { Component } from 'react';
import {Toast} from 'react-bootstrap';

class EAuctionToast extends Component {
    render() {

        const toastCss = {
            position: "fixed",
            top: "70px",
            right: "70px",
            zIndex: "1",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        };

        return (
            <div style={this.props.children.show ? toastCss : null}>
                <Toast className={"border border-success bg-success text-white"} show={this.props.children.show}>
                    <Toast.Header className={"bg-success text-white"} closeButton={false}>
                        <strong className="mr-auto">{this.props.children.headMessage}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast> 
            </div>
        );
    }
}

export default EAuctionToast;