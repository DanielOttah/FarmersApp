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
      searchQuery: ""

    }
  }
  async componentDidMount() {
    let item = [];
    let url = 'http://127.0.0.1:5000/farmers';
    let getProductList = await fetch(url);
    let allProductList = await getProductList.json();
    let x;
    for (x in allProductList) {
      this.state.productList.push(allProductList[x]);
    }
    this.setState({
      productList: this.state.productList
    })
  }

  handleProductSearch = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="Main">
            <Map />
            <List search={this.handleProductSearch} searchQuery={this.state.searchQuery} allfarmers={this.state.productList} />
          </div>
          <div className="result">
            <SearchResult />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
