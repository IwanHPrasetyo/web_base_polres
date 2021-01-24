import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(
          localStorage.getItem("latUser"),
          localStorage.getItem("longUser")
        ),
        L.latLng(
          localStorage.getItem("latMap"),
          localStorage.getItem("lonMap")
        ),
      ],
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
