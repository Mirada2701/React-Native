import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './slices/userSlice';
import {authApi} from "@/services/authApi";


export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer, // Додаємо API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware), // Додаємо API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector