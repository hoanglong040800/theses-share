import { DataGrid } from '@material-ui/data-grid'
import { useRouter } from 'next/router'

export default function ThesesTable({ columns, rows, pageSize = 10 }) {
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
        hideFooter={true}
        onRowClick={handleRowClick}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
      />
    </>
  )
}
