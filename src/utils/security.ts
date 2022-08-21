import jwt from 'jsonwebtoken';


export const isAuthenticated = !!localStorage.getItem('access_token');

interface ITokenData {
    id: number;
    email: string;
    profile: string[];
    roles: string[];
}

const getToken = () => {
    return localStorage.getItem('access_token');
}

const getTokenData = (): ITokenData | undefined =>{
    const token = getToken()
    if (token){
        return jwt.decode(token) as ITokenData;
    }
}


export const hasRole = (roleName: string)=> {
    const tokenData = getTokenData()
    if (tokenData){
        const roles = tokenData.roles;
        return roles.indexOf(roleName) >= 0;
    }
    return false
    
}