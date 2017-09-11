export class ProductsViewModel{
    products: Array<ProductItemModel>;
}
export class ProductItemModel {
    category: Array<CategoryModel>;
    image: Array<imgModel>;
    name: string;
    shop_id: string;
    price: number;
    user: string;
    created: string;
    _id: string;
}
export class CategoryModel {
    name: string;
    detail: string;
    subcate: string;
}
export class imgModel {
    url: string;
    id: string;
}