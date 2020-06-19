import React from 'react';
import './App.css';
import { FarmList } from './components/List.js';
import FarmMap from './components/Map.js';
import NavBar from './components/Navbar.js';
import SearchResult from './components/SearchResult.js';

class App1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      farmersList: [],
      productList: [],
      searchQuery: "",
    }
    // this.trial = []
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
        <NavBar />
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
    );
  }
}

export default App1;

// https://api.farmmarketid.com/api/v1/land/lat/53.67629/lon/-114.34865/radius/1000
// https://api.farmmarketid.com/api/v1/land/1298767890/crop-year/all

