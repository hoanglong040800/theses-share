import { Box, makeStyles } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { useState } from 'react'

export default function NavSearchBar() {
  const mui = useStyles()

  function handleChange(value) {}

  return (
    <>
      <SearchBar
        placeholder="Tìm tag hoặc tên đề tài"
        onChange={handleChange}
        onRequestSearch={() => console.log('onRequestSearch')}
        className={mui.searchbar}
      />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  searchbar: {
    width: '100%',
    maxWidth: 350,
    padding: 0,
    height: 35,

    '& input': {
      fontSize: '0.9rem',
    },
  },
}))
