export interface ICardL {
    id: number,
    images: string[],
    name: string,
    price: number,
    isHot?: boolean
}

export interface ICardHistoryPurchase {
    id: number,
    images: string[],
    price: number,
    metaType: string,
    name: string,
    status: string
} 