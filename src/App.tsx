import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps } from "@mui/material";
import CustomMap from "./components/customMap/CustomMap";
import { LatLngTuple } from "leaflet";
import CustomPlot from "./components/customPlot/CustomPlot";
import { Country, CountryResponse, State, StateResponse } from "./types/types";
import "./App.css"
import { Theme } from "@emotion/react";
import Header from "./components/header/Header";
import RawData from "./components/rawData/RawData";
import Footer from "./components/footer/Footer";

export default function App(): JSX.Element {

  // these are only once set after data fetching
  const [countries, setCountries] = useState<Map<string, LatLngTuple[][]>>(new Map<string, LatLngTuple[][]>()) // map to hold the fetched country data
  const [states, setStates] = useState<Map<string, LatLngTuple[][]>>(new Map<string, LatLngTuple[][]>()) // map to hold the fetched us states data

  // these is getting set everytime switching between modes
  const [mode, setMode] = useState<string>("Country")
  const [activeMap, setActiveMap] = useState<Map<string, LatLngTuple[][]>>(new Map<string, LatLngTuple[][]>())

  // this is getting set everytime the user selects a specific polygon
  const [selectedItem, setSelectedItem] = useState<string>("") // string which holds a selected key to get the data from the maps

  // two functions because they have different array depths
  // and I didn't find another way to type these as they are
  // mixed in the requests. polygons of type LatLngTuple[][]
  // and multi polygons of type LatLngTuple[][][]
  // feedback on how to do this properly welcomed

  // could cast single polygons as LatLngTuple[][] directly
  // but the latitude and longitude would be swaped
  function flattenPolygon(arr: any[]): LatLngTuple[][] {
    let result: LatLngTuple[][] = [[]]
    arr[0].map((elem: LatLngTuple) => { result[0].push([elem[1], elem[0]])}) // swapping coordinates
    return result
  }

  // function to convert the multi polygon data to LatLngTuple[][]
  function flattenMultiPolygon(arr: any[]): LatLngTuple[][] {
    let result: LatLngTuple[][] = []
    for(let i: number = 0 ; i < arr.length ; i++) {
      result.push([])
      arr[i][0].map((elem: LatLngTuple) => { result[i].push([elem[1], elem[0]])}) // swapping coordinates
    }
    return result
  }

  useEffect(() => {
    // fetch the GeoJSON data of country polygons
    fetch("https://pkgstore.datahub.io/core/geo-countries/countries/archive/23f420f929e0e09c39d916b8aaa166fb/countries.geojson")
      .then((res: Response): Promise<CountryResponse> => res.json())
      .then(
        (res: CountryResponse): void => { 
          let countryMap: Map<string, LatLngTuple[][]> = new Map<string, LatLngTuple[][]>() // map all country names to an coordinate array for quick data access
          res.features.map((country: Country): void => {
            if (country.geometry.type === "Polygon") {
              countryMap.set(country.properties.ADMIN, flattenPolygon(country.geometry.coordinates))
            } else {
              countryMap.set(country.properties.ADMIN, flattenMultiPolygon(country.geometry.coordinates))
            }
          })
          setCountries(countryMap) 
          setActiveMap(countryMap) // by deault the map should be set to countryMap (in case no button has been clicked)
        }
      )
    // fetch the GeoJSON data of us state polygons
    fetch("https://pkgstore.datahub.io/core/geo-admin1-us/admin1-us/archive/832de13f11fc882d18d45e085758e737/admin1-us.geojson")
      .then((res: Response): Promise<StateResponse> => res.json())
      .then(
        (res: StateResponse): void => {
          let stateMap: Map<string, LatLngTuple[][]> = new Map<string, LatLngTuple[][]>() // map all us state names to an coordinate array for quick data access
          res.features.map((stateUS: State): void => {
            if (stateUS.geometry.type == "Polygon") {
              stateMap.set(stateUS.properties.name, flattenPolygon(stateUS.geometry.coordinates))
            } else {
              stateMap.set(stateUS.properties.name, flattenMultiPolygon(stateUS.geometry.coordinates))
            }
          })
          setStates(stateMap)
        }
      )
  }, []) // on mount

  // material ui styling for the Button
  const sxButton: SxProps<Theme> = {
    backgroundColor: '#feed00',
    borderRadius: 0,
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    height: { lg: '6rem', sm: '5rem', xs: '4rem' },
    width: { lg: '20%', sm: '40%', xs: '40%' },
    fontSize: { lg: '120%', sm: '80%', xs: '80%' },
    '&:hover': {
      backgroundColor: '#000',
      border: 'none',
      color: '#fff',
      transition: 'all 800ms ease',
    },
  }

  // material ui styling for the FormControl
  const sxFormControl: SxProps<Theme> = {
    width: { lg: '35%', sm: '50%', xs: '70%' },
    backgroundColor: '#fff',
    border: 'none',
    borderColor: 'none',
  } 

  // material ui styling for the InputLabel
  const sxInputLabel: SxProps<Theme> = {
    fontWeight: 'bold',
    color: '#000',
  }

  // material ui styling for the Select
  const sxSelect: SxProps<Theme> = {
    borderRadius: '0',
    color: '#000',
    fontWeight: 'bold',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000',
    },
  }

  // material ui styling for the MenuItem
  const sxMenuItem: SxProps<Theme> = {
    color: '#000',
    fontWeight: 'bold',
    borderColor: '#000',
    '&:hover': {
      backgroundColor: '#feed00',
      transition: 'all 200ms ease',
    },
    selectedItem: {
      backgroundColor: '#feed00',
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="button-container">
        <Button 
          sx={sxButton} 
          variant="outlined" 
          onClick={() => {setMode("Country"); setActiveMap(countries); setSelectedItem("")}}
          >Countries</Button> {/* Button to switch in country mode */}
        <Button 
          sx={sxButton} 
          variant="outlined" 
          onClick={() => {setMode("United States"); setActiveMap(states); setSelectedItem("")}} 
          >United States</Button> {/* Button to switch in us state mode */}
      </div>
      <div className="selection-container">
        <FormControl sx={sxFormControl}>
          <InputLabel sx={sxInputLabel}>{mode}</InputLabel>
          <Select
            sx={sxSelect}
            value={selectedItem}
            label={mode}
            onChange={(event: SelectChangeEvent<typeof selectedItem>): void => {
              setSelectedItem(event.target.value)}}
          >
            {[...activeMap.keys()].map((key): JSX.Element => { // creating an item for every key in each map
              return <MenuItem sx={sxMenuItem} key={key} value={key}>{key}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      <RawData coordinats={activeMap.get(selectedItem)}/>
      <div className="visual-container">
        <div className="map-container">
          <CustomMap coordinates={activeMap.get(selectedItem)} center={[ 51.431073711000025, 4.815447224000138 ]} zoom={3}></CustomMap>
        </div>
        <div className="plot-container">
          <CustomPlot coordinates={activeMap.get(selectedItem)} name={selectedItem}></CustomPlot>
        </div>
      </div>
      <Footer />
    </div>
  );
}
