import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    constructor(props) {
        super(props)
        this.none = {
            isLightTheme: true,
            light: { textColor: "#000000", ui: "#FFFFFF", bg: "#FFFFFF" },
            dark: { textColor: "#000000", ui: "#FFFFFF", bg: "#FFFFFF" }
        }
        this.state = {
            isLightTheme: true,
            gray: {
                light: { textColor: "#555", ui: "#ddd", bg: "#eee" },
                dark: { textColor: "#ddd", ui: "#333", bg: "#555" }
            },
            blue: {
                light: { textColor: "#111a1f", ui: "#309cd6", bg: "#a9d4ec" },
                dark: { textColor: "#aed7eb", ui: "#313e44", bg: "#111a1f" }
            },
            whichTheme: this.none

        }

    }
    selectTheme = (e) => {
        const selectedTheme = e.target.value;
        const themeId = document.getElementById("themeId");

        if (selectedTheme === "None") {
            themeId.disabled = true;
            this.setState({
                whichTheme: this.none,
                selectedThemeOption: "None"
            })
            themeId.value = "None";
        } else if (selectedTheme === "blue") {
            themeId.disabled = false;
            this.setState({
                whichTheme: this.state.blue
            })

        } else if (selectedTheme === "gray") {
            themeId.disabled = false;

            this.setState({
                whichTheme: this.state.gray
            })
        }
    }

    toggleLight_Dark = () => {

        if (this.state.whichTheme === this.none) {
            return;
        } else if (this.state.whichTheme === this.state.blue) {
            this.setState({
                isLightTheme: !this.state.isLightTheme
            })

        } else if (this.state.whichTheme === this.state.gray) {
            this.setState({
                isLightTheme: !this.state.isLightTheme
            })
        }
    }



    render() {
        return (
            <ThemeContext.Provider value={{
                ...this.state.whichTheme, isLightTheme: this.state.isLightTheme,
                toggleLight_Dark: this.toggleLight_Dark, selectTheme: this.selectTheme,
                selectedServer: this.state.selectedServer, toggle_Server: this.toggleServer
            }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;