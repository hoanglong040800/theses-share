const prefixNavlink = '/explore?'

export const navlinks = [
  {
    cate: 'Khoa',
    lists: [
      {
        name: 'Khoa học máy tính',
        link: `${prefixNavlink}faculty=KHMT`,
      },
      {
        name: 'Khoa học và kĩ thuật thông tin',
        link: `${prefixNavlink}faculty=KH%26KTTT`,
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

  {
    cate: 'Tags',
    lists: [
      {
        name: 'Máy học',
        link: `${prefixNavlink}tags=ML`,
      },
      {
        name: 'Học sâu',
        link: `${prefixNavlink}tags=DL`,
      },
    ],
  },
]

// ======= ThesesTable ===========

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
    field: 'published_year',
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
    flex: 0.2,
    minWidth: 150,
    valueFormatter: params => {
      return params.value.join(', ')
    },
    sortable: true,
  },

  {
    field: 'views',
    headerName: 'Lượt xem',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: 120,
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

export const rowsDummy = [
  {
    id: 1,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    published_year: 2021,
    tags: ['DL', 'mạng neural', 'DL', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 2,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    published_year: 2020,
    tags: ['ML', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 3,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    published_year: 2021,
    tags: ['DL', 'mạng neural', 'DL', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 4,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    published_year: 2020,
    tags: ['ML', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 5,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    published_year: 2021,
    tags: ['DL', 'mạng neural', 'DL', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 6,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    published_year: 2020,
    tags: ['ML', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 7,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    published_year: 2021,
    tags: ['DL', 'mạng neural', 'DL', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 8,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    published_year: 2020,
    tags: ['ML', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 9,
    name: 'Tìm hiểu kiến trúc mạng neural với thuật toán tiến hóa cho bài toán phân tích cảm xúc',
    faculty: 'KH&KTTT',
    published_year: 2021,
    tags: ['DL', 'mạng neural', 'DL', 'mạng neural'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 10,
    name: 'Xây dựng ứng dụng mạng xã hội đa nền tảng',
    faculty: 'KHMT',
    published_year: 2020,
    tags: ['ML', 'mạng neural'],
    type: 'DACN',
    language: 'vn',
  },

  {
    id: 11,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 12,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 13,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 14,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 15,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 16,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 17,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 18,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 19,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 20,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },

  {
    id: 21,
    name: 'Phát triển ứng dụng đọc sách và chia sẻ sách cũ trên di động',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ứng dụng', 'di động'],
    type: 'KLTN',
    language: 'en',
  },

  {
    id: 22,
    name: 'Xây dựng ứng dụng web hỗ trợ phát hiện tên riêng trong tiếng Việt ứng dụng ML',
    faculty: 'MMT&TT',
    published_year: 2021,
    tags: ['ML', 'web', 'ứng dụng'],
    type: 'KLTN',
    language: 'vn',
  },
]

// ======== UserPages ============
export const userPages = [
  {
    name: 'like',
    display: 'Luận văn yêu thích',
    active: true,
    get link() {
      return this.name
    },
  },

  {
    name: 'theses',
    display: 'Luận văn của tôi',
    active: false,
    get link() {
      return this.name
    },
  },

  {
    name: 'profile',
    display: 'Hồ sơ',
    active: false,
    get link() {
      return this.name
    },
  },

  {
    name: 'account',
    display: 'Tài khoản',
    active: false,
    get link() {
      return this.name
    },
  },
]
