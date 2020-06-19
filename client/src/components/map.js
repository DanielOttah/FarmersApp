import React from "react";
import GoogleApiWrapper from './googleAPI.js'

class FarmMap extends React.Component {

    render() {
        // let src = `https://maps.google.com/maps?q=calgary&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        // let src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDD1Q2634NBdkrEv3zFY-aOOxKe0pgJHIU&q=Calgary,+AB`;  

        // return (
        //     <div >
        //         <div className="Mapouter">
        //             <div className="Gmap_canvas">
        //                 <iframe title={this.props.title} width="100%" height="600" id="Gmap_canvas" src={src} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
        //             </div>
        //         </div>
        //     </div>
        // )

        return (
            <div className="Mapouter">
                <GoogleApiWrapper filteredProducts={this.props.allfarmers} />
            </div>
        )

    }
}

export default FarmMap;


// API Key - AIzaSyCUFDKKfcxtx6iGI-c54ssEV8L-PxEoAb8

// function initMap() {
//     let locations = [
//         ['Airdrie', { lat: 51.2927, lng: -114.0134 }],
//         ['Red Deer', { lat: 52.2690, lng: -113.8116 }],
//         ['Calgary', { lat: 51.0447, lng: -114.0719 }],
//         ['Cochrane', { lat: 51.1918, lng: -114.4667 }],
//         // ['Long Beach', { lat: 33.770050, lng: -118.193739 }]
//     ];
//     //Create Map on the div
//     let map = new google.maps.Map(document.getElementById("farmMap"), {
//         center: { lat: 51.2927, lng: -114.0134 },
//         zoom: 8
//     });
//     //Set marker for each location using the addMarker function
//     for (let count = 0; count < locations.length; count++) {
//         addMarker(locations[count][1], locations[count][0])
//     }
// }
// function addMarker(coords, title) {
//     let marker = new google.maps.Marker({
//         position: coords,
//         map: map
//     });

//     //Set info window for the location
//     let infowindow = new google.maps.InfoWindow({
//         content: `<h5>${title}</h5>`
//     });

//     //add a click event listener to display the pop up
//     marker.addListener('click', () => {
//         infowindow.open(map, marker);
//     });

//     return marker
// }