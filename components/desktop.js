import { useState } from 'react'
import { Flex } from 'theme-ui'
import Mapbox from './map/mapbox'
import Viewer from './viewer'
import Loading from './loading'

const Desktop = ({ data, locations, tiles, showFires, archive }) => {
  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [showActiveFires, setShowActiveFires] = useState(false)

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
        margin: 'auto',
      }}
    >
      <Viewer
        locations={locations}
        data={data}
        map={map}
        bounds={bounds}
        showFires={showFires}
        archive={archive}
        showActiveFires={showActiveFires}
        setShowActiveFires={setShowActiveFires}
      />
      <Mapbox
        locations={locations}
        tiles={tiles}
        map={map}
        setMap={setMap}
        setBounds={setBounds}
        showFires={showFires}
        archive={archive}
        showActiveFires={showActiveFires}
      />
      <Loading map={map} />
    </Flex>
  )
}

export default Desktop
