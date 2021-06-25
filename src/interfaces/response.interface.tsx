export interface ResponseInterface<T> {
    code: number,
    data?: T[] | T | any,
    result?: T[] | T | any,
    message?: string,
    statusText?: string,
    status?: number,
    request?: any,
    config?: any
    headers?: any
}

export interface APIInterface<T> {
    responses: T[] | T | any;
}