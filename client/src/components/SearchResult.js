import React, { Component } from 'react';

class SearchResult extends Component {
    render() {
        const listItem = this.props.allfarmers.map((items, index) =>
            <SearchList key={index.toString()} value={items} />
        )
        return (
            <div className="">
                <table>
                    <tbody>
                        <tr><th>Farm Name</th>
                            <th>Farm Address</th>
                            <th>Farm Contact</th>
                        </tr>
                        {listItem}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchResult;

function SearchList(props) {
    return <tr><td>{props.value.name}</td>
        <td>{props.value.address}</td>
        <td>{props.value.contact}</td>
    </tr>

}