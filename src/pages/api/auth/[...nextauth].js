import fetchSignin from 'modules/auth/fetch-auth'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  theme: {
    colorScheme: 'light',
    brandColor: '#455a64',
    logo: '/logo.png',
  },

  session: {
    jwt: true,
  },

  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
  },

  providers: [
    Providers.Credentials({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const user = await fetchSignin(process.env.API_URL, credentials)
        console.log('-- authorize/user --', user)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async data => {
      console.log('--- jwt/data ---', data)

      return Promise.resolve(data)
    },

    session: async (session, token) => {
      console.log('--- session/token ---', token)

      return Promise.resolve(token)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
