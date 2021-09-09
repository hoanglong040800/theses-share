import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NavSearchBar() {
  const mui = useStyles()
  const router = useRouter()
  const [style, setStyle] = useState({
    display: 'none',
  })

  const [stateValue, setStateValue] = useState('')

  function handleChange(value) {
    setStateValue(value)

    if (value) {
      setStyle({ display: 'block' })
    } else {
      setStyle({ display: 'none' })
    }
  }

  function handleSearch(value) {
    if (value) {
      router.push(`/search?q=${value}`)
      setStyle({ display: 'none' })
      setStateValue('')
    }
  }

  return (
    <div className={mui.root}>
      <SearchBar
        value={stateValue}
        placeholder="Tìm tag hoặc tên đề tài"
        onChange={handleChange}
        onRequestSearch={handleSearch}
        className={mui.searchbar}
      />

      <Box className={mui.suggestion} {...style}>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <CircularProgress variant="indeterminate" size={30} />
        </Box>

        <Button
          size="small"
          fullWidth
          style={{ borderTop: '0.5px solid rgba(0,0,0,0.1)' }}
          onClick={handleSearch}
        >
          Xem tất cả
        </Button>
      </Box>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    margin: '0 15px',
  },

  searchbar: {
    width: '100%',
    maxWidth: 350,
    padding: 0,
    height: 35,

    '& input': {
      fontSize: '0.9rem',
    },
  },

  suggestion: {
    position: 'absolute',
    top: 35,
    maxWidth: 350,
    width: '100%',
    borderRadius: 5,
    boxShadow: '1px 1px 2px 0 rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
}))
