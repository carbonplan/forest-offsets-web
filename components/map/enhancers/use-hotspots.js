import { useEffect } from 'react'

function useHotspots(map, showHotspots) {
  useEffect(() => {
    if (showHotspots) {
      map.setPaintProperty('hotspots', 'circle-opacity', [
        'max',
        ['min', ['/', ['+', ['get', 'frp'], 25], 175], 1],
        0,
      ])
    } else {
      map.setPaintProperty('hotspots', 'circle-opacity', 0)
    }
  }, [map, showHotspots])
}

export default useHotspots
