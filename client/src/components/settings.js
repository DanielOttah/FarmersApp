import React, { Component } from 'react';

class Settings extends Component {

    render() {

        return (

            <div style={{ background: this.props.background }}>
                <fieldset className="bordersettings" style={{ background: this.props.background }}>
                    <legend><b>Theme Settings</b></legend>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <select id="selectTheme" className="bordersettings" onChange={this.props.selectTheme} >
                            <option value="None" >Default</option>
                            <option value="gray" >Gray Theme</option>
                            <option value="blue" >Blue Theme</option>
                        </select>
                        <label className="switch">
                            <input id="themeId" type="checkbox" onChange={this.props.toggleLight_Dark} />
                            <span className="slider round"></span>
                        </label>
                        {/* <div >
                            Select Server:
                            <select className="bordersettings" onChange={this.props.toggleServer}>
                                <option value="flask">Python - Flask</option>
                                <option value="node">JS - Node</option>
                            </select>
                        </div> */}
                    </div>
                </fieldset>
            </div>

        );
    }
}

export default Settings;