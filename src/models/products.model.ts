export class ProductsViewModel{
    products: Array<ProductItemModel>;
}
export class ProductItemModel {
    category: string;
    image: Array<any>;
    description: string;
    name: string;
    shop_id: string;
    price: Array<priceArrModel>;
    user: string;
    created: string;
    _id: string;
    favorites: Array<string>;
}
export class priceArrModel{
    price : number;
    type : string;
    discount : number;
    netprice : number;
}
export class imgstring{
    string;
}