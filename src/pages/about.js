import Head from "next/head";
import Image from "next/image";
import { Grid, makeStyles } from "@material-ui/core";

export default function About() {
  const mui = useStyles();

  return (
    <>
      <Head>
        <title>Về Theses Share</title>
      </Head>

      <Grid container>
        <Grid item xs={12} lg={6} className={mui.image}>
          <Image
            width={200}
            height={200}
            layout="responsive"
            src="/b_5d09b19471c58.svg"
            alt="thesis image"
          />
        </Grid>
        <Grid item xs={12} lg={6} className={mui.text_section}>
          <h2 className={mui.heading}>Về Theses Share</h2>
          <p className={mui.paragraph}>
            Ứng dụng Theses Share ra đời để sinh viên UIT có thể chia sẻ khóa
            luận của mình cho mọi sinh viên tham khảo. Việc có nhiều nguồn tài
            liệu khóa luận sẽ giúp những đề tài khóa sau càng đa dạng hơn và
            chỉn chu hơn. Ngoài việc chia sẻ, ứng dụng còn chú trọng vào việc
            phân loại tags các đề tài để giúp sinh viên tìm kiếm khóa luận theo
            những chủ đề mình mong muốn một cách dễ dàng hơn.
          </p>
          <br />
          <hr className={mui.line_break} />
          <br />
          <h2 className={mui.heading}>Vì sao chọn Theses Share?</h2>
          <ul className={mui.list}>
            <li>
              Cho phép sinh viên xem đầy đủ báo cáo khóa luận dạng PDF cùng với
              những thông tin miêu tả
            </li>
            <li>
              Cung cấp bộ tìm kiếm nâng cao giúp sinh viên tìm được những chủ đề
              mình hướng đến
            </li>
            <li>
              Cung cấp các chức năng đăng ký, đăng nhập, đăng tải luận văn dạng
              PDF đi kèm với thông tin, mô tả, ...
            </li>
            <li>
              Chức năng yêu thích để sinh viên có thể lưu lại những luận văn để
              tiện hơn cho những lần đọc sau
            </li>
            <li>
              Giao diện đơn giản, trực quan, tương thích với nhiều kích cỡ màn
              hình
            </li>
            <li>
              Tốc độ load trang web nhanh và mọi thao tác đều nằm trên 1 trang,
              tăng cao trải nghiệm người dùng
            </li>
          </ul>
        </Grid>

        <Grid item xs={12}>
          <br />
          <hr className={mui.line_break} />
          <br />
          <h2 className={mui.heading}>Các thành viên</h2>
          <Grid container className={mui.team_container}>
            <Grid item xs={12} sm={6} lg={3} className={mui.member}>
              <a
                href="https://github.com/nhoxlove2k15"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  width={100}
                  height={100}
                  layout="responsive"
                  src="/duy.png"
                  alt="duy"
                  className={mui.team_image}
                />
                <p>Đôn Khánh Duy</p>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={mui.member}>
              <a
                href="https://github.com/anhnguyen515"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  width={100}
                  height={100}
                  layout="responsive"
                  src="/anh.jpg"
                  alt="anh"
                  className={mui.team_image}
                />
                <p>Nguyễn Đình Tuấn Anh</p>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "2rem",
    fontWeight: "normal",
    opacity: 0.8,
    textAlign: "center",
  },

  text_section: {
    fontSize: "1.2rem",
  },

  paragraph: {
    lineHeight: 1.6,
    opacity: 0.8,
  },

  list: {
    listStyleType: "square",
    paddingLeft: 20,
    opacity: 0.8,
    "& li": {
      marginTop: 10,
    },
  },

  team_container: {
    "& *": {
      textAlign: "center",
    },
  },

  member: {
    padding: 50,
    "& p": {
      fontSize: "1.2rem",
    },
  },

  team_image: {
    paddingBottom: 10,
    borderRadius: "50%",
  },

  line_break: {
    opacity: 0.3,
    width: "75%",
  },

  [theme.breakpoints.down("md")]: {
    image: {
      display: "none",
    },
  },
}));
