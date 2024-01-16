// USER Interface
export interface ILoginViaWebApp {
    firstName: string,
    lastName: string,
    country: string,
    brandId: number,
    avatar: string
}

export interface IGetPurchaseHistory {
    brandId: string | undefined,
}

export interface IGetPurchaseMeta {
    id: number | undefined,
}

// PRODUCT Interface
export interface IGetProducts {
    brandId: number,
    params: {
        offset: number,
        limit: number
    }
}

// PAYMENT Interface
export interface ICreatePayment {
    productId: number | undefined,
}

// MAIN Interface
export interface IGetFQAs {
    productId: number,
}

export interface IGetCategories {
    brandId: number,
}
export interface IGetFQA {
    id: string | undefined,
}

// BRAND Interface

export interface IGetBrand {
    id: string | undefined,
}