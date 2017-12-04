import { UsersModel } from "./users.model";

export class ShopsModel {
    _id: string;
    name: string;
    address: {
        address: string;
        subdistrict: string;
        district: string;
        province: string;
        postcode: string;
    }
    shopcode: string;
    email: string;
    phone: string;
    location: {
        lat: string;
        lng: string;
    }
    created: Date;
    user: UsersModel;
    logo: string;
}