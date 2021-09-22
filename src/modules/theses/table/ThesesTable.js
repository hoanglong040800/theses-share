import { DataGrid } from '@material-ui/data-grid'
import { getNameFromEmail } from 'common/utils/util'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ThesesTable({
  columns,
  rows,
  pageSize = 10,
  hideFooter = true,
  loading = false,
}) {
  const router = useRouter()
  const [pageSizeState, setPageSizeState] = useState(pageSize)

  function handleRowClick(params) {
    // console.log(params)
    router.push(`${getNameFromEmail(params.row.user.email)}/${params.row.slug}`)
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={pageSizeState}
        loading={loading}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={newPageSize => setPageSizeState(newPageSize)}
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
