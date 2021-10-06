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
        const user = {
          id: 12345,
          name: 'J Smith',
          email: 'jsmith@example.com',
          gender: 'men',
        }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    signIn: async (user, type) => {
      console.log('--- signIn ---', user)

      return user
    },

    jwt: async token => {
      console.log('--- jwt ---', token)
      token.gender ? null : (token.gender = 'male')

      return token
    },

    session: async (session, token) => {
      console.log('--- token ---', token)

      return token
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
