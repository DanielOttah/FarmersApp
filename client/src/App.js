import React from 'react';
import './App.css';
import { FarmList } from './components/List.js';
import FarmMap from './components/Map.js';
import NavBar from './components/Navbar.js';
import SearchResult from './components/SearchResult.js';
// import SearchResult from './components/SearchResult.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      searchQuery: "",
    }
    this.trial = []
  }
  async componentDidMount() {
    let url = 'http://127.0.0.1:3500/farmers';
    let getProductList = await fetch(url);
    let allProductList = await getProductList.json();
    let x;
    for (x in allProductList) {
      this.state.productList.push(allProductList[x]);
    }
    this.setState({
      productList: this.state.productList
    })

    //Trial
    for (let x = 0; x < 31; x++) {
      this.trial.push(this.state.productList[x]);
    }
  }

  handleProductSearch = (e) => {
    this.setState({
      searchQuery: e.target.value
    })

  }

  render() {
    const filteredProducts = this.state.productList.filter(items => {
      return items.name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
    })
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="Main">
            {/* <FarmMap allfarmers={(filteredProducts) ? filteredProducts : this.state.trial} /> */}
            <FarmMap allfarmers={this.trial} />
            <div className="">
              <FarmList search={this.handleProductSearch} searchQuery={this.state.searchQuery}
                allfarmers={filteredProducts} />
            </div>
          </div>
          <div className="result">
            <SearchResult allfarmers={filteredProducts} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// https://api.farmmarketid.com/api/v1/land/lat/53.67629/lon/-114.34865/radius/1000
// https://api.farmmarketid.com/api/v1/land/1298767890/crop-year/all

