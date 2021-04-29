import { useState } from 'react'
import { Flex } from 'theme-ui'
import Mapbox from './map/mapbox'
import Viewer from './viewer'
import Loading from './loading'

const Desktop = ({ data, locations }) => {
  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)

  return (
    <Flex
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: ['column', 'row', 'row'],
        overflow: 'hidden',
        maxWidth: '1920px',
        margin: 'auto',
      }}
    >
      <Viewer locations={locations} data={data} map={map} bounds={bounds} />
      <Mapbox
        locations={locations}
        map={map}
        setMap={setMap}
        setBounds={setBounds}
      />
      <Loading map={map} />
    </Flex>
  )
}

export default Desktop
