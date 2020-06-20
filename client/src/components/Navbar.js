import React, { Component } from 'react';

class NavBar extends Component {
    render() {

        return (
            <div className="Menu" id="" style={{ background: "lightblue", display: 'flex' }}>
                <ul id=''>
                    <li id='idHome' onClick={this.props._onClick}>Home</li>
                    <li id='idAllProducts' onClick={this.props._onClick}>All Products</li>
                    <li id='idAllFarmers' onClick={this.props._onClick}>All Farmers</li></ul>
                <img src={"/logo.png"} alt="logo" style={{ float: "right" }} />
            </div>
        );
    }
}

export default NavBar;