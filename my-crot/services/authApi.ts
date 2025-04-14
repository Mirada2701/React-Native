// Створюємо API Slice
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "@/env";
import {AuthResponse, IUserLoginRequest} from "@/app/(auth)/types";
import {setCredentials} from "@/store/slices/userSlice";

export const authApi = createApi({
    reducerPath: 'authApi', // Унікальний шлях для цього API у Redux Store
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.API_URL}/api/Account` }), // Базовий URL
    tagTypes: ["AuthUser"], // Додаємо tag для категорій
    endpoints: (builder) => ({

        loginUser: builder.mutation<AuthResponse, IUserLoginRequest>({
            query: (userGoogle) => ({
                url: "login",
                method: "POST",
                body: userGoogle,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("Google auth user", arg);
                    if (result.data && result.data.token) {
                        dispatch(setCredentials({ token: result.data.token }));

                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        })
    }),
});

// Автоматично згенерований хук
export const {
    useLoginUserMutation
} = authApi;