import React, { Component } from 'react';

class AllProducts extends Component {
    getImage = (e) => {
        let url = e.target.textContent
        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=500,height=300");

    }
    render() {
        const listItem = this.props.allproducts.map((items, index) =>
            <Farmers key={index.toString()} value={items} ind={index + 1} _onClick={this.getImage} />
        )
        return (
            <div style={this.props.cust_style}>
                <table >
                    <tbody>
                        <tr>
                            <th>S/N</th>
                            <th>Item Name</th>
                            <th>Botanical Names</th>
                            <th>Other Names</th>
                            <th>Image</th>

                        </tr>
                        {listItem}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AllProducts;

function Farmers(props) {
    return <tr>
        <td>{props.ind}</td>
        <td>{props.value.name}</td>
        <td>{props.value.botanicalname}</td>
        <td>{props.value.othernames}</td>
        <td onClick={props._onClick} style={{ cursor: "pointer" }}>{props.value.imageurl}</td>
    </tr>

}