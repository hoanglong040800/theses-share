import Navbar from 'common/components/navbar/Navbar'

const prefixNavlink = '/theses?'

export const navlinks = [
  {
    cate: 'Khoa',
    lists: [
      {
        name: 'Khoa học máy tính',
        link: `${prefixNavlink}faculty=KHMT`,
      },
      {
        name: 'Công nghệ phần mềm',
        link: `${prefixNavlink}faculty=CNPM`,
      },
    ],
  },

  {
    cate: 'Tags',
    lists: [
      {
        name: 'Máy học',
        link: `${prefixNavlink}tag=ML`,
      },
      {
        name: 'Học sâu',
        link: `${prefixNavlink}tag=DL`,
      },
    ],
  },

  {
    cate: 'Năm',
    lists: [
      {
        name: '2021',
        link: `${prefixNavlink}published_year=2021`,
      },
      {
        name: '2020',
        link: `${prefixNavlink}published_year=2020`,
      },
    ],
  },
]

// ======= ThesesTable
export const colDef = [
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
