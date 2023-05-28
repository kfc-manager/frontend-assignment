import { LatLngTuple } from "leaflet"
import "./RawData.css"

const RawData = (props: { coordinats: LatLngTuple[][] | undefined }): JSX.Element => {

  let polygonKey: number = 0 // key iterator so each polgyon has a unique key
  let polygons: LatLngTuple[][] = [] // placeholder array incase no item was selected

  if (props.coordinats !== undefined) { // if no item is selected coordinates are undefined
    polygons = props.coordinats
  }

  // function that returns a placholder in case no data
  // is passed to be displayed
  const placeholder = (): (JSX.Element | null) => {
    if (polygons.length === 0) {
      return <h2>Select an item to display the intial coordinates!</h2>
    }
    return null
  }


  return (
    <div className="data-container">
      <h1 className="data-head">
        Initial coordinate of each polygon:
      </h1>
      <div className="data-content">
        {placeholder()}
        {polygons.map((polygon: LatLngTuple[]): JSX.Element => { // create string of coordinates for each passed polygon (only one for single polygons)
          polygonKey++
          return <h2 key={polygonKey}>{'[' + polygon[0][0] + ', ' + polygon[0][1] + ']'}</h2>
        })}
      </div>
    </div>
  )
}

export default RawData