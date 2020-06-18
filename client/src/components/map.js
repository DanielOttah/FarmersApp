import React from "react";
// import Map from 

class OurMap extends React.Component {

    render() {
        let src = `https://maps.google.com/maps?q=calgary&t=&z=13&ie=UTF8&iwloc=&output=embed`;
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
            <div >
                <div className="Mapouter">
                    <div className="Gmap_canvas" id="farmMap">
                        <iframe title={this.props.title} width="100%" height="600" id="Gmap_canvas" src={src} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                </div>
            </div>
        )
    }
}

export default OurMap;

// function initMap() {
//     var center = { lat: 41.8781, lng: -87.6298 };
//     var map = new google.maps.Map(document.getElementById('farmMap'), {
//         zoom: 10,
//         center: center
//     });
//     var marker = new google.maps.Marker({
//         position: center,
//         map: map
//     });
// }
// API Key - AIzaSyCUFDKKfcxtx6iGI-c54ssEV8L-PxEoAb8
// npm install --save google-maps-react