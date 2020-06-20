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
      searchQuery: ""
    }
  }
  async componentDidMount() {
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
              <div className="">
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

