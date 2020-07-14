import React, { Component } from 'react';

class AllFarmers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            farmerName: "",
            getFarmerInfo: "",
            allFarmerProduct: []
        }
    }
    async postData(link = '', data = {}) {

        // Default options are marked with *
        let response = await fetch(link, {
            method: 'POST',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });

        const json = await response.json();    // parses JSON response into native JavaScript objects   
        return json;
    }

    get_farmer_Product = async (farm_name) => {

        let resp = await this.postData('http://127.0.0.1:4000/farmer_product', { "name": farm_name });
        this.setState({
            allFarmerProduct: resp
        })
        // console.log(resp)

    }

    showModal = (e) => {
        this.get_farmer_Product(e.target.textContent);
        this.setState({
            show: true,
            farmerName: e.target.textContent
        })
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    render() {
        const listItem = this.props.allFarmers.map((items, index) =>
            <Farmers key={index.toString()} value={items} ind={index + 1} showModal={this.showModal} />
        )
        const product_Item = this.state.allFarmerProduct.map((items, index) =>
            <FarmProduct key={index.toString()} value={items} ind={index + 1} />
        )
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal} >
                    <div>
                        <h3 style={{ display: "flex", justifyContent: "center", padding: "5px" }}>{this.state.farmerName}</h3>
                        <table >
                            <tbody>
                                <tr>
                                    <th>S/N</th>
                                    <th>Product</th>
                                    <th>Price [CAD$]</th>
                                </tr>
                                {product_Item}
                            </tbody>
                        </table>
                    </div>
                </Modal>
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
            </div>
        );
    }
}

export default AllFarmers;

function Farmers(props) {
    return <tr>
        <td>{props.ind}</td>
        <td onClick={props.showModal} style={{ cursor: "pointer" }}>{props.value.name}</td>
        <td>{props.value.address}</td>
        <td>{props.value.contact}</td>
        <td>{props.value.latitude}</td>
        <td>{props.value.longitude}</td>
    </tr>

}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName} >

            <section className="modal-main" style={{ height: "60vh", overflow: "auto" }}>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Close</button>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Delete Farmer</button>
                {children}
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Delete Farmer</button>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Close</button>
            </section>
        </div>

    );
};

function FarmProduct(props) {
    return <tr>
        <td>{props.ind}</td>
        <td >{props.value.name}</td>
        <td>{props.value.price}</td>
    </tr>

}