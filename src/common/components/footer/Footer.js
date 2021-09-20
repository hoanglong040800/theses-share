import { Typography } from "@material-ui/core";
import useStyle from "./style";

export default function Footer() {
  const classes = useStyle();

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
  );
}
