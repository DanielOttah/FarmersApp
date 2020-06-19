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
      productList: this.state.productList,
    })
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
            <FarmMap allfarmers={(filteredProducts) ? filteredProducts : this.state.productList} />
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

