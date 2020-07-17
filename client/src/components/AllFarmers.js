import React, { Component } from 'react';

class AllFarmers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            farmerName: "",
            getFarmerInfo: "",
            allFarmerProduct: [],
            showModalConfirmation: false,
            deleteFarmerConfirm: false
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

        //Flask Server
        let resp = await this.postData('http://127.0.0.1:3500/farmer_product', { "name": farm_name });
        // console.log(resp);

        //Node Server
        // let resp = await this.postData('http://127.0.0.1:4000/farmer_product', { "name": farm_name });

        this.setState({
            allFarmerProduct: resp
        })
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
    handleDeleteFarmer = () => {
        this.setState({
            showModalConfirmation: !this.state.showModalConfirmation,
            deleteFarmerConfirm: false
        })
    }
    handleModalConfirmation = async (e) => {
        if (e.target.textContent === "No") {
            this.setState({
                showModalConfirmation: false
            })
        }
        else if (e.target.textContent === "Yes") {
            this.setState({
                showModalConfirmation: false,
                deleteFarmerConfirm: true
            })
            //Flask Server
            this.postData('http://127.0.0.1:3500/del_farmer', { "name": this.state.farmerName });
        }
    }

    render() {
        const listItem = this.props.allFarmers.map((items, index) =>
            <Farmers key={index.toString()} value={items} ind={index + 1} showModal={this.showModal} />
        )
        const product_Item = this.state.allFarmerProduct.map((items, index) =>
            <FarmProduct key={index.toString()} value={items} ind={index + 1} />
        )
        return (
            <div style={this.props.cust_style}>

                <Modal show={this.state.show} handleClose={this.hideModal} handleDeleteFarmer={this.handleDeleteFarmer} >
                    <ModalConfirmation show={this.state.showModalConfirmation} farm={this.state.farmerName} onClick={this.handleModalConfirmation} />
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

const Modal = ({ handleClose, show, children, handleDeleteFarmer }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>

            <section className="modal-main" style={{ height: "60vh", overflow: "auto" }}>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Close</button>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleDeleteFarmer}>Delete Farmer</button>
                {children}
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Close</button>
                <button style={{ margin: "3px", padding: "5px" }} onClick={handleDeleteFarmer}>Delete Farmer</button>
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

const ModalConfirmation = ({ onClick, show, farm }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-confirm">
                <div className="center">
                    <h3>Delete {farm}?</h3>
                </div>
                <div className="center">
                    <p>Are you sure?</p>
                </div>
                <br />
                <div className="center">
                    <button style={{ margin: "5px", padding: "10px", cursor: 'pointer' }} onClick={onClick}>Yes</button>
                    <button style={{ margin: "5px", padding: "10px", cursor: 'pointer' }} onClick={onClick}>No</button>
                </div>
            </section>
        </div>

    );
};