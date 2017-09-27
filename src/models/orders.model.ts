import { ProductsViewModel, priceArrModel } from "./products.model";

export class OrdersModel {
    items: Array<itemArray>;
    promotion : string;
    shop: string; //ref Shop
    date: string;
    amount: number;
    net_amount: number;
    receiptNo: string;
    change: number;
    cash: number;
    user : string; // ref User who sendOrder to save
    casheir : string; // ref User roles[admun or operator] 
    queue : number; 
    created : Date;
    customer : string; // ref User roles[customer]
}

export class itemArray {
    product : ProductsViewModel = new ProductsViewModel();
    qty: number;
    selectedPrice: priceArrModel = new priceArrModel();
    // sweetness: string;
    // degrees: string;
}



// items : [{product : ref(product), qty : number}]
// promotion : ref(promotions)
// amount
// netamount : number
// user : ref(User)
// shop : ref(Shop)
// cashier : ref(user)
// queue : number
// created : date
// customer : string