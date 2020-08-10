require('./config');

module.exports = {
  mode: 'universal',
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    timing: false
  },
  /*
   * Headers of the page
   */
  head: {
    title: 'NFT Snapshot dapp',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        name: 'keywords',
        content: 'erc721, ethereum, blockchain, cryptoart'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'NFT Snapshot'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'NFT Snapshot'
      },
      {
        hid: 'subject',
        name: 'subject',
        content: 'NFT Snapshot'
      },
      {
        name: 'robots',
        content: 'index,follow'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'NFT Snapshot'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'NFT Snapshot'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'http://example.com'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'NFT Snapshot'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'NFT Snapshot'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'NFT Snapshot'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles.scss',
    '~/assets/main.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/vue-moment.js',
    '~/plugins/powergateService.client.js',
    '~/plugins/web3ethers.client.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module', // FIXME add back when solid build
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module' // FIXME add back when solid build
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.org/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://firebase.nuxtjs.org/guide/getting-started/#full-configuration
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      "apiKey": "AIzaSyDa8-zk5NUozmEQTU5ZX-DJtEkNPX96jlQ",
      "authDomain": "nftsnapshotbot.firebaseapp.com",
      "databaseURL": "https://nftsnapshotbot.firebaseio.com",
      "projectId": "nftsnapshotbot"
    },
    services: {
      auth: true,
      firestore: true,
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      '@filecoin-shipyard/lotus-client-rpc',
      '@filecoin-shipyard/lotus-client-provider-browser',
      '@filecoin-shipyard/lotus-client-schema'
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
};
