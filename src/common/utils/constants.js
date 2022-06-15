// ==== SESSION ======
export const tokenData = ["id", "email", "full_name", "gender", "user_name"];

// ======== nav links ======
function getUrlQuery(name, value) {
  return {
    [name]: value,
  };
}

export const navlinks = [
  {
    cate: "Khoa",
    lists: [
      {
        name: "Mạng máy tính và truyền thông",
        query: getUrlQuery("faculty", "MMT&TT"),
      },
      {
        name: "Hệ thống thông tin",
        query: getUrlQuery("faculty", "HTTT"),
      },
      {
        name: "Khoa học máy tính",
        query: getUrlQuery("faculty", "KHMT"),
      },
      {
        name: "Công nghệ phần mềm",
        query: getUrlQuery("faculty", "CNPM"),
      },
      {
        name: "Kĩ thuật máy tính",
        query: getUrlQuery("faculty", "KTMT"),
      },
      {
        name: "Khoa học & kĩ thuật thông tin",
        query: getUrlQuery("faculty", "KH&KTTT"),
      },
    ],
  },

  {
    cate: "Năm",
    lists: [
      {
        name: "2021",
        query: getUrlQuery("published_year", 2021),
      },
      {
        name: "2020",
        query: getUrlQuery("published_year", 2020),
      },
      {
        name: "2019",
        query: getUrlQuery("published_year", 2019),
      },
      {
        name: "2018",
        query: getUrlQuery("published_year", 2018),
      },
      {
        name: "2017",
        query: getUrlQuery("published_year", 2017),
      },
      {
        name: "2016",
        query: getUrlQuery("published_year", 2016),
      },
      {
        name: "2015",
        query: getUrlQuery("published_year", 2015),
      },
    ],
  },

  {
    cate: "Tags",
    lists: [
      {
        name: "Trí tuệ nhân tạo",
        query: getUrlQuery("tag", "ai"),
      },
      {
        name: "Máy học",
        query: getUrlQuery("tag", "học máy"),
      },
      {
        name: "Internet vạn vật",
        query: getUrlQuery("tag", "iot"),
      },
      {
        name: "Web",
        query: getUrlQuery("tag", "web"),
      },
      {
        name: "Di động",
        query: getUrlQuery("tag", "di động"),
      },
    ],
  },
];

// ======== path name in /settings page ======
export const settingsPages = [
  {
    label: "Chỉnh sửa hồ sơ",
    pathname: "/settings/edit-profile",
  },
  {
    label: "Đổi mật khẩu",
    pathname: "/settings/change-password",
  },
];

// ======= user [email] tabs ======

export const userPages = [
  {
    label: "Luận văn đã đăng",
    value: "theses",
  },
  {
    label: "Yêu thích",
    value: "bookmark",
  },
];

// ======= ThesesTable ===========
export const colDef = [
  {
    field: "name",
    headerName: "Tên đề tài",
    type: "string",
    flex: 0.7,
    autoHeight: true,
    wrapText: true,
    minWidth: 400,
    sortable: true,
  },

  {
    field: "faculty",
    headerName: "Khoa",
    type: "string",
    width: 100,
    headerAlign: "center",
    align: "center",
    sortable: true,
    valueGetter: (params) => {
      return params.value.name_short_vn;
    },
  },

  {
    field: "published_year",
    headerName: "Năm",
    type: "number",
    width: 90,
    headerAlign: "center",
    align: "center",
    sortable: true,
    valueFormatter: (params) => {
      return params.value.toString().replace(",", "");
    },
  },

  {
    field: "tags",
    headerName: "Tags",
    type: "string",
    flex: 0.3,
    minWidth: 180,
    sortable: true,
    valueGetter: (params) => {
      return params.value
        .filter((item) => item.name_vn !== "rỗng")
        .map((item) => {
          return item.name_vn;
        })
        .join(", ");
    },
  },

  {
    field: "views",
    headerName: "Xem",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: 90,
    sortable: true,
  },

  {
    field: "type",
    headerName: "Loại",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: 90,
    sortable: true,
  },

  {
    field: "language",
    headerName: "Ngôn ngữ",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
];

// --------- SNACKBAR INFO ------

export const snackbarCaseMessages = {
  deleteThesisSuccess: {
    action: "delete thesis",
    severity: "success",
    message: "Xóa luận văn thành công. Đang điều hướng...",
  },

  deleteThesisError: {
    action: "delete thesis",
    severity: "error",
    message: "Xóa luận văn thất bại. Vui lòng thử lại sau",
  },

  addBookmarkSuccess: {
    action: "add bookmark",
    severity: "success",
    message: "Thêm bookmark thành công",
  },

  addBookmarkError: {
    action: "add bookmark",
    severity: "error",
    message: "Thêm bookmark thất bại. Vui lòng thử lại sau",
  },

  deleteBookmarkSuccess: {
    action: "delete bookmark",
    severity: "success",
    message: "Xóa bookmark thành công",
  },

  deleteBookmarkError: {
    action: "delete bookmark",
    severity: "error",
    message: "Xóa bookmark thất bại. Vui lòng thử lại sau",
  },

  signupSuccess: {
    action: "signup",
    severity: "success",
    message: "Đăng ký thành công. Đang đăng nhập",
  },

  signupError: {
    action: "signup",
    severity: "error",
    message: "Có lỗi xảy ra. Vui lòng thử lại sau",
  },

  signupDuplicate: {
    action: "signup",
    severity: "error",
    message:
      "Email hoặc username đã có người sử dụng. Vui lòng chọn email khác",
  },

  editProfileSuccess: {
    action: "edit profile",
    severity: "success",
    message: "Sửa thông tin thành công. Đang điều hướng...",
  },

  editProfileError: {
    action: "edit profile",
    severity: "error",
    message: "Có lỗi xảy ra. Vui lòng thử lại sau",
  },
};
