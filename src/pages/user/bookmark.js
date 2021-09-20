import UserSidebarLayout from 'modules/user/sidebar/UserSidebarLayout'
import { changeUserPage } from 'modules/user/slice/userPagesSlice'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function UserBookmark() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeUserPage('bookmark'))
  })

  return (
    <>
      <Head>
        <title>Luận văn yêu thích</title>
      </Head>

      <UserSidebarLayout>
        <h1>Luận văn yêu thích</h1>
      </UserSidebarLayout>
    </>
  )
}
