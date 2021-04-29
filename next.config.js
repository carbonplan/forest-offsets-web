const isDev = process.env.NODE_ENV === 'development'

const slug = require('rehype-slug')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [slug],
  },
})

module.exports = withMDX({
  pageExtensions: ['jsx', 'js', 'md', 'mdx'],
  assetPrefix: isDev
    ? ''
    : 'https://wonderful-river-0932dae1e.azurestaticapps.net',
})
