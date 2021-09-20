import { Paper, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function UserSidebarContent() {
  const mui = useStyles()
  const router = useRouter()
  const userPages = useSelector(state => state.userPages.pages)

  return (
    <Paper variant="outlined">
      {userPages.map((item, index) => {
        return (
          <div
            key={index}
            name={item.name}
            className={`${mui.item} ${item.active ? mui.active : ''}`}
            onClick={() => router.push(item.link)}
          >
            <div>{item.display}</div>
          </div>
        )
      })}
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  item: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#989898',
    borderBottom: '1px solid lightgray',
    cursor: 'pointer',

    '&:hover': {
      background: '#f9f9f9',
    },
  },

  active: {
    color: theme.palette.primary.main,
    borderLeft: `10px solid ${theme.palette.primary.main}`,
    transition: '0.2s',
    background: 'rgba(0, 0, 0, 0.01)',
  },
}))
