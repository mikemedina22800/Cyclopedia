import { useState } from "react"
import Interface from "./components/Interface"
import Map from "./components/Map"

function App() {
  const [year, setYear] = useState(2022)
  const [name, setName] = useState('')

  return (
    <div className="h-screen w-screen flex">
      <Interface year={year} setYear={setYear} name={name}/>
      <Map year={year} setName={setName}/>
    </div>
  )
}

export default App
