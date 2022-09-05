import API from './baseApi';


export interface IProfile {
    id: number;
    name: string;
    role_id?: number;
}

interface IUpdateProfile {
    name: string;
    roles_ids: number[];
}


interface ICreateProfile {
    profileName: string;
    roleName?: string;
}

interface IListProfilesParams {
    name?: string;
}


export async function listProfiles(params?: IListProfilesParams): Promise<IProfile[]>{
    if(params){
        return (await API.get('/profiles', {params})).data
    }
    return (await API.get('/profiles')).data
}

export async function createProfile(data: ICreateProfile){
    const dataForCreate = JSON.parse(JSON.stringify({name: data.profileName, role_name: data.roleName}))
    return await API.post('/profiles', dataForCreate)
}

export async function listProfileRoles(profileId: number){
    return await API.get(`/profiles/${profileId}/roles`)
}

export async function updateProfile(profileId: number, dataToUpdate: IUpdateProfile){
    return await API.put(`/profiles/${profileId}`, dataToUpdate)
}