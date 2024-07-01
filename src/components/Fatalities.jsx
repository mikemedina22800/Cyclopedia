import { useState, useEffect, useContext } from 'react'
import { Context } from '../App'
import BarChart from './BarChart'
import { sum } from '../libs/sum'

const Fatalities = () => {
  const {season} = useContext(Context)

  const [names, setNames] = useState([]);
  const [fatalities, setFatalities] = useState([])

  useEffect(() => {
    const fatalStorms = season.filter((storm) => {
      return storm.fatalities > 0
    })

    const names = fatalStorms.map((storm) => {
      return storm.id.split('_')[1]
    })
    setNames(names)

    const fatalities = fatalStorms.map((storm) => {
      return storm.fatalities
    })
    setFatalities(fatalities)
  }, [season])

  const data = {
    labels: names,
    datasets: [
      {
        data: fatalities,
        borderColor: "darkred",
        backgroundColor: "darkred",
      },
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Fatalities: ${sum(fatalities)}`,
      },
    },
  };
  
  return <BarChart options={options} data={data}/>
}

export default Fatalities