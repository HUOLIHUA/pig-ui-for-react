import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './slice/user'
import TagsReducer from './slice/tags'
import commonSlice from "./slice/common";
const store = configureStore({
  reducer: {
    user: userReducer,
    tags: TagsReducer,
    common: commonSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store