import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const listItem = this.props.allfarmers.map((items, index) =>
            <FarmersList key={index.toString()} value={items} />)
        return (
            <div className="List">
                <fieldset style={{ marginTop: "5px" }}>
                    <legend> <b>Products</b></legend>
                    <input type="text" placeholder="Search farms products..." value={this.props.searchQuery} onChange={this.props.search} />
                    <div>
                        <table>
                            <tbody>
                                <tr><th>Items</th>
                                </tr>
                                {listItem}
                            </tbody>
                        </table>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default List;

function FarmersList(props) {
    return <tr><td>{props.value.name}</td>
    </tr>

}