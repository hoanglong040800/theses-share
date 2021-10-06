import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function About() {
  const [session, loading] = useSession()

  return (
    <>
      <Head>
        <title>Về Theses Share</title>
      </Head>

      <h1>Về Theses Share</h1>

      {!session && (
        <>
          <h3>You are not signed in</h3>
          <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}

      {session && (
        <>
          <h3>Signed in as {session.name} </h3>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  )
}
