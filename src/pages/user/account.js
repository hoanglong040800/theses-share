import UserSidebarLayout from 'modules/user/sidebar/UserSidebarLayout'
import { changeUserPage } from 'modules/user/slice/userPagesSlice'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function UserAccount() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeUserPage('account'))
  })

  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>

      <UserSidebarLayout>
        <h1>Tài khoản</h1>
      </UserSidebarLayout>
    </>
  )
}
