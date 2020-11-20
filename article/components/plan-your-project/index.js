/** @jsx jsx */
import { jsx, useThemeUI, Box, Text, Divider, Grid } from 'theme-ui'
import { useState, useEffect } from 'react'
import Radio from './radio'

let index = []
for (let i = 0; i < 15 * 8; i++) {
  index.push(i)
}

let positions = []
let categories = []
let initCategories = []
let initActive = []
let regions = []
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 8; j++) {
    positions.push([i, j])
    if (i < 7) {
      categories.push(1)
      initCategories.push(1)
    } else {
      categories.push(0)
      initCategories.push(0)
    }
    initActive.push(false)
    regions.push(0)
  }
}

const colors = {
  0: 'orange',
  1: 'green',
  2: 'muted',
}

const opacities = {
  0: 0.7,
  1: 0.7,
  2: 0.3,
}

const scenarios = {
  2: {
    increments: {
      0: 5,
      1: 50,
      2: 0,
    },
    boundary: [
      [7, -1],
      [7, 0],
      [7, 1],
      [7, 2],
      [6, 2],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [6, 5],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 7.5],
    ],
  },
  1: {
    increments: {
      0: 5,
      1: 50,
      2: 0,
    },
    boundary: [
      [7, -1],
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 7.5],
    ],
  },
}

const Index = () => {
  const context = useThemeUI()
  const theme = context.theme

  const [active, setActive] = useState(initActive)
  const [total, setTotal] = useState(0)
  const [scenario, setScenario] = useState(1)
  const [increments, setIncrements] = useState(scenarios[scenario].increments)
  const [boundary, setBoundary] = useState(scenarios[scenario].boundary)

  const onClick = (e) => {
    setActive(active.map((x, i) => (i == e.target.id ? !active[i] : active[i])))
  }

  const inBoundary = (p) => {
    return boundary
      .map((d) => {
        if (d[0] == p[0] && d[1] == p[1]) return 1
        return 0
      })
      .reduce((a, b) => a + b, 0)
  }

  const whichRegion = (p) => {
    const edge = boundary.filter((d) => d[1] == p[1])
    const leftEdge = edge.map((d) => d[0]).reduce((a, b) => Math.min(a, b), 15)
    if (p[0] < leftEdge) return 0
    return 1
  }

  const path = boundary.map((d) => [d[0] * 2 + 1, d[1] * 2 + 1])

  for (let i = 0; i < 15 * 8; i++) {
    if (inBoundary(positions[i]) === 1) {
      categories[i] = 2
    } else {
      categories[i] = initCategories[i]
    }
  }

  useEffect(() => {
    let baseline = [0, 0]
    let counts = [0, 0]
    let currentTotal = 0

    for (let i = 0; i < 15 * 8; i++) {
      if (categories[i] < 2) {
        const region = whichRegion(positions[i])
        baseline[region] += increments[categories[i]]
        counts[region] += 1
      }
    }

    baseline[0] = baseline[0] / counts[0]
    baseline[1] = baseline[1] / counts[1]

    for (let i = 0; i < 15 * 8; i++) {
      if (active[i]) {
        const region = whichRegion(positions[i])
        currentTotal += Math.max(
          increments[categories[i]] - baseline[region],
          0
        )
      }
    }
    setTotal(currentTotal)
  }, [active, boundary, increments])

  useEffect(() => {
    setBoundary(scenarios[scenario].boundary)
    setIncrements(scenarios[scenario].increments)
  }, [scenario])

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          fontSize: [3],
          ml: [2],
          my: [3],
          float: 'left',
        }}
      >
        <Radio
          value={1}
          label={'Scenario 1'}
          current={scenario}
          set={setScenario}
          color='primary'
        />
        <Radio
          value={2}
          label={'Scenario 2'}
          current={scenario}
          set={setScenario}
          color='primary'
        />
      </Box>
      <Box
        sx={{
          float: 'right',
          mr: ['50px'],
          mt: [3],
        }}
      >
        <Text
          sx={{
            color: 'secondary',
            fontSize: [3],
            textTransform: 'uppercase',
            fontFamily: 'heading',
            letterSpacing: 'heading',
          }}
        >
          Total credits
        </Text>
        <Text
          sx={{
            color: 'text',
            fontFamily: 'monospace',
            letterSpacing: 'monospace',
            fontSize: [4],
          }}
        >
          {total}
        </Text>
      </Box>
      <svg
        sx={{ width: '100%', maxWidth: '100%', height: 'auto' }}
        version='1.1'
        viewBox='0 0 32 17'
        preserveAspectRatio='xMinYMin meet'
      >
        {index.map((i) => {
          return (
            <circle
              sx={{
                fill: colors[categories[i]],
                opacity: (categories[i] < 2) & active[i] ? 1 : 0.3,
                cursor: categories[i] < 2 ? 'pointer' : 'default',
                transition: 'opacity 0.1s',
                '&:hover': {
                  opacity: active[i] ? 1 : opacities[categories[i]],
                },
              }}
              key={i}
              id={i}
              cx={positions[i][0] * 2 + 1}
              cy={positions[i][1] * 2 + 1}
              r='0.7'
              onClick={categories[i] == 2 ? null : onClick}
            />
          )
        })}
        <polyline
          sx={{
            stroke: 'primary',
            strokeWidth: 0.2,
            fill: 'none',
            opacity: 0.7,
            transition: '0.1s',
          }}
          points={path.join(' ')}
        />
      </svg>
      <Divider />
    </Box>
  )
}

export default Index
