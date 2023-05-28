import { LatLngTuple } from "leaflet";
import { LayerGroup, MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CustomMap.css";


const CustomMap = (props: { coordinates: LatLngTuple[][] | undefined, center: LatLngTuple, zoom: number }): JSX.Element => {

  let polygonKey: number = 0 // key iterator so each polgyon has a unique key
  let polygons: LatLngTuple[][] = [] // placeholder array incase no item was selected

  if (props.coordinates !== undefined) { // if no item is selected coordinates are undefined
    polygons = props.coordinates
  }

  return (
    <div>
      <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          {polygons.map((polygon: LatLngTuple[]): JSX.Element => { // create a polygon for each passed polygon (only one for single polygons)
            polygonKey++
            return <Polygon key={polygonKey} pathOptions={ {color: 'red'} } positions={ polygon }></Polygon>
          })}
        </LayerGroup>
      </MapContainer>
    </div>
  );
};

export default CustomMap;
