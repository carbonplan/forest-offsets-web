import { Box, Grid, Link } from 'theme-ui'
import { Row, Column, Button } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import { format } from 'd3-format'
import Bar from './bar'
import Info from '../info'

const Metrics = ({ data, setZoomTo, showFires }) => {
  const {
    id,
    fire,
    arbocs,
    carbon,
    acreage,
    over_crediting,
    shape_centroid,
  } = data

  const checkIssuance = (d) => {
    return (
      Math.round(d.issuance) == Math.round(d.reported) &&
      Math.round(d.calculated) == Math.round(d.reported)
    )
  }

  const FireName = ({ i, d }) => {
    if (d.href) {
      return (
        <Link
          key={i}
          onClick={(e) => e.stopPropagation()}
          href={d.href}
          sx={{ textDecoration: 'none' }}
        >
          <Button
            size='xs'
            sx={{
              mb: [1],
              fontFamily: 'faux',
              letterSpacing: 'faux',
              color: 'red',
            }}
            suffix={<RotatingArrow />}
          >
            {d.name}
          </Button>
        </Link>
      )
    } else {
      return (
        <Box
          key={i}
          sx={{
            mb: [1],
            fontFamily: 'faux',
            letterSpacing: 'faux',
            color: 'red',
          }}
        >
          {' '}
          {d.name}{' '}
        </Box>
      )
    }
  }

  const onClick = (e) => {
    e.stopPropagation()
    setZoomTo(id)
  }

  const RowBar = ({
    label,
    value,
    scale,
    color = showFires ? 'primary' : 'green',
    display,
    units,
  }) => {
    return (
      <Row columns={[6, 4, 4, 4]} sx={{ mb: [1] }}>
        <Column start={[1]} width={[1]}>
          <Box
            sx={{
              fontSize: [2, 2, 2, 3],
              color: color,
              fontFamily: 'mono',
              letterSpacing: 'mono',
              display: 'inline-block',
            }}
          >
            {display}
          </Box>
        </Column>
        <Column
          start={[2, 2, 2, 2]}
          width={[1]}
          dl={1}
          sx={{ pl: [4, 0, 0, 0] }}
        >
          <Bar scale={scale} color={color} value={value} />
        </Column>
        <Column start={[3, 3, 3, 3]} width={[4, 2, 2, 2]}>
          <Box
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              fontSize: [2, 2, 2, 3],
            }}
          >
            {label}
            <Box
              as='span'
              sx={{
                fontFamily: 'faux',
                letterSpacing: 'faux',
                fontSize: [0, 0, 0, 1],
                color: 'secondary',
                ml: [2],
              }}
            >
              {units}
            </Box>
          </Box>
        </Column>
      </Row>
    )
  }

  const positive = over_crediting ? over_crediting.percent[1] > 0 : null

  return (
    <Box>
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderTopWidth: '1px',
          borderColor: 'muted',
          pt: [4],
          pb: [4],
          mt: [4],
          mb: [1],
        }}
      >
        {showFires && fire && (
          <>
            <Box
              sx={{
                color: 'red',
                fontFamily: 'mono',
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                fontSize: [1, 1, 1, 2],
                mt: [0],
                mb: [2],
              }}
            >
              Fire status
              <Info>
                We are tracking occurances of fires overlapping offset projects.
                Area burned refers to the fraction of fire area overlapping
                offset project area, including all fires thus far in 2021,
                updated nightly. We also list names with links for all fires.
              </Info>
            </Box>
            <RowBar
              label={
                <Box as='span' sx={{ color: 'red' }}>
                  Area burned
                </Box>
              }
              scale={{ min: 0, max: 0.5 }}
              value={fire.burnedFraction}
              color={'red'}
              display={
                Math.round(fire.burnedFraction * 100) < 1
                  ? '<1%'
                  : format('.0%')(fire.burnedFraction)
              }
              units={'%'}
            />
            <Row columns={[6, 4, 4, 4]} sx={{ mb: [1], mt: [2] }}>
              <Column
                start={[1]}
                width={[2]}
                sx={{
                  color: 'red',
                  fontFamily: 'faux',
                  letterSpacing: 'faux',
                  fontSize: [2, 2, 2, 3],
                }}
              >
                Overlapping fires
              </Column>
              <Column start={[3]} width={[4, 2, 2, 2]}>
                <Box
                  sx={{
                    fontFamily: 'faux',
                    letterSpacing: 'faux',
                    fontSize: [2, 2, 2, 3],
                    color: 'red',
                    textAlign: 'left',
                    mt: ['3px'],
                  }}
                >
                  {fire.overlappingFires.map((d, i) => (
                    <FireName key={i} d={d} i={i} />
                  ))}
                </Box>
              </Column>
            </Row>
          </>
        )}
        <Box
          sx={{
            color: showFires ? 'primary' : 'green',
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            fontSize: [1, 1, 1, 2],
            mt: [3],
            mb: [2],
          }}
        >
          Project metrics
          <Info>
            Primary metrics for forest offset projects include the initial
            carbon stock ("Carbon"), a coarse regional average against which
            that carbon is compared ("Common practice"), the size of the project
            ("Acreage"), and the total number of credits awarded to the project
            ("Credits"). Each credit represents 1 tCO₂.
          </Info>
        </Box>
        <RowBar
          label='Carbon'
          scale={{ min: 0, max: 200 }}
          value={carbon.initial_carbon_stock.value}
          display={format('.0f')(carbon.initial_carbon_stock.value)}
          units={'tCO₂/ac'}
        />
        <RowBar
          label='Common practice'
          scale={{ min: 0, max: 200 }}
          value={carbon.common_practice.value}
          display={format('.0f')(carbon.common_practice.value)}
          units={'tCO₂/ac'}
        />
        <RowBar
          label='Acreage'
          scale={{ min: 0, max: 300000 }}
          value={acreage}
          display={format('.2s')(acreage)}
          units={'ac'}
        />
        <RowBar
          label='Credits'
          scale={{ min: 0, max: 2000000 }}
          value={arbocs.issuance}
          display={format('.2s')(arbocs.issuance)}
          units={'tCO₂'}
        />
        {!over_crediting && (
          <Box
            sx={{
              color: 'secondary',
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
              fontSize: [1, 1, 1, 2],
              mt: [4],
              mb: [2],
            }}
          >
            Crediting error not available
            <Info>
              We were only able to assess crediting error when sufficient
              project data and/or underlying FIA inventory data was available to
              implement our analysis.
            </Info>
          </Box>
        )}
        {over_crediting && (
          <div>
            <Box
              sx={{
                color: showFires ? 'primary' : 'green',
                fontFamily: 'mono',
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                fontSize: [1, 1, 1, 2],
                mt: [4],
                mb: [2],
              }}
            >
              Crediting error
              <Info>
                For each project we construct an alternative definition of
                common practice (*) that accounts for the tree species
                composition of each project, and thus better reflects the local
                ecology. We then ask how many credits the project would have
                received assuming that alternative. The result is either
                "Over-crediting" or "Under-crediting" depending on the outcome,
                which we express in terms of total credits and as a percentage
                of the credits originally awarded to the project.
              </Info>
            </Box>
            <RowBar
              label={'Common practice\u00A0*'}
              scale={{ min: 0, max: 200 }}
              value={over_crediting.alt_slag[1]}
              display={
                positive
                  ? format('.0f')(over_crediting.alt_slag[1])
                  : '\u00A0' + format('.0f')(over_crediting.alt_slag[1])
              }
              units={'tCO₂'}
            />
            <RowBar
              label={positive ? 'Over-crediting' : 'Under-crediting'}
              scale={{ min: 0, max: 2000000 }}
              value={Math.abs(over_crediting.arbocs[1])}
              color={positive ? (showFires ? 'primary' : 'green') : 'secondary'}
              display={
                positive
                  ? format('.2s')(over_crediting.arbocs[1])
                  : '-' + format('.2s')(Math.abs(over_crediting.arbocs[1]))
              }
              units={'tCO₂'}
            />
            <RowBar
              label={positive ? 'Over-crediting' : 'Under-crediting'}
              scale={{ min: 0, max: 1 }}
              value={Math.abs(over_crediting.percent[1])}
              color={positive ? (showFires ? 'primary' : 'green') : 'secondary'}
              display={
                positive
                  ? format('.0%')(over_crediting.percent[1])
                  : '-' + format('.0%')(Math.abs(over_crediting.percent[1]))
              }
              units={'%'}
            />
          </div>
        )}
      </Box>
      <Box sx={{ mt: [3], mb: [1, 0, 0, 0], color: 'secondary' }}>
        <Button
          inverted
          onClick={onClick}
          size='xs'
          color='secondary'
          fill='secondary'
          suffix={<RotatingArrow />}
        >
          Show project on map
        </Button>
      </Box>
    </Box>
  )
}

export default Metrics
