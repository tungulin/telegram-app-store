export interface IItemPage {
    id: number,
    images: string[],
    name: string,
    rating: number,
    userRating: number,
    categoryId: number,
    price: number | undefined,
    description: string | undefined,
    reviewVideo: string | undefined
}