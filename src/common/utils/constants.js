// ==== SESSION ======
export const tokenData = ['id', 'email', 'full_name', 'gender', 'user_name']

// ======== nav links ======
function getUrlQuery(name, value) {
  return {
    [name]: value,
  }
}

export const navlinks = [
  {
    cate: 'Khoa',
    lists: [
      {
        name: 'Khoa học máy tính',
        query: getUrlQuery('faculty', 'KHMT'),
      },
      {
        name: 'Công nghệ phần mềm',
        query: getUrlQuery('faculty', 'CNPM'),
      },
      {
        name: 'Khoa học và kĩ thuật thông tin',
        query: getUrlQuery('faculty', 'KH&KTTT'),
      },
      {
        name: 'Mạng máy tính & truyền thông',
        query: getUrlQuery('faculty', 'MMT&TT'),
      },
    ],
  },

  {
    cate: 'Năm',
    lists: [
      {
        name: '2021',
        query: getUrlQuery('published_year', 2021),
      },
      {
        name: '2020',
        query: getUrlQuery('published_year', 2020),
      },
      {
        name: '2019',
        query: getUrlQuery('published_year', 2019),
      },
      {
        name: '2018',
        query: getUrlQuery('published_year', 2018),
      },
    ],
  },

  {
    cate: 'Tags',
    lists: [
      {
        name: 'Máy học',
        query: getUrlQuery('tags', 'machine learning'),
      },
      {
        name: 'Học sâu',
        query: getUrlQuery('tags', 'deep learning'),
      },
    ],
  },
]

// ======== setting tabs ======
export const settingsPages = [
  {
    label: 'Chỉnh sửa hồ sơ',
    pathname: '/settings/edit-profile',
  },
  {
    label: 'Tài khoản',
    pathname: '/settings/account',
  },
  {
    label: 'Đổi mật khẩu',
    pathname: '/settings/change-password',
  },
]

// ======= user [email] tabs ======

export const userPages = [
  {
    label: 'Luận văn',
    value: 'theses',
  },
  {
    label: 'Yêu thích',
    value: 'bookmark',
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
    valueGetter: params => {
      return params.value.name_short_vn
    },
  },

  {
    field: 'published_year',
    headerName: 'Năm',
    type: 'number',
    width: 90,
    headerAlign: 'center',
    align: 'center',
    sortable: true,
    valueFormatter: params => {
      return params.value.toString().replace(',', '')
    },
  },

  {
    field: 'tags',
    headerName: 'Tags',
    type: 'string',
    flex: 0.3,
    minWidth: 180,
    sortable: true,
    valueGetter: params => {
      return params.value
        .map(item => {
          if (item.name_short_en) return item.name_short_en
          else return item.name_vn
        })
        .join(', ')
    },
  },

  {
    field: 'views',
    headerName: 'Xem',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: 90,
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

// ========== SCHEMA yup =========

import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  email: yup.string().required('Chưa nhập email').email('Không phải email'),

  user_name: yup.string().required('Chưa nhập username'),

  password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(8, 'Mật khẩu tối thiểu 8 kí tự')
    .max(20, 'Mật khẩu không được quá 20 kí tự'),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Không trùng với mật khẩu'),
})

export const rsPswdSchema = yup.object().shape({
  pswdOld: yup.string().required('Bắt buộc'),

  pswdNew: yup
    .string()
    .required('Bắt buộc')
    .min(8, 'Tối thiểu 8 kí tự')
    .max(20, 'Không được quá 20 kí tự'),

  pswdCf: yup
    .string()
    .oneOf([yup.ref('pswdNew'), null], 'Không trùng với mật khẩu mới'),
})

const infoYupShape = {
  name: yup
    .string()
    .required('Bắt buộc')
    .max(255, obj => `Không được quá ${obj.max} kí tự`),

  tags: yup
    .array()
    .required('Ít nhất 1 tag')
    .min(1, obj => `Ít nhất ${obj.min} tags`)
    .max(5, obj => `Không được quá ${obj.max} tags`),

  type: yup.string().required('Bắt buộc'),

  faculty_id: yup.number().typeError('Bắt buộc').required('Bắt buộc'),

  published_year: yup
    .number()
    .typeError('Bắt buộc')
    .required('Bắt buộc')
    .min(1900, obj => `Không được nhỏ hơn năm ${obj.min}`)
    .max(new Date().getFullYear(), obj => `Không được lớn hơn năm ${obj.max}`),

  language: yup.string(),

  format: yup.string(),

  authors: yup.string().max(255, obj => `Không được quá ${obj.max} kí tự`),

  teachers: yup.string().max(255, obj => `Không được quá ${obj.max} kí tự`),
}

export const thesisSchema = yup.object().shape({
  file: yup
    .mixed()
    .test('required', 'Chưa tải luận văn', value => value.length)
    .test('fileSize', 'File vượt quá 1MB', value =>
      value.length ? value[0].size <= 1000000 : false
    ),

  ...infoYupShape,
})

export const editThesisSchema = yup.object().shape({
  ...infoYupShape,
})
