import { useNavigate } from "react-router-dom";
import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


//gets proper icons and shadows
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function markerClicked(marker){
    console.log("Marker was clicked at: [" + marker + "]");
}
const LocationMarker = (props) => {
    const navigate = useNavigate();
    return(
    <Marker position={props.coord} eventHandlers={{
        click: (e) => {
          markerClicked(props.coord);
          navigate("/pictures");
        },
    }}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
        <link to="/pictures"></link>
    </Marker>
    )
}



export default LocationMarker;