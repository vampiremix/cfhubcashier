import { ProductsViewModel } from "./products.model";
export class categoriesModel {
    _id : string;
	description : string;
	created : Date;
	image : Array<string>
    subcate : Array<subcateArr>;
	name : string;
}

export class subcateArr {
    _id : string;
    subname : string;
}


/////////// Filter Product by Category ////////////
export class filterCatergoryModel {
    cate :string;
    subcate: subcateArr2
}


export class subcateArr2 {
    _id : string;
    subname : string;
    product: Array<ProductsViewModel>;
}
/////////// Filter Product by Category ////////////