import { Container } from '@material-ui/core'
import Navbar from 'common/components/navbar/Navbar'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">{children}</Container>
    </>
  )
}
