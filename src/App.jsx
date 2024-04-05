import { useState } from "react"
import Interface from "./components/Interface"
import Map from "./components/Map"
import 'animate.css'

function App() {
  const [year, setYear] = useState(2022)
  const [id, setId] = useState("AL172022_Nicole")

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Interface year={year} setYear={setYear} id={id}/>
      <Map year={year} setId={setId}/>
    </div>
  )
}

export default App
