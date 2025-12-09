export interface IAthlete{
    id: number, // satt som obligatorisk fordi TypeScript ikke vil sende "undefined" til en funksjon som krever number(i PurchaseAthlete)
    name: string, 
    gender: string,
    price: number, // fikse denne til double
    image: string,
    purchaseStatus: boolean
}