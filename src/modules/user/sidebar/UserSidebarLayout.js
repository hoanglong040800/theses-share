import { Box, Grid, Button, Slide } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { toggleUserSidebar } from '../slice/userPagesSlice'
import UserSidebarContent from './UserSidebarContent'

export default function UserSidebarLayout({ children }) {
  const showSidebar = useSelector(state => state.userPages.showSidebar)
  const dispatch = useDispatch()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Slide direction="right" in={showSidebar} mountOnEnter unmountOnExit>
          <Box display={showSidebar ? 'display' : 'none'}>
            <UserSidebarContent />
          </Box>
        </Slide>
      </Grid>

      <Grid item xs={12} sm={showSidebar ? 9 : 12}>
        <Button size="small" onClick={() => dispatch(toggleUserSidebar())}>
          {
            //
            showSidebar ? (
              <>
                <ArrowLeft fontSize="large" />
                Close
              </>
            ) : (
              <>
                <ArrowRight fontSize="large" />
                Open
              </>
            )
          }
        </Button>

        {children}
      </Grid>
    </Grid>
  )
}
