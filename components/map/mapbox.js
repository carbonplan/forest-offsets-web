import { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, Raster, useMapbox } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import style from './style'

const MapListener = ({ locations, tiles, setMap, setBounds, showFires }) => {
  const { map } = useMapbox()
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  useEffect(() => {
    setMap(map)
    setBounds(map.getBounds())
    map.setStyle(style(locations, tiles, colors))

    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    return function cleanup() {
      setMap(null)
    }
  }, [])

  useEffect(() => {
    if (map.isStyleLoaded()) {
      map.setPaintProperty('fires', 'fill-opacity', showFires ? 0.7 : 0)
    }
  }, [showFires])
}

const Mapbox = ({
  locations,
  tiles,
  setMap,
  setBounds,
  showFires,
  showActiveFires,
  archive,
}) => {
  const reds = useThemedColormap('reds')

  return (
    <Map
      zoom={6.79}
      minZoom={3}
      maxZoom={13}
      center={[-122.99922013524304, 40.02328448336925]}
    >
      <MapListener
        locations={locations}
        tiles={tiles}
        setMap={setMap}
        setBounds={setBounds}
        showFires={!showActiveFires}
      />
      {showFires && !archive && (
        <>
          <Raster
            colormap={reds}
            display={showActiveFires}
            clim={[0, 1.7]}
            source={
              'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/tiles/past-firms-hotspots'
            }
            variable={'active'}
            fillValue={9.969209968386869e36}
          />
          <Raster
            colormap={reds}
            display={showActiveFires}
            clim={[0, 1]}
            source={
              'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/tiles/current-firms-hotspots'
            }
            variable={'active'}
            fillValue={9.969209968386869e36}
          />
        </>
      )}
    </Map>
  )
}

export default Mapbox
