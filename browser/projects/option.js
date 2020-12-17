import { Badge } from 'theme-ui'
import { alpha } from '@theme-ui/color'

const Option = ({ value, display, toggle, color, disabled }) => {
  return (
    <Badge
      variant='primary'
      onClick={toggle}
      sx={{
        mr: [3],
        color: value & !disabled ? color : alpha(color, 0.2),
        borderColor: value & !disabled ? color : alpha(color, 0.2),
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {display}
    </Badge>
  )
}

export default Option
