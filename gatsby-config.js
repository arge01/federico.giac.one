require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Federico Giacone',
    siteUrl: 'https://federico.giac.one'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'federicogiaconeportfolio',
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => doc => {
          let rootLang = '/'
          if (doc.lang === 'en-gb') {
            rootLang = '/en/'
          }

          switch (doc.type) {
            case 'home':
              return `${rootLang}`
            case 'portfolio':
              return `${rootLang}portfolio/${doc.uid}/`
            default:
              return `${rootLang}${doc.uid}/`
          }
        },
        htmlSerializer: ({ node, key, value }) => (type, element, content, children) => {
          switch (element.type) {
            case 'strong':
              return `<strong class='font-sans-bold text-grey-darkest'>${children.join('')}</strong>`

            case 'em':
              return `<em class='font-sans-italic'>${children.join('')}</em>`

            case 'hyperlink':
              const target = element.data.target ? `target="${element.data.target}" rel="noopener"` : ''
              const linkUrl = element.data.url
              return `<a class='text-grey-darkest underline' ${target} href="${linkUrl}">${children.join('')}</a>`
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap_index.xml',
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-MQ9S4XK',
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Federico Giacone`,
        short_name: `Federico Giacone`,
        start_url: `/?utm_source=webapp`,
        background_color: `#f5f5f5`,
        theme_color: `#161616`,
        display: `fullscreen`,
        icon: `static/icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline'
  ],
}
