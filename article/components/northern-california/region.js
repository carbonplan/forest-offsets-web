import { Box, Text, Grid, Button, Slider, Divider } from "theme-ui";
import { useState, useEffect, useRef } from "react";
import Enhancers from "./enhancers";
import mapboxgl from "mapbox-gl";
import style from "./style";

const Region = () => {
  const container = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style,
      center: [-122.58549497082685, 45.12433103370327],
      zoom: 7.1417,
      minZoom: 3,
      maxZoom: 9,
      maxBounds: [
        [-155, 5],
        [-45, 65],
      ],
    });

    // map.scrollZoom.disable()
    // map.dragPan.disable()
    map.dragRotate.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();

    map.on("load", () => {
      setMap(map);
    });

    return function cleanup() {
      setMap(null);
      map.remove();
    };
  }, []);

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "400px",
        "canvas.mapboxgl-canvas:focus": {
          outline: "none",
        },
        "canvas.mapboxgl-canvas": {
          cursor: "default",
        },
      }}
    >
      {map && <Enhancers map={map} />}
    </Box>
  );
};

export default Region;
