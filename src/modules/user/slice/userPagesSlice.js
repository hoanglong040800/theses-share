import { createSlice } from '@reduxjs/toolkit'

export const userPagesSlice = createSlice({
  name: 'userPages',

  initialState: {
    showSidebar: true,

    pages: [
      {
        name: 'bookmark',
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
    ],
  },

  reducers: {
    changeUserPage: (state, action) => {
      state.pages.map((item, i) => {
        state.pages[i].name == action.payload
          ? (state.pages[i].active = true)
          : (state.pages[i].active = false)
      })
    },

    toggleUserSidebar: state => {
      state.showSidebar = !state.showSidebar
    },
  },
})

export const { changeUserPage, toggleUserSidebar } = userPagesSlice.actions

export default userPagesSlice.reducer
