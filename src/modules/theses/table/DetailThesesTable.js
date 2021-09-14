import { DataGrid } from '@material-ui/data-grid'
import { useRouter } from 'next/router'

export default function DetailThesesTable({
  columns,
  rows,
  pageSize = 10,
  hideFooter = false,
}) {
  const router = useRouter()

  function handleRowClick(params) {
    router.push(`theses/${params.id}`)
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        scrollbarSize={20}
        hideFooter={hideFooter}
        onRowClick={handleRowClick}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
      />
    </>
  )
}
