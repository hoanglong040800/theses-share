import { Box, Container } from '@material-ui/core'
import Footer from 'common/components/footer/Footer'
import Navbar from 'common/components/navbar/Navbar'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box mt={13} mb={10}>
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  )
}
