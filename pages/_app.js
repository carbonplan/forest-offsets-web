import React from 'react'
import Script from 'next/script'
import { ThemeProvider } from 'theme-ui'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeProvider theme={theme}>
      {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
        <Script
          strategy='lazyOnload'
          data-domain='carbonplan.org'
          data-api='https://carbonplan.org/proxy/api/event'
          src='https://carbonplan.org/js/script.js'
        />
      )}
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
