import { useState } from "react"
import Interface from "./components/Interface"
import Map from "./components/Map"

function App() {
  const [year, setYear] = useState(2022)

  return (
    <div className="h-screen w-screen flex">
      <Interface year={year} setYear={setYear}/>
      <Map year={year}/>
    </div>
  )
}

export default App
