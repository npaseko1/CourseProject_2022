export interface TSubtitle {
    article?: string[]
}

export interface IGetUser {
    login: string,
    password: string
}

export interface ILogin{
    login: string,
    password: string
}

export interface TData {
    title: string,
    id?: number,
    subtitle: TSubtitle[],
    author: string,
    date: Date,
    img: string,
    tags: string[]
}

export interface TTag  {
    name: string,
    active: boolean,
    id: string
}

export interface TLoadPage {
    isMore: boolean,
    data: TData[]
}

export interface TUser {
    name: string,
    login: string,
    password: string,
    id: number,
    img: string
}
