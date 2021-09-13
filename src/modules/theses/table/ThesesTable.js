import { DataGrid } from '@material-ui/data-grid'

const colDef = [
  {
    field: 'name',
    headerName: 'Tên đề tài',
    type: 'string',
    flex: 0.7,
    autoHeight: true,
    wrapText: true,
    minWidth: 400,
    sortable: true,
  },

  {
    field: 'faculty',
    headerName: 'Khoa',
    type: 'string',
    width: 100,
    headerAlign: 'center',
    align: 'center',
    sortable: true,
  },

  {
    field: 'publishedYear',
    headerName: 'Năm',
    type: 'string',
    width: 90,
    headerAlign: 'center',
    align: 'center',
    sortable: true,
  },

  {
    field: 'tags',
    headerName: 'Tags',
    type: 'string',
    flex: 0.3,
    minWidth: 200,
    valueFormatter: params => {
      return params.value.join(', ')
    },
    sortable: true,
  },

  {
    field: 'type',
    headerName: 'Loại',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: 80,
    sortable: true,
  },

  {
    field: 'language',
    headerName: 'Ngôn ngữ',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: 120,
    sortable: true,
  },
]

const data = [
  {
    id: 1,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    publishedYear: 2021,
    tags: ['học sâu', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },
  {
    id: 2,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    publishedYear: 2020,
    tags: ['máy học', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },
]

export default function ThesesTable() {
  return (
    <div>
      <DataGrid
        rows={data}
        columns={colDef}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        scrollbarSize={20}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
      />
    </div>
  )
}
