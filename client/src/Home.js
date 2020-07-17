import React, { Component } from 'react';
import ThemeContextProvider from './components/ThemeContext';
import App from './App.js'

class Home extends Component {
    render() {
        return (
            <div>
                <ThemeContextProvider>
                    <App />
                </ThemeContextProvider>

            </div>
        );
    }
}

export default Home;