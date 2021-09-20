import UserSidebarLayout from 'modules/user/sidebar/UserSidebarLayout'
import { changeUserPage } from 'modules/user/slice/userPagesSlice'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function UserTheses() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeUserPage('theses'))
  })

  return (
    <>
      <Head>
        <title>Luận văn của tôi</title>
      </Head>

      <UserSidebarLayout>
        <h1>Luận văn của tôi</h1>
      </UserSidebarLayout>
    </>
  )
}
