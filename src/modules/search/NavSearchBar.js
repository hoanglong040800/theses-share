import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchSuggestedItem from './SearchSuggestedItem'

export default function NavSearchBar() {
  const mui = useStyles()
  const router = useRouter()

  const [stateValue, setStateValue] = useState('')

  function handleChange(value) {
    setStateValue(value)
  }

  function handleSearch() {
    if (stateValue) {
      router.push({
        pathname: '/search',
        query: { q: stateValue.trim() },
      })
      setStateValue('')
    }
  }

  return (
    <div className={mui.root}>
      <SearchBar
        value={stateValue}
        placeholder="Tìm tên đề tài"
        onCancelSearch={handleChange}
        onChange={handleChange}
        onRequestSearch={handleSearch}
        className={mui.searchbar}
      />

      {
        //
        stateValue && (
          <Box className={mui.suggestion}>
            {/* <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <CircularProgress variant="indeterminate" size={30} />
            </Box> */}

            <SearchSuggestedItem />

            <Button
              size="small"
              fullWidth
              className={mui.watchall}
              onClick={handleSearch}
            >
              Xem tất cả
            </Button>
          </Box>
        )
      }
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

  watchall: {
    borderTop: '0.5px solid rgba(0,0,0,0.1)',
  },
}))
