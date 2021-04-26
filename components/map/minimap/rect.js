import { useEffect, useState } from 'react'
import { useThemeUI, Box } from 'theme-ui'

const Rect = ({ map, projection, initCenter, initZoom }) => {
  const context = useThemeUI()
  const theme = context.theme
  const [center, setCenter] = useState(initCenter)
  const [zoom, setZoom] = useState(initZoom)

  const zoomToSize = (z) => {
    return 3000 * (1 / Math.pow(z, 1.5))
  }

  useEffect(() => {
    if (map) {
      map.on('move', () => {
        const p1 = map.getCenter()
        const p2 = map.getZoom()
        setCenter([p1.lng, p1.lat])
        setZoom(p2)
      })
    }
  }, [map])

  if (projection(center)) {
    return (
      <Box
        as='rect'
        strokeWidth='3'
        stroke={theme.colors.primary}
        x={projection(center)[0] - zoomToSize(zoom) / 2}
        y={projection(center)[1] - zoomToSize(zoom) / 2}
        width={zoomToSize(zoom)}
        height={zoomToSize(zoom)}
        sx={{ pointerEvents: 'none' }}
      />
    )
  } else {
    return null
  }
}

export default Rect
