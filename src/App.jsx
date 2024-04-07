import { useState } from "react"
import Interface from "./components/Interface"
import Map from "./components/Map"
import 'animate.css'

function App() {
  const [year, setYear] = useState(2022)
  const [stormId, setStormId] = useState("AL012022_Alex")

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Interface year={year} setYear={setYear} stormId={stormId} setStormId={setStormId}/>
      <Map year={year} setStormId={setStormId}/>
    </div>
  )
}

export default App
