import { makeStyles, MenuItem } from '@material-ui/core'

export default function SearchSuggestedItem() {
  const mui = useStyles()

  return (
    <MenuItem className={mui.item}>
      <p>Search Suggested Item</p>
    </MenuItem>
  )
}

const useStyles = makeStyles(theme => ({
  item: {
    padding: '0',
  },
}))
