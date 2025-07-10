import axios from 'services/axios.customize';

export const loginAPI = (username: string, password: string) => {
    const urlBackend = '/api/v1/auth/login';
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
}

export const registerAPI = (data: IRegisterRequest) => {
    const urlBackend = '/api/v1/user/register';
    return axios.post<IBackendRes<IRegister>>(urlBackend, data);
}

export const fetchAccountAPI = () => {
    const urlBackend = '/api/v1/auth/account';
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
        headers:{
            delay: 1000,
        }
    });
}

export const logoutAPI = () => {
    const urlBackend = '/api/v1/auth/logout';
    return axios.post<IBackendRes<any>>(urlBackend);
}

export const getUsersAPI = (query:string) => {
    const urlBackend = `/api/v1/user?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
}


export const createUserAPI = (data: IRegisterRequest) => {
    const urlBackend = '/api/v1/user';
    return axios.post<IBackendRes<IRegister>>(urlBackend, data);
}

export const createListUsersAPI = (data: IDataImport[]) => {
    const urlBackend = '/api/v1/user/bulk-create';
    return axios.post<IBackendRes<IBulkUsersResponse>>(urlBackend, data);
}