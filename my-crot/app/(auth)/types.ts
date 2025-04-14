export interface IUserLoginRequest {
    email: string;         // Назва категорії (обов'язкове поле)     // Унікальний ідентифікатор (обов'язкове поле)
    password: string;
}

export interface AuthResponse{
    token:string
}

export interface IUser {
    id: number;
    email: string;
    roles: string[];
}

//Авторизований користувач у системі
export interface IUserAuth {
    isAdmin: boolean
    isUser: boolean
    isAuth: boolean,
    roles: string[]
}
//Повна інформація про користувача
export interface IUserState {
    user: IUser | null
    auth: IUserAuth
    token: string | null
}