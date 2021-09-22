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

export default function NavProfile() {
  const router = useRouter()
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

  function handleLogout() {
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
        <MenuItem onClick={() => handleSelect(`/18520093`)}>
          Hồ sơ
        </MenuItem>

        <MenuItem onClick={() => handleSelect(`/18520093?tab=bookmark`)}>
          Yêu thích
        </MenuItem>

        <MenuItem onClick={() => handleSelect('/settings')}>Cài đặt</MenuItem>

        <Divider variant="middle" />

        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: [theme.palette.primary.main],
  },
}))
