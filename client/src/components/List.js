import React from "react";

export class FarmList extends React.Component {
    render() {
        const listItem = this.props.allfarmers.map((items, index) =>
            <FarmersList key={index.toString()} value={items} />)

        return (
            <div className="List">
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
function FarmersList(props) {
    return <tr><td>{props.value.name}</td>
    </tr>

}
