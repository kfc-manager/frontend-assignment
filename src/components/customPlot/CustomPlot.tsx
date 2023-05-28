import "./CustomPlot.css"
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

import { LatLngTuple } from 'leaflet';

const Plot = createPlotlyComponent(Plotly);

const CustomPlot = (props: { coordinates: LatLngTuple[][] | undefined, name: string }): JSX.Element => {

  let x: number[] = [] // x coordinates for the plot
  let y: number[] = [] // y coordinates for the plot

  // push the coordinates of our polygons inside x and y
  if (props.coordinates !== undefined) {
    props.coordinates.map((polygon: LatLngTuple[]): void => {
      polygon.map((datapoint: LatLngTuple): void => {
        x.push(datapoint[1])
        y.push(datapoint[0])
      })
    })
  }

  return (
    <Plot
    data={[{
      x: x,
      y: y,
      type: 'scatter',
      mode: 'markers'
    }]}
    layout={{
      autosize: true, 
      height: 1000,
      title: ('Scatter plot of given data points')
    }}
    useResizeHandler
    className="plot"/>
  )
}

export default CustomPlot