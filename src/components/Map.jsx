import { MapContainer, Polyline, TileLayer, Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import hurdat2 from "../hurdat2";

function Map({year}) {

  const dot = (color) => {
    return (
      new divIcon({
        className: 'bg-opacity-0',
        html: `<svg fill=${color} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle stroke="black" stroke-width="10" cx="50" cy="50" r="40" /></svg>`,
        iconSize: [10, 10]
      })
    )
  }

  const storms = hurdat2[2022 - year].map((storm, i) => {
    const name = storm[0]
    const coords = []
    const points = storm.slice(1).map((point, i) => {
      coords.push([point.lat, point.lng])
      let classification
      let color
      const wind = point.max_wind_kt
      if (point.class === 'LO') {
        classification = "Tropical Low"
        color = "lightgray"
      }
      if (point.class === 'DB') {
        classification = "Tropical Disturbance"
        color = "lightgray"
      }
      if (point.class === 'WV') {
        classification = "Tropical Wave"
        color = "lightgray"
      }
      if (point.class === 'EX') {
        classification = "Extratropical Cyclone"
        color = "lightgray"
      }
      if (point.class === 'SD') {
        classification = "Subtropical Depression"
        color = "lightblue"
      }
      if (point.class === 'SS') {
        classification = "Subtropical Storm"
        color = "lightgreen"
      }
      if (point.class === 'TD') {
        classification = "Tropical Depression"
        color = "blue"
      }
      if (point.class === 'TS') {
        classification = "Tropical Storm"
        color = "lime"
      }
      if (point.class === 'HU') {
        if (wind <= 82) {
          classification = 'Category 1 Hurricane'
          color = 'yellow'
        }
        if (wind > 82 && wind <= 100) {
          classification = 'Category 2 Hurricane'
          color = 'orange'
        }
        if (wind > 100 && wind <= 110) {
          classification = 'Category 3 Hurricane'
          color = 'red'
        }
        if (wind > 110 && wind <= 135) {
          classification = 'Category 4 Hurricane'
          color = 'hotpink'
        }
        if (wind > 135) {
          classification = 'Category 5 Hurricane'
          color = 'pink'
        }
      }
      return (
        <Marker key={i} position={[point.lat, point.lng]} icon={dot(color)}>
          <Popup className="w-64 font-bold">
            <h1 className="text-md">{classification} {name}</h1>
            <h1 className="my-1">{point.date_time_utc}</h1>
            <h1>Maximum Wind: {wind} kt</h1>
            <h1>Minimum Pressure: {point.min_pressure_mb} mb</h1>
          </Popup>
        </Marker>
      )
    })
    return (
      <div key={i}>
        <Polyline positions={coords} color="gray" opacity={.25}/>
        {points}
      </div>
    )
  })  
  
  return (
    <MapContainer className="w-[calc(100%-24rem)] h-full" maxBounds={[[90, 180], [-90, -180]]} center={[30, -60]} maxZoom={15} minZoom={5} zoom={5}>
      <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'/>  
      {storms}
    </MapContainer>
  )
}

export default Map
