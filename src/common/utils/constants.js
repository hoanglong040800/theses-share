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
        name: 'Kĩ thuật máy tính',
        query: getUrlQuery('faculty', 'KTMT'),
      },
      {
        name: 'Mạng máy tính & truyền thông',
        query: getUrlQuery('faculty', 'MMTT&DL'),
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
        name: 'Trí tuệ nhân tạo',
        query: getUrlQuery('tag', 'AI'),
      },
      {
        name: 'Máy học',
        query: getUrlQuery('tag', 'ML'),
      },
      {
        name: 'Học sâu',
        query: getUrlQuery('tag', 'DL'),
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
    label: 'Luận văn đã đăng',
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

// --------- SNACKBAR INFO ------

export const snackbarCaseMessages = {
  deleteThesisSuccess: {
    action: 'delete thesis',
    severity: 'success',
    message: 'Xóa luận văn thành công. Đang điều hướng...',
  },

  deleteThesisError: {
    action: 'delete thesis',
    severity: 'error',
    message: 'Xóa luận văn thất bại. Vui lòng thử lại sau',
  },

  addBookmarkSuccess: {
    action: 'add bookmark',
    severity: 'success',
    message: 'Thêm bookmark thành công',
  },

  addBookmarkError: {
    action: 'add bookmark',
    severity: 'error',
    message: 'Thêm bookmark thất bại. Vui lòng thử lại sau',
  },

  deleteBookmarkSuccess: {
    action: 'delete bookmark',
    severity: 'success',
    message: 'Xóa bookmark thành công',
  },

  deleteBookmarkError: {
    action: 'delete bookmark',
    severity: 'error',
    message: 'Xóa bookmark thất bại. Vui lòng thử lại sau',
  },
}

// ===============================
// ===============================
// ========== SCHEMA yup =========
// ===============================
// ===============================

import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  email: yup.string().required('Chưa nhập email').email('Không phải email'),

  user_name: yup.string().required('Chưa nhập username'),

  password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(1, 'Mật khẩu tối thiểu 8 kí tự')
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
