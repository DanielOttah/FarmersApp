import React from "react";
import GoogleApiWrapper from './googleAPI.js'

class FarmMap extends React.Component {

    render() {
        return (
            <div className="Mapouter">
                <GoogleApiWrapper markers={this.props.allfarmers} />
            </div>
        )

    }
}

export default FarmMap;
