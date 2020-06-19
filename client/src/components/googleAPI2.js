import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '500px',
};
export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        const markerList = this.props.allfarmers.map((items, index) =>
            <MarkerList key={index.toString()} value={items} />
        )
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 51.2927, lng: -114.0134 }}
            >
                {markerList}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCUFDKKfcxtx6iGI-c54ssEV8L-PxEoAb8'
})(MapContainer);

function MarkerList(props) {
    <Fragment>
        <Marker
            onClick={this.onMarkerClick}
            name={props.name}
        />
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            <div>
                <h4>{this.state.selectedPlace.name}</h4>
            </div>
        </InfoWindow>
    </Fragment>

}