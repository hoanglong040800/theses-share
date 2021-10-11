import { tokenData } from 'common/utils/constants'
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

  // only true in development
  debug: true,

  providers: [
    Providers.Credentials({
      name: 'Theses Share',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // const user = await fetchSignin(process.env.API_URL, credentials)
        const user = {
          id: 1,
          full_name: 'Tran Hoang Long',
          gender: 'male',
          email: '18520093@gm.uit.edu.vn',
        }
        // console.log('-- authorize --', { credentials, user })

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async (token, user) => {
      // console.log('-- jwt --', { token, user })

      // assign user (return from authorize) -> token
      // user obj will available only 1st time jwt callback is called
      // from the 2nd time, user will be undefined
      if (user) {
        tokenData.map(item => (token[item] = user[item]))
      }

      return Promise.resolve(token)
    },

    session: async (session, token) => {
      // console.log('-- session --', { session, token })

      // assign token data to session
      // beacause session reset everytime useSession() is called
      tokenData.map(item => (session.user[item] = token[item]))

      return Promise.resolve(session)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
