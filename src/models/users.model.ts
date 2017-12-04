import { ShopsModel } from "./shops.model";

export class UsersModel {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  profileImageURL: string;
  provider: string;
  roles: Array<string>;
  shop: Array<ShopsModel>;
  updated: Date;
  created: Date;
}