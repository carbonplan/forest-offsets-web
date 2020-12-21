import { useState } from 'react'
import { Link } from 'theme-ui'
import { Style } from '@carbonplan/components'
import { ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import 'mapbox-gl/dist/mapbox-gl.css'

import theme from '../theme'

const components = {
  a: (props) => <Link target='_blank' {...props} />,
}

const App = ({ Component, pageProps }) => {
  const [session, setSession] = useState({ token: null, username: null })
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
        <Style />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
