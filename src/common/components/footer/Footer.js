import { makeStyles, Typography } from '@material-ui/core'

export default function Footer() {
  const classes = useStyle()

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Sẽ có nội dung gì đó ở đây, còn bây giờ thì chưa biết
      </Typography>
      <Typography variant="subtitle2" align="center" color="textSecondary">
        Định cho footer dài hết màn hình nhưng hình như bị vướng margin mặc định
        của body, không biết chỉnh ở đâu
      </Typography>
    </footer>
  )
}

const useStyle = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.light,
    padding: '3.25rem 1.5rem',
  },
}))
