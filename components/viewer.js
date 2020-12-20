import { useState, useEffect } from 'react'
import Projects from './projects'
import Enhancers from './map/enhancers'
import Minimap from './map/minimap'

const Viewer = ({ data, locations, map, bounds }) => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Projects data={data} bounds={bounds} setSelected={setSelected} />
      {map && <Enhancers map={map} selected={selected} />}
      <Minimap map={map} locations={locations.features} selected={selected} />
    </>
  )
}

export default Viewer
