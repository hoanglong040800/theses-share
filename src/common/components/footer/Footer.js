import { makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";

export default function Footer() {
  const classes = useStyle();

  return (
    <footer className={classes.footer}>
      <Typography variant="h5" align="center" className={classes.footerHead}>
        Theses Share
      </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        Copyright &copy; 2021 Theses Share
      </Typography>
      <Typography variant="subtitle1" align="center">
        <span className={classes.link}>
          <Link href="/">Trang chủ</Link>
        </span>
        <span className={classes.linkSpacing}>|</span>
        <span className={classes.link}>
          <Link href="/about">Về chúng tôi</Link>
        </span>
        <span className={classes.linkSpacing}>|</span>
        <span className={classes.link}>
          <Link href="#">Liên hệ</Link>
        </span>
      </Typography>
    </footer>
  );
}

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ddd",
    padding: "3rem 0",
  },

  bottomNav: {
    fontWeight: "bold",
    textDecoration: "underline",
  },

  link: {
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "underline",
    },
  },

  linkSpacing: {
    padding: "0 0.8rem",
  },

  footerHead: {
    color: "white",
    fontWeight: "bold",
  },
}));
