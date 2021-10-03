import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";

export default function Footer() {
  const classes = useStyle();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className={classes.footerHead}
        >
          Theses Share
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={9} className={classes.info}>
            <Typography variant="subtitle2">
              <div>Địa chỉ: 503B Minh Phụng, Phường 9, Quận 11, TP.HCM</div>
              <div>SĐT: (+84) 9633623</div>
              <div>Email: 18520093@gm.uit.edu.vn</div>
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.nav}>
            <Typography variant="subtitle1" align="right">
              <div>
                <span className={classes.link}>
                  <Link href="/">Trang chủ</Link>
                </span>
              </div>
              <div>
                <span className={classes.link}>
                  <Link href="/about">Về chúng tôi</Link>
                </span>
              </div>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" align="center">
          Copyright &copy; 2021 Theses Share
        </Typography>
      </Container>
    </footer>
  );
}

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ddd",
    padding: "1.5rem 0 0.5rem",
  },

  container: {
    borderLeft: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    margin: "1rem 0",
    padding: "0 1rem",
  },

  footerHead: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
    },
  },

  nav: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));
