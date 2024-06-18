import { useBreakpointIndex } from '@theme-ui/match-media'
import { Box } from 'theme-ui'
import { Layout, Guide, Dimmer } from '@carbonplan/components'
import Desktop from '../../components/desktop'
import Mobile from '../../components/mobile'
import projects from '../../data/projects-fires'

const tiles = {
  projects: `https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/tiles/projects/{z}/{x}/{y}.pbf`,
  fires: `https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/tiles/current-nifc-perimeters/{z}/{x}/{y}.pbf`,
  hotspots: `https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/tiles/current-firms-pixels/{z}/{x}/{y}.pbf`,
}

const Index = ({ fireData, createdAt }) => {
  let uniqueOverlapping = []
  fireData.forEach((d) => {
    Object.keys(d.fires).forEach((f) => {
      const obj = d.fires[f]
      obj.id = f
      uniqueOverlapping.push(obj)
    })
  })

  const projectLocations = {
    type: 'FeatureCollection',
    features: projects.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
          fire: fireData.find((f) => f.opr_id === d.id),
        },
        geometry: {
          type: 'Point',
          coordinates: d.shape_centroid,
        },
      }
    }),
  }

  const fireLocations = {
    type: 'FeatureCollection',
    features: uniqueOverlapping.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
          name: d.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [d.centroid[0], d.centroid[1]],
        },
      }
    }),
  }

  const locations = { fires: fireLocations, projects: projectLocations }

  const merged = projects.map((project) => {
    let fire
    const el = fireData.find((f) => f.opr_id === project.id)
    if (el && Object.keys(el.fires).length > 0) {
      fire = {
        overlappingFires: Object.keys(el.fires).map((id) => {
          if (el.fires[id])
            return { name: el.fires[id].name, href: el.fires[id].url }
        }),
        burnedFraction: el.burned_fraction,
        lastUpdated: createdAt,
      }
    }
    return { ...project, fire }
  })

  const index = useBreakpointIndex()

  return (
    <>
      {index > 0 && (
        <Layout
          description={
            'Monitor of forest fires affecting improved forest management carbon offset projects.'
          }
          title='Fires and forest offsets – CarbonPlan'
          card='https://images.carbonplan.org/social/forest-offsets-fires.png'
          nav={'research'}
          header={false}
          dimmer={false}
          footer={false}
          metadata={false}
        >
          <Desktop
            data={merged}
            locations={locations}
            tiles={tiles}
            showFires={true}
          />
          <Box
            sx={{
              position: ['fixed'],
              right: [13],
              bottom: [17, 17, 15, 15],
              zIndex: 5000,
            }}
          >
            <Dimmer />
          </Box>
        </Layout>
      )}
      {index === 0 && (
        <Box sx={{ display: ['initial', 'none', 'none', 'none'] }}>
          <Layout
            description={
              'Monitor of forest fires affecting improved forest management carbon offset projects.'
            }
            title='Fires and forest offsets – CarbonPlan'
            card='https://images.carbonplan.org/social/forest-offsets-fires.png'
            header={true}
            nav={'research'}
            dimmer={false}
            footer={false}
            metadata={false}
          >
            <Guide />
            <Mobile
              data={merged}
              locations={locations}
              tiles={tiles}
              showFires={true}
            />
          </Layout>
        </Box>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const prefix =
    'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/fires/project_fires'
  try {
    const res = await fetch(`${prefix}/state_now.json?ignoreCache=1`)
    const data = await res.json()

    return {
      props: {
        fireData: data['overlapping_fires'],
        createdAt: data['created_at'],
      },
    }
  } catch {
    return {
      props: { fireData: [] },
    }
  }
}

export default Index
