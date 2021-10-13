import {
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
import { getNameFromEmail } from 'common/utils/util'

export default function NavProfile() {
  const router = useRouter()
  const [session, loading] = useSession()
  const mui = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  function handleOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleSelect(route) {
    router.push(route)
    handleClose()
  }

  function handleSignout() {
    /settings|new/.test(router.pathname)
      ? signOut({ callbackUrl: '/' })
      : signOut({ redirect: false })

    handleClose()
  }

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <AccountCircle fontSize="large" className={mui.icon} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {session.user.full_name && (
          <MenuItem>
            <p className={mui.full_name}>{session.user.full_name}</p>
          </MenuItem>
        )}

        <MenuItem
          onClick={() =>
            handleSelect(`/${getNameFromEmail(session.user.email)}`)
          }
        >
          Hồ sơ
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleSelect(
              `/${getNameFromEmail(session.user.email)}?tab=bookmark`
            )
          }
        >
          Yêu thích
        </MenuItem>

        <MenuItem onClick={() => handleSelect('/settings')}>Cài đặt</MenuItem>

        <Divider variant="middle" />

        <MenuItem onClick={handleSignout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: [theme.palette.primary.main],
  },

  full_name: {
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
}))
