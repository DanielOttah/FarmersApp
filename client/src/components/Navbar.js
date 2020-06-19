import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class NavBar extends Component {
    render() {
        const options = [
            'All Farmers', 'All Products'
        ];
        const defaultOption = options[1];
        return (
            <div className="" id="svgDiv" style={{ background: "lightblue", display: 'flex' }}>
                {/* <img src={"/log.png"} alt="logo" /> */}
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
            </div>
        );
    }
}

export default NavBar;