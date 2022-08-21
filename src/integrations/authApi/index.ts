import API from './baseApi';

interface IAuth{
    email: string;
    password: string;
}

interface IAuthResponse {
    access_token: string;
    token_type: string;
}

export async function getToken(payload: IAuth){
    return await API.post('/auth', payload)
}

