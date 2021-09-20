import { Box, Container } from '@material-ui/core'
import Navbar from 'common/components/navbar/Navbar'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box my={5}>{children}</Box>
      </Container>
    </>
  )
}
