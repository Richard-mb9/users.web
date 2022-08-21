import API from './baseApi';


export interface IProfile {
    id: number;
    name: string;
}

interface IUpdateProfile {
    name: string;
    roles_ids: number[];
}

interface ICreateProfileResponse {
    id: number;
}

export async function listProfiles(): Promise<IProfile[]>{
    return (await API.get('/profiles')).data
}

export async function createProfile(profileName: string){
    return await API.post('/profiles', {name: profileName})
}

export async function listProfileRoles(profileId: number){
    return await API.get(`/profiles/${profileId}/roles`)
}

export async function updateProfile(profileId: number, dataToUpdate: IUpdateProfile){
    return await API.put(`/profiles/${profileId}`, dataToUpdate)
}