import { Box, Button, makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import Loading from 'common/components/loading/Loading'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function PdfViewer({
  file = 'https://www.ets.org/Media/Tests/GRE/pdf/gre_research_validity_data.pdf',
  isList = true,
}) {
  const mui = useStyles()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  function handleChangePage(payload) {
    setPageNumber(prev => prev + payload)
  }

  const errorComponent = (
    <Box display="flex" justifyContent="center" py={15}>
      <Alert severity="error">
        <AlertTitle>Lỗi</AlertTitle>
        Tải tài liệu thất bại
      </Alert>
    </Box>
  )

  const paginationComponent = (
    <Box display="flex" justifyContent="center" my={3}>
      <Button
        variant="contained"
        className={mui.btn}
        onClick={() => handleChangePage(-1)}
        disabled={pageNumber === 1}
      >
        Trước
      </Button>

      <p>
        Page {pageNumber} of {numPages}
      </p>

      <Button
        variant="contained"
        className={mui.btn}
        onClick={() => handleChangePage(1)}
        disabled={pageNumber === numPages}
      >
        Sau
      </Button>
    </Box>
  )

  return (
    <>
      {!isList ? paginationComponent : null}

      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} my={5}>
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
                    <Page pageNumber={i + 1} key={i + 1} className={mui.page} />
                  ))
                ) : (
                  <Page pageNumber={pageNumber} className={mui.page} />
                )
              }
            </Box>
          </Box>
        </Document>
      </Box>

      {!isList ? paginationComponent : null}
    </>
  )
}

const useStyles = makeStyles(theme => ({
  page: {
    '& .react-pdf__Page__canvas': {
      maxWidth: '600px !important',
      width: '100% !important',
      height: 'auto !important',
    },
  },

  btn: {
    margin: '0 20px',
  },
}))
