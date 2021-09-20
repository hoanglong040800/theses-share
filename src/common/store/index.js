import { configureStore } from '@reduxjs/toolkit'
import userPagesReducer from 'modules/user/slice/userPagesSlice'

export default configureStore({
  reducer: {
    userPages: userPagesReducer,
  },
})
