import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NavProfile() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  function handleOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleSelect(route) {
    router.push(route)
  }

  function handleLogout() {
    handleClose()
  }

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <AccountCircle fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleSelect('/user/like')}>
          Luận văn yêu thích
        </MenuItem>

        <MenuItem onClick={() => handleSelect('/user/theses')}>
          Luận văn của tôi
        </MenuItem>

        <MenuItem onClick={() => handleSelect('/user/profile')}>Hồ sơ</MenuItem>

        <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
      </Menu>
    </>
  )
}
