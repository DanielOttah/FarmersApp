import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div className="" id="svgDiv" style={{ background: "lightblue", display: 'flex', justifyContent: 'center' }}>
                <img src={"/log.png"} alt="logo" />
            </div>
        );
    }
}

export default NavBar;