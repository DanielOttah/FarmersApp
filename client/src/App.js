import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/Map.js';
import NavBar from './components/Navbar.js';
import SearchResult from './components/SearchResult.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      filteredList: [],
      searchQuery: ""

    }
  }
  async componentDidMount() {
    // let item = [];
    // let url = 'http://127.0.0.1:5000/farmers';
    let url = 'http://127.0.0.1:3500/farmers';
    let getProductList = await fetch(url);
    let allProductList = await getProductList.json();
    let x;
    for (x in allProductList) {
      this.state.productList.push(allProductList[x]);
      this.state.filteredList.push(allProductList[x]);
    }
    this.setState({
      productList: this.state.productList,
      filteredList: this.state.filteredList
    })
  }

  handleProductSearch = (e) => {
    for (let i = 0; i < this.state.productList.length; i++) {
      if (this.state.productList[i].name.includes(e.target.value)) {
        this.state.filteredList.push(this.state.productList[i].name)
      }

    }
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
            <Map />
            <List search={this.handleProductSearch} searchQuery={this.state.searchQuery} allfarmers={filteredProducts} />
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
