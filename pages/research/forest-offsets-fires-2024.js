import { useBreakpointIndex } from '@theme-ui/match-media'
import { Box } from 'theme-ui'
import { Layout, Guide, Dimmer } from '@carbonplan/components'
import Desktop from '../../components/desktop'
import Mobile from '../../components/mobile'
import projects from '../../data/projects-crediting'

const Index = ({ fireMetadata, fireProjects }) => {
  const { fires } = fireMetadata
  const { projects: projectsWithFires } = fireProjects

  const uniqueOverlapping = [
    ...new Set(
      Object.keys(projectsWithFires)
        .map((d) => projectsWithFires[d].overlapping_fires)
        .flat()
    ),
  ]

  const projectLocations = {
    type: 'FeatureCollection',
    features: projects.map((d) => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
          fire: projectsWithFires[d.id],
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
    features: Object.keys(fires)
      .filter((d) => uniqueOverlapping.includes(d))
      .map((d) => {
        return {
          type: 'Feature',
          properties: {
            id: d,
            name: fires[d] ? fires[d].name : null,
          },
          geometry: {
            type: 'Point',
            coordinates: [fires[d].centroid[0], fires[d].centroid[1]],
          },
        }
      }),
  }

  const locations = { fires: fireLocations, projects: projectLocations }

  const merged = projects.map((d) => {
    const el = projectsWithFires[d.id]
    if (el && Object.keys(fires).length > 0) {
      d.fire = {
        overlappingFires: el.overlapping_fires.map((id) => {
          if (fires[id]) return { name: fires[id].name, href: fires[id].url }
        }),
        burnedFraction: el.burned_frac,
        lastUpdated: fireMetadata.created_datetime,
      }
    }
    return d
  })

  const index = useBreakpointIndex()

  const tiles = {
    projects: `https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/archive/2024/tiles/projects/{z}/{x}/{y}.pbf`,
    fires: `https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/archive/2024/tiles/fires/{z}/{x}/{y}.pbf`,
  }

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
            data={projects}
            locations={locations}
            tiles={tiles}
            showFires={true}
            archive={2024}
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
              data={projects}
              locations={locations}
              tiles={tiles}
              showFires={true}
              archive={2024}
            />
          </Layout>
        </Box>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const prefix =
    'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/web/archive/2024'
  try {
    const res = await fetch(`${prefix}/project_fire_metadata.json`)
    const data = await res.json()
    const fireMetadata = data.fire_meta
    const fireProjects = data.projects_with_fires

    return { props: { fireMetadata, fireProjects } }
  } catch {
    return {
      props: { fireMetadata: { fires: {} }, fireProjects: { projects: {} } },
    }
  }
}

export default Index
