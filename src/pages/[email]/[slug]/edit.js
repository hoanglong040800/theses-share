import { Divider } from '@material-ui/core'
import { getNameFromEmail } from 'common/utils/util'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import { fetchThesisBySlug } from 'modules/theses/fetch-theses'
import { getSession } from 'next-auth/client'
import Head from 'next/head'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  // --- handle routing error ----

  // check is [email] match with user
  if (ctx.params.email !== getNameFromEmail(session.user.email))
    return {
      notFound: true,
    }

  const details = await fetchThesisBySlug(process.env.API_URL, ctx.params.slug)

  if (!details)
    return {
      notFound: true,
    }
  // check is thesis belong to user
  else if (session.user.id !== details.user.id)
    return {
      notFound: true,
    }

  const tagsOptions = await fetchAllTags(process.env.API_URL)
  const facultiesOptions = await fetchAllFaculties(process.env.API_URL)

  if (!facultiesOptions || !tagsOptions)
    return {
      notFound: true,
    }

  return {
    props: { session, details, facultiesOptions, tagsOptions },
  }
}

export default function EditThesis({
  session,
  details,
  facultiesOptions,
  tagsOptions,
}) {
  return (
    <>
      <Head>
        <title>Chỉnh sửa luận văn</title>
      </Head>

      <h1>Chỉnh sửa luận văn</h1>

      <h2>Session</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <Divider />

      <h2>Details</h2>
      <pre>{JSON.stringify(details, null, 2)}</pre>

      <Divider />

      <h2>Faculties</h2>
      <pre>{JSON.stringify(facultiesOptions, null, 2)}</pre>

      <Divider />

      <h2>Tags</h2>
      <pre>{JSON.stringify(tagsOptions, null, 2)}</pre>
    </>
  )
}

EditThesis.auth = true
