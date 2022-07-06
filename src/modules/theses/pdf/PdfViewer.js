import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Loading from "common/components/loading/Loading";
import { useRef } from "react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({
  file = "https://res.cloudinary.com/thesesshare/image/upload/v1632826157/theses_storage/v4zbvmnprqe3ywrdm9iy.pdf",
  isList = true,
}) {
  const mui = useStyles();
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const pdfPage = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleChangePage(payload) {
    // const nextPage = page + payload;

    // if (nextPage < 1 || nextPage > numPages) {
    //   return;
    // }

    setPage(page + payload);
    window.scrollTo({
      top: pdfPage.current.offsetTop,
      behavior: "smooth",
    });
  }

  function handleKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        handleChangePage(-1);
        break;

      case 39:
        handleChangePage(1);
        break;

      default:
        break;
    }
  }

  const errorComponent = (
    <Box display="flex" justifyContent="center" py={15}>
      <Alert severity="error">
        <AlertTitle>Lỗi</AlertTitle>
        Tải tài liệu thất bại
      </Alert>
    </Box>
  );

  const paginationComponent = (
    <Box display="flex" alignItems="center" justifyContent="center" my={3}>
      <Button
        variant="contained"
        className={mui.btn}
        onClick={() => handleChangePage(-1)}
        disabled={page === 1}
        style={{ width: "5rem" }}
      >
        Trước
      </Button>

      <Typography variant="h6">
        Trang {page} / {numPages}
      </Typography>

      <Button
        variant="contained"
        className={mui.btn}
        onClick={() => handleChangePage(1)}
        disabled={page === numPages}
        style={{ width: "5rem" }}
      >
        Sau
      </Button>
    </Box>
  );

  return (
    <Box ref={pdfPage} style={{ marginTop: "4rem" }}>
      {!isList ? paginationComponent : null}

      <Box
        sx={{ bgcolor: "rgba(0, 0, 0, 0.7)", pt: 3, pb: 3 }}
        my={5}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Loading theme="dark" />}
          error={errorComponent}
          onLoadError={console.error}
        >
          <Box display="flex" justifyContent="center">
            <Box>
              {
                //
                isList ? (
                  [...Array(numPages)].map((e, i) => (
                    <Box key={i + 1} style={{ maxWidth: "100rem" }}>
                      <Page page={i + 1} />
                    </Box>
                  ))
                ) : (
                  <Box>
                    <Page pageNumber={page} />
                  </Box>
                )
              }
            </Box>
          </Box>
        </Document>
      </Box>

      {!isList ? paginationComponent : null}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    "& .react-pdf__Page__canvas": {
      // maxWidth: "600px !important",
      width: "100%",
      height: "auto",
    },
  },

  btn: {
    margin: "0 20px",
  },
}));
