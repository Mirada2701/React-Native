import {createSlice} from '@reduxjs/toolkit'
import {APP_ENV} from "@/env";
import {RootState} from "..";
import {IUser, IUserAuth, IUserState} from "@/app/(auth)/types";
import {getValueForSecureStore, removeFromSecureStore, saveToSecureStore} from "@/utilities/secureStore";
import {jwtParse} from "@/utilities/jwtParse";

const getUserFromToken = (token: string | null): IUser | null => token ? jwtParse(token) : null

const getUserAuth = (user: IUser | null): IUserAuth => {
    return ({
        isAdmin: user !== null && user.roles.includes('Admin'),
        isUser: user !== null && user.roles.includes('User'),
        isAuth: user !== null,
        roles: user?.roles || []
    })
}

const userInit = (): IUserState => {


    const savedToken = getValueForSecureStore(APP_ENV.APP_ACCESS_KEY)|| null;


    const token: string | null = savedToken;
    const user = getUserFromToken(token)
    const auth = getUserAuth(user);
    return ({
        user: user,
        token: token,
        auth: auth
    })
}

const initialState: IUserState = userInit();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setCredentials: (state, action: { payload: { token: string } }) => {
            const {token} = action.payload
            state.user = getUserFromToken(token)
            state.token = token
            state.auth = getUserAuth(state.user)

            if (state.user !== null) {
                saveToSecureStore(APP_ENV.APP_ACCESS_KEY, token)
            }
        },


        logOut: (state) => {
            removeFromSecureStore(APP_ENV.APP_ACCESS_KEY)
                .then(()=> {
                    state.user = null
                    state.token = null
                    state.auth = getUserAuth(null)
                });
        },

    },
});

export const getUser = (state: RootState) => state.user.user;
export const getAuth = (state: RootState) => state.user.auth;
export const getToken = (state: RootState) => state.user.token;

export const { setCredentials, logOut } = userSlice.actions
export default userSlice.reducer