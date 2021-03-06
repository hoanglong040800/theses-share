import { DataGrid } from "@material-ui/data-grid";
import { colDef } from "common/utils/constants";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ThesesTable({
  columns = colDef,
  rows,
  pageSize = 20,
  hideFooter = false,
  loading = false,
}) {
  const router = useRouter();
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  function handleRowClick(params) {
    router.push(`${params.row.user.user_name}/${params.row.slug}`);
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={67}
        pageSize={pageSizeState}
        loading={loading}
        rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        onPageSizeChange={(newPageSize) => setPageSizeState(newPageSize)}
        scrollbarSize={20}
        hideFooter={hideFooter}
        onRowClick={handleRowClick}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
      />
    </>
  );
}
