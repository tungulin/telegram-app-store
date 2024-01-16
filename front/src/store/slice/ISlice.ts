
export interface IDefaultSliceState {
    theme: string,
    filters: {
        category?: { id: number, label: string, value: string }[],
        search?: string
    },
    brandInfo: { id: number, name: string, icon: string | null, links: any[] | null } | null,
    FQAItems: { id: number, name: string }[] | [],
    categories: { id: number, label: string, value: string }[] | [],
}


export interface IUserSliceState {
    isAuth: boolean,
    info: { firstName: string, lastName: string, country: string, brandId: number, avatar: string, role: string } | null
}

export interface IProductSliceState {
    products: { id: number, images: string[], name: string, price: number }[],
    limit: number,
    offset: number
}

export interface IProductsApi {
    id: number,
    images: string[],
    name: string,
    price: number
}

export interface ISlice {
    default: IDefaultSliceState,
    user: IUserSliceState,
    product: IProductSliceState
}