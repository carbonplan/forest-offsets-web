import { Box, Container, Link, Text } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { Arrow } from '@carbonplan/icons'
import { default as NextLink } from 'next/link'

const HoverArrow = () => {
  return (
    <Arrow
      id='arrow'
      sx={{
        pointerEvents: 'none',
        display: 'inline-block',
        position: 'absolute',
        left: ['-60px', '-68px', '-80px', '-104px'],
        top: ['32px', '32px', '35px', '50px'],
        opacity: 0,
        transition: 'opacity 0.2s ease-out',
        transform: 'rotate(45deg)',
        width: [36, 36, 48, 56],
        height: [36, 36, 48, 56],
      }}
    />
  )
}

function Menu({ visible }) {
  const link = {
    color: 'text',
    fontSize: [6, 6, 6, 7],
    fontFamily: 'heading',
    letterSpacing: 'heading',
    py: [3, 3, 4, 5],
    borderStyle: 'solid',
    borderColor: 'muted',
    borderWidth: '0px',
    borderBottomWidth: '1px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover > #arrow': {
        opacity: 1,
      },
    },
    '&:hover': {
      color: 'text',
    },
  }

  return (
    <Box
      sx={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        position: 'fixed',
        width: visible
          ? [
              0,
              'calc(4 * 100vw / 8 + 28px - 1px)',
              'calc(4 * 100vw / 12 + 26px - 1px)',
              'min(calc(4 * 100vw / 12 + 36px), 677px)',
            ]
          : [
              0,
              'calc(2 * 100vw / 8 + 18px)',
              'calc(2 * 100vw / 12 + 24px)',
              'min(calc(2 * 100vw / 12 + 36px), 516px)',
            ],
        height: '100%',
        backgroundColor: 'background',
        zIndex: 2000,
        pr: [3, 5, 5, 6],
        pl: [3, 4, 5, 6],
        pt: [4],
        mt: '44px',
        ml: ['-36px', '-36px', '-36px', '-54px'],
        transition: '0.25s',
      }}
    >
      <Row columns={[4]}>
        <Column start={[2]} width={[3]} sx={{ mt: [5] }}>
          <Link
            sx={{
              ...link,
              borderTopWidth: '1px',
            }}
            href='https://carbonplan.org/about'
          >
            <HoverArrow />
            About
          </Link>
          <Link
            sx={{ textDecoration: 'none' }}
            href='https://carbonplan.org/research'
            sx={{
              ...link,
              color: 'secondary',
              '&:hover': {
                color: 'secondary',
              },
            }}
          >
            <HoverArrow />
            Research
          </Link>
          <Link
            sx={{ textDecoration: 'none' }}
            href='https://carbonplan.org/team'
            sx={link}
          >
            <HoverArrow />
            Team
          </Link>
          <Link
            sx={{ textDecoration: 'none' }}
            href='https://carbonplan.org/faq'
            sx={link}
          >
            <HoverArrow />
            FAQ
          </Link>
        </Column>
      </Row>
    </Box>
  )
}

export default Menu
