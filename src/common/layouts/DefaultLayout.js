import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Footer from "common/components/footer/Footer";
import Navbar from "common/components/navbar/Navbar";

export default function DefaultLayout({ children }) {
  const classes = useStyle();

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Container maxWidth="xl" className={classes.content}>
          <Box mt={13} mb={10}>
            {children}
          </Box>
        </Container>
        <Footer />
      </div>
    </>
  );
}

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  content: {
    flexGrow: 1,
  },
}));
