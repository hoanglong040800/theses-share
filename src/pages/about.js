import Head from "next/head";
import Image from "next/image";
import { makeStyles } from "@material-ui/core";

export default function About() {
  const mui = useStyles();

  return (
    <>
      <Head>
        <title>Về Theses Share</title>
      </Head>

      <div className={mui.about_section}>
        <div className={mui.about_image}>
          <Image
            width={200}
            height={200}
            layout="responsive"
            src="/b_5d09b19471c58.svg"
            alt="thesis image"
          />
        </div>
        <div className={mui.paragraph}>
          <h2 className={mui.heading}>Về Theses Share</h2>
          <p>
            Ứng dụng Theses Share ra đời để sinh viên UIT có thể chia sẻ khóa
            luận của mình cho mọi sinh viên tham khảo. Việc có nhiều nguồn tài
            liệu khóa luận sẽ giúp những đề tài khóa sau càng đa dạng hơn và
            chỉn chu hơn. Ngoài việc chia sẻ, ứng dụng còn chú trọng vào việc
            phân loại tags các đề tài để giúp sinh viên tìm kiếm khóa luận theo
            những chủ đề mình mong muốn một cách dễ dàng hơn.
          </p>
          <h2 className={mui.heading}>Mục tiêu</h2>
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
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  heading: {
    opacity: 0.7,
    fontSize: "2rem",
    fontWeight: "normal",
    paddingTop: 30,
    textAlign: "center",
  },

  about_section: {
    display: "flex",
  },

  about_image: {
    flex: 1,
  },

  paragraph: {
    fontSize: "1rem",
    flex: 1,
  },

  list: {
    listStyleType: "none",
    padding: 0,
  },
});
