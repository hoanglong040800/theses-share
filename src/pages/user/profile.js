import UserSidebarLayout from 'modules/user/sidebar/UserSidebarLayout'
import { changeUserPage } from 'modules/user/slice/userPagesSlice'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function UserProfile() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeUserPage('profile'))
  })

  return (
    <>
      <Head>
        <title>Hồ sơ</title>
      </Head>

      <UserSidebarLayout>
        <h1>Hồ sơ của tôi</h1>
      </UserSidebarLayout>
    </>
  )
}
