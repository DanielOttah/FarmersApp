import React from 'react';
import './App.css';
import { FarmList } from './components/List.js';
import FarmMap from './components/Map.js';
import NavBar from './components/Navbar.js';
import SearchResult from './components/SearchResult.js';
import AllFarmers from './components/AllFarmers';
import AllProducts from './components/AllProducts';

class App1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      farmersList: [],
      productList: [],
      searchQuery: "",
      show: false,
      addFarmerDetails: {},
      addfarmerNotice: "Add Farmer"

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

  get_all_Products_From_Flask_API = async () => {
    let getFarmersList = await fetch('http://127.0.0.1:3500/farmers');
    let allFarmersList = await getFarmersList.json();
    let x;
    for (x in allFarmersList) {
      this.state.farmersList.push(allFarmersList[x]);
    }
    this.setState({
      farmersList: this.state.farmersList
    })


    let getProductList = await fetch('http://127.0.0.1:3500/food');
    let allProductList = await getProductList.json();
    let y;
    for (y in allProductList) {
      this.state.productList.push(allProductList[y]);
    }
    this.setState({
      productList: this.state.productList
    })
  }

  get_all_Products_From_Node_API = async () => {
    let getFarmersList = await fetch('http://127.0.0.1:4000/farmers');
    let allFarmersList = await getFarmersList.json();

    this.setState({
      farmersList: allFarmersList
    })


    let getProductList = await fetch('http://127.0.0.1:4000/food');
    let allProductList = await getProductList.json();

    this.setState({
      productList: allProductList
    })
  }
  componentDidMount() {
    // this.get_all_Products_From_Flask_API();
    this.get_all_Products_From_Node_API();
  }
  handleSelectMenu = (e) => {
    if (e.target.id === 'idHome') {
      const home = document.getElementById("_idHome")
      const allProduct = document.getElementById("_idAllProducts")
      const allfarmers = document.getElementById("_idAllFarmers")
      home.style.display = "block"
      allProduct.style.display = "none"
      allfarmers.style.display = "none"
    }
    else if (e.target.id === 'idAllProducts') {
      const home = document.getElementById("_idHome")
      const allProduct = document.getElementById("_idAllProducts")
      const allfarmers = document.getElementById("_idAllFarmers")
      home.style.display = "none"
      allProduct.style.display = "block"
      allfarmers.style.display = "none"
    }
    else if (e.target.id === 'idAllFarmers') {
      const home = document.getElementById("_idHome")
      const allProduct = document.getElementById("_idAllProducts")
      const allfarmers = document.getElementById("_idAllFarmers")
      home.style.display = "none"
      allProduct.style.display = "none"
      allfarmers.style.display = "block"
    }
  }

  handleProductSearch = (e) => {
    this.setState({
      searchQuery: e.target.value
    })

  }

  showModal = () => {
    this.setState({ show: true })
  }

  hideModal = () => {
    this.setState({ show: false });

  }

  handleAddFarmer = () => {

    this.postData('http://127.0.0.1:4000/addfarmer', this.state.addFarmerDetails)
    this.setState({ addfarmerNotice: `${this.state.addFarmerDetails.name} added` })

    this.get_all_Products_From_Node_API();

  }

  handleAddFarmerDetails = async (obj) => {
    let newFarm = { ...obj };
    this.setState({ addFarmerDetails: { ...this.state.addFarmerDetails, ...newFarm } })
  }

  // filterFarmers = () => {
  //   const filteredFarmers = this.state.farmersList.filter(items => {
  //     return items.name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
  //   })
  // }    
  render() {

    const filteredFarmers = this.state.farmersList.filter(items => {
      return items.name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
    })
    const filteredProducts = this.state.productList.filter(items => {
      return items.name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
    })
    return (
      <div>
        <NavBar _onClick={this.handleSelectMenu} />

        <div id='_idHome' style={{ display: "block" }}>
          <div className="container">
            <div className="Main">
              <FarmMap allfarmers={(filteredFarmers) ? filteredFarmers : this.state.farmersList} />
              <div>
                <FarmList search={this.handleProductSearch} searchQuery={this.state.searchQuery}
                  allProducts={filteredProducts} />
              </div>
            </div>
            <div className="result">
              <SearchResult allfarmers={filteredFarmers} />
            </div>
          </div>
        </div>
        <div id='_idAllFarmers' style={{ display: "none" }}>
          <button onClick={this.showModal}>Add Farmer</button>
          <Modal show={this.state.show} handleClose={this.hideModal} handleAddFarmer={this.handleAddFarmer}>
            <div >
              <h3 style={{ display: "flex", justifyContent: "center", padding: "5px" }}>{this.state.addfarmerNotice}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "15% 40% 15% 15% 15%" }}>
                <input style={{ margin: "3px" }} type="text" onChange={(e) => this.handleAddFarmerDetails({ name: e.target.value })} placeholder="Enter Farm Name" />
                <input style={{ margin: "3px" }} type="text" onChange={(e) => this.handleAddFarmerDetails({ address: e.target.value })} placeholder="Enter Farm Address" />
                <input style={{ margin: "3px" }} type="text" onChange={(e) => this.handleAddFarmerDetails({ contact: e.target.value })} placeholder="Enter Farm Contact" />
                <input style={{ margin: "3px" }} type="text" onChange={(e) => this.handleAddFarmerDetails({ lat: e.target.value })} placeholder="Enter Farm Latitude" />
                <input style={{ margin: "3px" }} type="text" onChange={(e) => this.handleAddFarmerDetails({ long: e.target.value })} placeholder="Enter Farm Longitude" />
              </div>
            </div>
          </Modal>
          <AllFarmers allFarmers={this.state.farmersList} />
        </div>
        <div id='_idAllProducts' style={{ display: "none" }}>
          <AllProducts allproducts={this.state.productList} />
        </div>
      </div>
    );
  }
}

export default App1;

const Modal = ({ handleClose, handleAddFarmer, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>

      <section className="modal-main">
        {children}
        <button style={{ margin: "3px", padding: "5px" }} onClick={handleAddFarmer}>Save</button>
        <button style={{ margin: "3px", padding: "5px" }} onClick={handleClose}>Close</button>
      </section>
    </div>

  );
};
//