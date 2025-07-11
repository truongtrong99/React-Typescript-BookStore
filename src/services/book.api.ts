import axios from 'services/axios.customize';

export const getBooksAPI = (query:string) => {
    const urlBackend = `/api/v1/book?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend);
}


export const createBookAPI = (data: IRegisterRequest) => {
    const urlBackend = '/api/v1/book';
    return axios.post<IBackendRes<IRegister>>(urlBackend, data);
}

export const createListBooksAPI = (data: IDataImport[]) => {
    const urlBackend = '/api/v1/book/bulk-create';
    return axios.post<IBackendRes<IBulkUsersResponse>>(urlBackend, data);
}

export const updateBookAPI = (_id:string, fullName:string, phone:string) => {
    const urlBackend = '/api/v1/book';
    return axios.put<IBackendRes<IRegister>>(urlBackend, { _id, fullName, phone });
}

export const deleteBookAPI = (_id:string) => {
    const urlBackend = `/api/v1/book/${_id}`;
    return axios.delete<IBackendRes<IRegister>>(urlBackend );
}   

export const getCategoryAPI = () => {
    const urlBackend = '/api/v1/database/category';
    return axios.get<IBackendRes<string[]>>(urlBackend);
}