import React, { Component } from 'react';

class AllFarmers extends Component {
    render() {
        const listItem = this.props.allFarmers.map((items, index) =>
            <Farmers key={index.toString()} value={items} ind={index + 1} />
        )
        return (
            <table >
                <tbody>
                    <tr>
                        <th>S/N</th>
                        <th>Farm Name</th>
                        <th>Farm Address</th>
                        <th>Farm Contact</th>
                        <th>Farm Latitude</th>
                        <th>Farm Longitude</th>
                    </tr>
                    {listItem}
                </tbody>
            </table>
        );
    }
}

export default AllFarmers;

function Farmers(props) {
    return <tr>
        <td>{props.ind}</td>
        <td>{props.value.name}</td>
        <td>{props.value.address}</td>
        <td>{props.value.contact}</td>
        <td>{props.value.latitude}</td>
        <td>{props.value.longitude}</td>
    </tr>

}