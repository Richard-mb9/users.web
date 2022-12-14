import axios from 'axios';
import API from './baseApi';

export interface IRole{
    id: number;
    name: string;
}

interface IUpdateRole {
    name: string;
}

interface IListRolesParams {
    name?: string;
}

interface IListRolesResponse {
    data?: IRole[];
    status: number;
}

export async function listRoles(params?: IListRolesParams){
    return await API.get('/roles', {params})
} 


export async function createRole(roleName: string){
    return await API.post('/roles', {name: roleName})
}

export async function updateRole(roleId: number, dataToUpdate: IUpdateRole){
    return await API.put(`/roles/${roleId}`, dataToUpdate)
}