import { Box, Text } from 'theme-ui'

const Radio = ({ value, label, color, current, set }) => {
  const handleClick = () => {
    set(value)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        width: '250px',
        '&:hover > #box > #circle1': {
          opacity: 1,
        },
        '&:hover > #box > #circle2': {
          opacity: 1,
        },
        '&:hover > #text': {
          opacity: 1,
        },
      }}
    >
      <Box
        id='box'
        sx={{
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'middle',
          width: '22px',
          height: '22px',
          my: [1],
        }}
      >
        <Box
          id='circle1'
          sx={{
            position: 'absolute',
            bg: color,
            width: '22px',
            height: '22px',
            borderRadius: '11px',
            opacity: value == current ? 1 : 0.3,
            transition: '0.2s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bg: 'background',
            left: '2px',
            top: '2px',
            width: '18px',
            height: '18px',
            borderRadius: '9px',
            opacity: 1,
            transition: '0.2s',
          }}
        />
        <Box
          id='circle2'
          sx={{
            position: 'absolute',
            bg: color,
            left: '6px',
            top: '6px',
            width: '10px',
            height: '10px',
            borderRadius: '5px',
            opacity: value == current ? 1 : 0.3,
            transition: '0.2s',
          }}
        />
      </Box>
      <Text
        id='text'
        sx={{
          display: 'inline-block',
          ml: [3],
          opacity: value == current ? 1 : 0.3,
          transition: '0.2s',
        }}
      >
        {label}
      </Text>
    </Box>
  )
}

export default Radio
