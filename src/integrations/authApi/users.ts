import API from './baseApi';

export interface IUser{
    id: number;
    email: string;
    profiles: string[];
    enable: boolean
}

export interface IUsersFilters {
    page?: number;
    page_size?: number;
    id?: string;
    email?: string;
    profile?: string;
    enable?: string;
}

export interface ICreateUser {
    email: string;
    password: string;
    profiles: string[];
}

interface IUpdateUserProfiles {
    profiles: string[]
}

interface IUpdateUser {
    enable: boolean
}

export async function createUser(user: ICreateUser){
    return  await API.post('/users', user)
}

export async function listUsers(filters: IUsersFilters = {}): Promise<IUser[]>{
    const keysForRemove = (Object.keys(filters) as (keyof typeof filters)[])
    .filter((key)=> filters[key] === '')

    keysForRemove.forEach((key)=> {
        delete filters[key]
    })
    
    return (await API.get(
        '/users',
        {
            params: JSON.parse(JSON.stringify(filters))
        }
    )).data
}

export async function updateUserProfiles(user_id: number, data: IUpdateUserProfiles){
    return await API.put(`/users/${user_id}/profiles`, data)
}

export async function updateUser(userId: number, data: IUpdateUser){
    return await API.put(`/users/${userId}`, data)
}