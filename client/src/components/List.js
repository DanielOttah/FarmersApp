import React from "react";

export class FarmList extends React.Component {
    render() {
        const listItem = this.props.allProducts.map((items, index) =>
            <ProductList key={index.toString()} value={items} />)

        return (
            <div className="List" style={this.props.cust_style}>
                <fieldset style={{ marginTop: "5px" }}>
                    <legend> <b>Products</b></legend>
                    <input type='search' placeholder="Search farms products..." value={this.props.searchQuery} onChange={this.props.search} />

                </fieldset>
                <div>
                    <table>
                        <tbody>
                            {listItem}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
function ProductList(props) {
    return <tr><td>{props.value.name}</td>
    </tr>

}
