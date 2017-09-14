export class PromotionsModel {
    promotions: Array<promoArray>;
}
export class promoArray {
    code: string;
    name: string;
    created: string;
    description: string;
    discountType: string;
    discountValue : number;
    startdate: Date;
    enddate: Date;
    status: string;
    userCreated: string;
    //log: Array;  not use with cashier;
    shop: string;
}
export class logArrModel{
    user : string;
    date : Date;
}

