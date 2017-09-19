export class ProductsViewModel {
    category: {
        _id: string;
        description: string;
        image: Array<string>;
        name: string;
    };
    subcate: string;
    image: Array<any>;
    description: string;
    name: string;
    price: Array<priceArrModel>;
    user: string;
    created: string;
    _id: string;
    favorites: Array<string>;
}
export class priceArrModel {
    price: number;
    type: string;
    discount: number;
    netprice: number;
    _id:string;
}