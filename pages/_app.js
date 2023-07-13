import { ThemeProvider } from 'theme-ui'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
