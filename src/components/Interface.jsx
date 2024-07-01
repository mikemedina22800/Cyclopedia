import { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import { MenuItem, Select, Button } from "@mui/material"
import cyclone from "../../public/cyclone.png"
import Storm from "./Storm";
import Season from "./Season";


const Interface = () => {
  const {year, setYear, season, stormId, setStormId} = useContext(Context)

  const [seasonStats, setSeasonStats] = useState(false)
  const [stormIds, setStormIds] = useState(null)

  useEffect(() => {
    const stormIds = season.map((storm) => {
      return storm.id    
    })
    setStormIds(stormIds) 
  }, [season])

  const years = new Array(2022 - 1850).fill(0)

  const toggleStats = () => {
    if (seasonStats === false) {
      setSeasonStats(true)
    } else {
      setSeasonStats(false)
    }
  }

  return (
    <div className="w-[48rem] h-screen bg-blue-950 p-10 overflow-auto">
      <div className="w-full flex justify-between items-center text-white font-bold">
        <div className="flex items-center">
          <img src={cyclone} className="h-10 mr-1"/>
          <h1 className="text-4xl italic">Cyclopedia</h1>
        </div>
        <h1>Older data may be incomplete.</h1>
      </div>
      <div className="flex items-center justify-between my-10">
        <Select className="bg-white !rounded-xl h-12" value={year} onChange={(e) => {setYear(e.target.value)}}>
          {years.map((_, index) => {
            const selectedYear = 2022 - index;
            return (<MenuItem key={index} value={selectedYear}>{selectedYear}</MenuItem>);
          })}
        </Select>
        <Button onClick={toggleStats} className="h-12" variant="contained">
          <h1 className="font-sans font-bold">{seasonStats == true ? ("Storm") : ("Season")} Stats</h1>
        </Button>
        <Select className="bg-white !rounded-xl h-12" value={stormId} onChange={(e) => {setStormId(e.target.value)}}>
          {stormIds?.map((id) => {
            const name = id.split('_')[1]
            return (<MenuItem key={id} value={id}>{name}</MenuItem>);
          })}
        </Select>
      </div>
      {seasonStats === false ? <Storm/> : <Season/>}
    </div>
  )
}

export default Interface